const { DataTypes } = require("sequelize")


// Define and export the Color model
module.exports = (sequelize) => {
    const Color = sequelize.define('Color', {
        colorName: DataTypes.STRING(50),
    },
    {
        timestamps: false
    })

    return Color
}