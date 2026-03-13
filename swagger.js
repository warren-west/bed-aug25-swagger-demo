const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
        version: "1.0.0",
        title: "The Tattoo API",
        description: "An API that serves Tattoo, Style, and Color data."
    },
    host: "localhost:3000",
    definitions: {
        Tattoo: {
            $description: "Black panther",
        },
        Style: {
            styleName: "Japanese"
        },
        Color: {
            colorName: "Red"
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.js']

// swaggerAutogen(outputFile, endpointsFiles, doc) // the function that generates the .json file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js') // starts the server
})