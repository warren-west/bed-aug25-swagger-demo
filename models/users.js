const { DataTypes } = require("sequelize")

// Define and export the User model
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: DataTypes.STRING(300),
    },
    {
        timestamps: false
    })

    return User
}