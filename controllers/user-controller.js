let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

router.post("/create", function (req, res) {

    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

            res.json({
                user: user,
                message: "user created",
                sessionToken: token
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

router.post("/signin", function (req, res) {
    User.findOne({ where: { username: req.body.user.username } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                            res.json({
                                user: user,
                                message: "successfully authenticated user",
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({ error: "failed to login" })
                        }
                    })
                } else {
                    res.status(500).send({ error: "failed to authenticate user" })
                }
            },
            function (err) {
                res.status(501).send({ err: "something went wrong" })
            }
        )
})

module.exports = router