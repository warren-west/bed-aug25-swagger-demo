require('dotenv').config()
const router = require('express').Router()
const db = require("../models")
const jwt = require('jsonwebtoken')

// POST /login
router.post('/', async (req, res) => {
    console.log("/LOGIN PINGED 🚨")
    // get the username and password from the req.body
    const { username, password } = req.body

    // validate username and password,
    // if either is missing, send back error 400
    if (!username || !password) {
        res.status(400).json({ data: null, message: "Error", error: "Username and password are required." })
        return
    }

    try {
        // we have a username and password combination to check
        const result = await db.User.findOne({ where: { username } })

        console.log(JSON.parse(JSON.stringify(result)))

        // check that result is not null
        if (!result) {
            res.status(404).json({ data: null, message: "Error", error: "User not found." })
            return
        }
        
        // we have a matching user to the username
        // check if password is correct
        if (result.password !== password) {
            res.status(401).json({ data: null, message: "Error", error: "Username / password incorrect." })
            return
        }

        // we have a user with a correct password
        // sign (generate) a token for the user

        // create the payload object for the token
        const payload = { ...JSON.parse(JSON.stringify(result)) }
        // use the "delete" keyword to remove a property from an object
        // we don't want to expose the user's password on the token
        delete payload.password

        const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ data: newToken, message: "Success", error: null })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: null, message: "Error", error: "Something went wrong." })
        return
    }
})

// POST /login/signup
router.post('/signup', async (req, res) => {
    // implement sign up logic
    res.end()
})

module.exports = router