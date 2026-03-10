const { DataTypes } = require("sequelize")


// Define and export the Style model
module.exports = (sequelize) => {
    const Style = sequelize.define('Style', {
        styleName: DataTypes.STRING(50),
    },
    {
        timestamps: false
    })

    return Style
}