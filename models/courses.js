module.exports = function (sequelize, DataTypes) {
    return sequelize.define("courses", {
        coursename: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        city: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        state: {
            type: DataTypes.ENUM,
            values: ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"],
            validate: {
                notEmpty: true
            }
        },
        zipcode: {
            type: DataTypes.INTEGER,
            validate: {
                len: [5, 5],
                notEmpty: true
            }
        },
        numberofholes: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true
            }
        },

    })
}