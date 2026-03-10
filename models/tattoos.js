const { DataTypes } = require("sequelize")


// Define and export the Tattoo model
module.exports = (sequelize) => {
    const Tattoo = sequelize.define('Tattoo', {
        description: DataTypes.STRING(150),
    },
    {
        timestamps: false
    })

    return Tattoo
}