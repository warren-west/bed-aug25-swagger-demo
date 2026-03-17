const router = require('express').Router()
const db = require('../models')

// hard-code the starting data
router.post('/', async (req, res) => {
    // #swagger.tags = ['Populate']
    // #swagger.summary = 'Populates the database with dummy data.'
    // Tattoo data
    const tattoos = [
        { description: "Panther", StyleId: 1, UserId: 1 },
        { description: "Patterns", StyleId: 2, UserId: 1 },
        { description: "Circles", StyleId: 3, UserId: 1 },
    ]

    // Style data
    const styles = [
        { styleName: "traditional" },
        { styleName: "tribal" },
        { styleName: "geometric" },
    ]

    // Color data
    const colors = [
        { colorName: "Black" },
        { colorName: "Green" },
        { colorName: "Red" },
        { colorName: "Blue" },
        { colorName: "White" },
        { colorName: "Blue" },
    ]

    // Roles
    const roles = [
        { roleName: "CUSTOMER" },   // id=1
        { roleName: "ARTIST" },     // id=2
    ]

    // Users
    const users = [
        { username: "warren-west", email: "warren@west.com", password: "1234", RoleId: 1 },
        { username: "kat-von", email: "kat@blueink.com", password: "admin", RoleId: 2 },
    ]

    // Linking table data
    const timeNow = new Date()
    const tattooColors = [
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 1, ColorId: 1 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 1, ColorId: 6 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 2, ColorId: 1 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 2, ColorId: 2 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 2, ColorId: 3 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 3, ColorId: 3 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 3, ColorId: 4 },
        { createdAt: timeNow, updatedAt: timeNow, TattooId: 3, ColorId: 5 },
    ]
    
    console.log('populating database...')
    
    // use sequelize's .bulkCreate() function to seed the DB with dummy data
    // Important: Don't forget the await keyword here:
    try {
        await db.Role.bulkCreate(roles)
        await db.User.bulkCreate(users)
        await db.Color.bulkCreate(colors)
        await db.Style.bulkCreate(styles)
        await db.Tattoo.bulkCreate(tattoos)
        await db.sequelize.models['tattoo_colors'].bulkCreate(tattooColors)
        
        res.json({ message: "Database populated successfully ✅" })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Encountered an error while populating the database ❌", error: error.message })
    }
})

module.exports = router