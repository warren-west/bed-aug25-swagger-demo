const router = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    // #swagger.tags = ['Tattoos']
    // #swagger.summary = 'Retrieve a list of tattoos from the database.'
    // #swagger.description = 'Description of /tattoos'

    // .json() function sets some properties in the response header
    // one of them is the "Content-Type": "application/json"

    // console.log(req.headers) // 🚨

    // check the req object for a token:
    let token = ""

    // if there's no headers.authorization, just ignore that for now, and return the data.
    if (req.headers.authorization)
        token = req.headers.authorization.split(' ')[1]
    else {
        const allTattoos = await db.Tattoo.findAll()
        
        res.status(200).json({ data: allTattoos, message: "Success", error: null })
        return
    }
    
    // at this point, there is a token from headers.authorization
    try {
        const decodedToken = jwt.verify(token, "i-love-skateboards")
        console.log(decodedToken)
        
        const allTattoos = await db.Tattoo.findAll()
        
        res.status(200).json({ data: allTattoos, message: "Success", error: null })
        return
    } catch (error) {
        console.log(error)
        res.status(401).json({ data: null, message: "Error", error: error }) // 401: Unauthorized
        return
    }
})

// return a single object
router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Tattoos']
    // #swagger.summary = 'Retrieve a single tattoo object by ID.'
    // #swagger.description = 'Description of /tattoos/:id'

    const { id } = req.params
    // validate id:
    if (isNaN(id)) {
        res.status(400).json({ data: null, message: "Error", error: "400: Bad input data." })
    }

    try {
        const tattoo = await db.Tattoo.findByPk(id)

        if (!tattoo || tattoo.length === 0) {
            res.status(404).json({ data: null, message: "Error", error: "404: Not found." })
        }

        res.status(200).json({ data: tattoo, message: "Success", error: null })

    } catch(error) {
        res.status(500).json({ data: null, message: "Error", error: "500: Internal server error." })
    }

})

module.exports = router