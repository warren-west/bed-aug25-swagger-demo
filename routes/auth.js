require('dotenv').config()
const router = require('express').Router()
const { Op } = require('sequelize') // import the Op operator
const db = require("../models")
const jwt = require('jsonwebtoken')

// POST /login
router.post('/', async (req, res) => {
    // #swagger.tags = ["Authentication"]
    // #swagger.summary = "Log in using username and password credentials."
    console.log("/LOGIN PINGED 🚨")
    // get the username, email and password from the req.body
    const { email='', username='', password } = req.body

    // validate password,
    // we NEED a password to exist
    if (!password) {
        res.status(400).json({ data: null, message: "Error", error: "Username and password are required." })
        return
    }

    // we need EITHER a username OR an email to log the user in
    if (!username && !email) {
        res.status(400).json({ data: null, message: "Error", error: "Username or email is required." })
        return
    }

    try {
        // we have a (username or email) and password combination to check
        // modify the WHERE clause, to find user by email or by username
        let result = await db.User.findOne({ where: { [Op.or]: [ { username }, { email } ]}})

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
    // #swagger.tags = ["Authentication"]
    // #swagger.summary = "Sign up and create a new User record in the DB."
    const { username, password, confirmPassword, email } = req.body

    // basic validation
    if (!username || !password || !confirmPassword || !email) {
        res.status(400).json({ data: null, message: "Error", error: "Username, password, and email required." })
        return
    }

    // if the password doesn't match the confirmPassword, throw an error
    if (password !== confirmPassword) {
        res.status(400).json({ data: null, message: "Error", error: "Passwords need to match." })
        return
    }

    try {
        // create a new user record in the DB
        // this could throw validation errors if the username or email is not unique, or if the email is invalid, e.g. "warren.com"
        const result = await db.User.create({
            username,
            password,
            email,
            RoleId: 1, // default a new user to the Role of "CUSTOMER", not "ARTIST"
        })

        // create the payload, and remove the "password" property
        const payload = { ...JSON.parse(JSON.stringify(result)) }
        console.log(payload)
        delete payload.password
        console.log(payload) // same, but without "password" property

        // create the token with the payload object and secret
        const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })

        // successful login
        res.status(201).json({ data: newToken, message: "Success", error: null })
        return

    } catch (error) {
        // using the error object to determine the type of error.
        // dealing with username or email not unique
        if (error.errors[0].type === 'unique violation') {
            const problem = error.errors[0].value
            res.status(400).json({ data: null, message: "Error", error: `'${problem}' is already taken` })
            return
        }
        // deal with invalid email address
        if (error.errors[0].type === "Validation error") {
            const problem = error.errors[0].value
            res.status(400).json({ data: null, message: "Error", error: `'${problem}' is an invalid email address` })
            return
        }

        res.status(500).json({ data: null, message: "Error", error: "Server error" })
        return
    }
})

module.exports = router