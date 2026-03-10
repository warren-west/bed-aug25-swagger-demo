require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// swagger dependencies
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')

// import required routes
const indexRouter = require('./routes/index')
const tattoosRouter = require('./routes/tattoos')
const stylesRouter = require('./routes/styles')
const populateRouter = require('./routes/populateDb')

// swagger middleware
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// link routes to URLs
app.use('/', indexRouter)
app.use('/tattoos', tattoosRouter)
app.use('/styles', stylesRouter)
app.use('/populate', populateRouter)

// Apply CORS policies
app.use(cors({
    origin: ["http://localhost:5501", "http://127.0.0.1:5501"],
})) // Configure CORS (Cross-Origin Resource Sharing)

// import the db object from ./models
const db = require('./models')

//  sync the database with the sequelize object
db.sequelize.sync({ alter: false })

// get the port number
const port = process.env.PORT || 3000

// let the server listen
app.listen(port, () => {
    console.log("Server is listening on PORT 3000...")
})