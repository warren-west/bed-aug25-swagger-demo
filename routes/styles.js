const router = require('express').Router()
const db = require('../models')

// get all styles
router.get('/', async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Retrieve a list of styles from the database.'
    const results = await db.Style.findAll()

    res.json({ data: results, message: "Success", error: null })
})

// get style by ID
router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Styles']
    // #swagger.summary = 'Retrieve a single style object by ID.'
    const { id } = req.params

    const style = await db.Style.findByPk(id)
    
    res.json({ data: style, message: "Success", error: null })
})

module.exports = router