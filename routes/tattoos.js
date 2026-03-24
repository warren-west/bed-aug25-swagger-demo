const router = require('express').Router()
const db = require('../models')
const { isLoggedIn, isArtist } = require('../middlewares/authMiddleware.js')

router.get('/', async (req, res) => {
    // #swagger.tags = ['Tattoos']
    // #swagger.summary = 'Retrieve a list of tattoos from the database.'
    // #swagger.description = 'Description of /tattoos'

    // .json() function sets some properties in the response header
    // one of them is the "Content-Type": "application/json"

    const allTattoos = await db.Tattoo.findAll({ include: [db.Style, db.Color] })

    // res.status(200).json({ data: allTattoos, message: "Success", error: null })
    // replace old way of returning data with JSEND:
    res.jsend.success(allTattoos)
    return
})

// return a single object
router.get('/:id', isLoggedIn, async (req, res) => {
    // #swagger.tags = ['Tattoos']
    // #swagger.summary = 'Retrieve a single tattoo object by ID.'
    // #swagger.description = 'Fetch a single record of a tattoo from the database. The user should be logged in, but not required to have the role of "ARTIST". The Authorization header should have the format: "Bearer <TOKEN>."'
    
    const { id } = req.params
    // validate id:
    if (isNaN(id)) {
        // res.status(400).json({ data: null, message: "Error", error: "400: Bad input data." })
        res.status(400).jsend.error("400: Bad input data.")
        return
    }
    
    try {
        const tattoo = await db.Tattoo.findByPk(id, { include: [ db.Style, db.Color ] })
        
        if (!tattoo || tattoo.length === 0) {
            // the tattoo was not found
            // res.status(404).json({ data: null, message: "Error", error: "404: Not found." })
            res.status(404).jsend.error("404: Not found.")
            return
        }
        
        // res.status(200).json({ data: tattoo, message: "Success", error: null })
        res.jsend.success(tattoo)
        return
    } catch (error) {
        // res.status(500).json({ data: null, message: "Error", error: "500: Internal server error." })
        res.status(500).jsend.error("500: Internal server error.")
        return
    }
})

// add a new tattoo to the DB
router.post('/', async (req, res) => {
    // #swagger.tags = ['Tattoos']
    // #swagger.summary = 'Create a new tattoo record in the DB.'
    // #swagger.description = 'Create a new tattoo record in the DB.'
    const { UserId, StyleId, description } = req.body
    
    // validation
    if (!UserId || !StyleId || !description) {
        res.status(400).jsend.error("400: Bad input.")
        return
    }

    try {
        // this will throw an error if the UserId or StyleId doesn't exist in the Db
        const result = await db.Tattoo.create({ description, UserId, StyleId })

        // success
        res.status(201).jsend.success(result)
        return        

    } catch (error) {
        // deal with error
        console.log(error)
        
        if (!error.name) {
            res.status(500).json(error)
            return
        }

        if (error.name === "SequelizeForeignKeyConstraintError") {
            res.status(400).jsend.error(`The ${error.fields[0]} with the value '${error.value}' does not exist.`)
            return
        }
    }
})



module.exports = router