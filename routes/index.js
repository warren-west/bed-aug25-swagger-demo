const router = require('express').Router()

router.get('/', (req, res) => {
    // #swagger.tags = ['Index']
    // #swagger.summary = 'Display a welcome message on the home page.'
    res.json({ message: "Welcome to the Tattoo API!" })
})

module.exports = router