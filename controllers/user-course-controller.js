let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let UserCourses = sequelize.import("../models/usercourses");

router.post("/create", function (req, res) {
    let user = req.user;
    let course = req.body.usercourse.course
    let rating = req.body.usercourse.rating
    let numberofholes = req.body.usercourse.numberofholes
    let comments = req.body.usercourse.comments

    UserCourses.create({
        owner: user.id,
        course: course,
        rating: rating,
        numberofholes: numberofholes,
        comments: comments
    })
        .then(
            function createCourseSuccess() {
                res.status(200).json({
                    course: course,
                    message: "Successfully added course!"
                })
            },
            function createCourseError(err) {
                res.json(500, err.message)
            }
        )
})

router.delete("/delete/:id", function (req, res) {
    let dataID = req.params.id;

    UserCourses.findById(dataID)
        .then(
            function (item) {
                if (item == undefined) {
                    res.send(500, "Id does not match any records.")
                } else {
                    UserCourses.destroy({ where: { id: dataID } })
                        .then(
                            function createDeleteSuccess() {
                                res.status(200).send("Successfully removed course!")
                            },
                            function createDeleteError(err) {
                                res.send(500, err.message)
                            }
                        )
                }
            })
})

router.get("/get", function (req, res) {
    let userID = req.user.id

    UserCourses.findAll({ where: { owner: userID } })
        .then(
            function createFindAllSuccess(data) {
                res.status(200).json(data)
            },
            function createFindAllError(err) {
                res.send(500, err.message)
            }
        )
})

router.put("/update/:id", function (req, res) {
    let dataID = req.params.id
    let course = req.body.usercourse.course
    let rating = req.body.usercourse.rating
    let numberofholes = req.body.usercourse.numberofholes
    let comments = req.body.usercourse.comments

    UserCourses.update({
        course: course,
        rating: rating,
        numberofholes: numberofholes,
        comments: comments
    }, { where: { id: dataID } } )
        .then(
            function createUpdateSuccess(updatedData) {
                res.status(200).json(updatedData)
            },
            function createUpdateError(err) {
                res.send(500, err.message)
            }
        )
})

module.exports = router;