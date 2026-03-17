const { DataTypes } = require("sequelize")

// Define and export the User model
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING(50),
        email: DataTypes.STRING(150),
        password: DataTypes.STRING(150),
    },
    {
        timestamps: false
    })

    return User
}