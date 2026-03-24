const express = require('express')
const cors = require('cors')
const app = express()
const jsend = require('jsend')

// swagger dependencies
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')

// import required routes
const indexRouter = require('./routes/index')
const tattoosRouter = require('./routes/tattoos')
const stylesRouter = require('./routes/styles')
const populateRouter = require('./routes/populateDb')
const authRouter = require('./routes/auth')

// swagger middleware
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Apply CORS policies
app.use(cors()) // Configure CORS (Cross-Origin Resource Sharing)
app.use(jsend.middleware) // jsend can be used in all of our routes

// link routes to URLs
app.use('/', indexRouter)
app.use('/tattoos', tattoosRouter)
app.use('/styles', stylesRouter)
app.use('/populate', populateRouter)
app.use('/login', authRouter)

// import the db object from ./models
const db = require('./models')

//  sync the database with the sequelize object
db.sequelize.sync({ force: false })

module.exports = app