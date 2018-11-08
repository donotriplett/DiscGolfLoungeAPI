let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Courses = sequelize.import("../models/courses");

router.get("/get", function (req, res) {
    Courses.findAll().then(
        function findAllSuccess(data) {
            res.json(data)
        },
        function findAllError(err) {
            res.send(500, err.message)
        }
    )
})

module.exports = router;