module.exports = function( sequelize, DataTypes) {
    return sequelize.define("usercourse", {
        owner: DataTypes.INTEGER,
        course: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
            min: 0,
            max: 10
            }
        },
        numberofholes: DataTypes.INTEGER,
        comments: DataTypes.STRING
    })
}