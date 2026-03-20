require('dotenv').config()
const app = require('./app')

// get the port number
const port = process.env.PORT || 3000

// let the server listen
app.listen(port, () => {
    console.log("Server is listening on PORT 3000...")
})