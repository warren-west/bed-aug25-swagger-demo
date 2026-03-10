require('dotenv').config()
const { Sequelize } = require('sequelize')

// defining the Sequelize connection
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT,
    logging: false
})

const db = {}

// Add the models to the db
db.Color = require('./colors')(sequelize)
db.Tattoo = require('./tattoos')(sequelize)
db.Style = require('./styles')(sequelize)

// add sequelize to the db
db.sequelize = sequelize

// establish associations
// one style has many tattoos
db.Style.hasMany(db.Tattoo)
// one tattoo has one style
db.Tattoo.belongsTo(db.Style)

// many tattoo has many colors
db.Tattoo.belongsToMany(db.Color, { through: 'tattoo_colors' })
db.Color.belongsToMany(db.Tattoo, { through: 'tattoo_colors' })

// export the db
module.exports = db