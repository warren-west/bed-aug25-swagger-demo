const router = require('express').Router()
const db = require('../models')

router.get('/', async (req, res) => {
    // #swagger.tags = ['Tattoos']
    // #swagger.summary = 'Retrieve a list of tattoos from the database.'
    // #swagger.description = 'Description of /tattoos'

    // .json() function sets some properties in the response header
    // one of them is the "Content-Type": "application/json"
    const allTattoos = await db.Tattoo.findAll()
    
    res.status(200).json({ data: allTattoos, message: "Success", error: null })
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