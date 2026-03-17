const { DataTypes } = require("sequelize")

// Define and export the Role model
module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        roleName: DataTypes.STRING(50),
    },
    {
        timestamps: false
    })

    return Role
}