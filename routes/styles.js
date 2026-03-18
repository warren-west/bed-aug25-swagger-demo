const router = require('express').Router()
const { isArtist, isLoggedIn } = require('../middlewares/authMiddleware')
const db = require('../models')

// get all styles
router.get('/', async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Retrieve a list of styles from the database.'
    const results = await db.Style.findAll()

    res.json({ data: results, message: "Success", error: null })
})

// get style by ID
// check that the user is logged in to get a style by ID
router.get('/:id', isLoggedIn, async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Retrieve a single style object by ID.'
    const { id } = req.params

    const style = await db.Style.findByPk(id)

    res.json({ data: style, message: "Success", error: null })
})

// check that the user is logged in, and has admin rights to create a new style
router.post('/', isLoggedIn, isArtist, async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Add a new Style record into the database.'
    // #swagger.description = 'Provide the details for a new Style record to be added to the database.'
    /* #swagger.parameters['body'] =  {
        "name": "body",
        "in": "body",
        "schema": {
            $ref: "#/definitions/Style"
            }
            }
            */

    const { styleName } = req.body

    // styleName is empty, undefined, or null
    if (!styleName) {
        res.status(400).json({ data: null, message: "Error", error: "Invalid input." })
        return
    }

    try {
        // the newly created object is returned to us
        const result = await db.Style.create({ styleName })

        res.status(201).json({ data: result, message: "Success", error: null })
        return

    } catch (error) {
        res.status(500).json({ data: null, message: "Error", error: "Internal server error." })
        return
    }

})

// update a style, by ID
// check that the user is an ARTIST to update a style
router.put('/:id', isArtist, async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Update a Style record in the database.'
    // #swagger.description = 'Provide the new details for the Style record to updated.'
    // #swagger.parameters['body'] =  {
    // "name": "body",
    // "in": "body",
    //   "schema": {
    //     $ref: "#/definitions/Style"
    //   }
    // }
    // #swagger.parameters['id'] =  {
    //   in: 'query',
    //   description: 'The ID of the Style record we want to update.',
    //   type: 'number'
    // }

    const { id } = req.params
    const { styleName } = req.body

    // validate inputs:
    if (isNaN(id)) {
        res.status(400).json({ data: null, message: "Error", error: "Invalid ID provided" })
        return
    }

    if (!styleName) {
        res.status(400).json({ data: null, message: "Error", error: "Invalid styleName provided" })
        return
    }

    try {
        const result = await db.Style.update({ styleName }, { where: { id } })

        if (!result) {
            res.status(404).json({ data: null, message: "Error", error: "404: Not found." })
            return
        }

        res.status(204).json() //.json({ data: "Success", message: "Success", error: null })
        return

    } catch (error) {
        res.status(500).json({ data: null, message: "Error", error: "Internal server error." })
        return
    }
})

// check that the user is logged in, and is an ARTIST to delete a style
router.delete('/:id', isLoggedIn, isArtist, async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Delete a Style record from the database.'
    // #swagger.description = 'Provide the ID for the Style record to deleted.'
    // #swagger.parameters['id'] =  {
    //   in: 'query',
    //   description: 'The ID of the Style record we want to delete.',
    //   type: 'number'
    // }

    const { id } = req.params

    // validate
    if (isNaN(id)) {
        res.status(400).json({ data: null, message: "Error", error: "Invalid ID input." })
        return
    }

    try {
        const result = await db.Style.destroy({ where: { id } })
        console.log(result) // 0 rows affected

        if (!result) {
            res.status(404).json({ data: null, message: "Error", error: "404: Not found." })
            return
        }

        res.status(204).json() // no point in trying to attach a response
        return

    } catch (error) {
        res.status(500).json({ data: null, message: "Error", error: "Internal server error" })
        return
    }
})

module.exports = router