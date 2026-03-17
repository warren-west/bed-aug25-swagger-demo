const router = require('express').Router()

router.get('/', (req, res) => {
    // #swagger.tags = ['Index']
    // #swagger.summary = 'Display a welcome message on the home page.'
    res.json({ 
        message: "Welcome to the Tattoo API!" ,
        endpoints: {
            tattoos: {
                getAll: 'GET /tattoos',
                getById: 'GET /tattoos/:id',
            },
            styles: {
                getAll: 'GET /styles',
                getById: 'GET /styles/:id',
                create: 'POST /styles',
                update: 'PUT /styles/:id',
                delete: 'DELETE /styles/:id',
            },
            colors: {
                getAll: 'GET /colors',
            }
        }
    })
})

module.exports = router