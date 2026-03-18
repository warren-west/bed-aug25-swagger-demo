require('dotenv').config()
const jwt = require('jsonwebtoken')

function isLoggedIn(req, res, next) {
    let token

    // check if there's an authorization header on the req object
    if (req.headers.authorization)
        token = req.headers.authorization.split(' ')[1]
    
    try {
        // if there is an auth header, get the token from it and verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        // if the token is valid, call next()
        if (decodedToken)
            next()
    } catch (error) {
        // if the token is invalid, return a 401 error
        res.status(401).json({ data: null, message: "Error", error: "Not logged in" })
        return
    }
}

function isArtist(req, res, next) {
    let token
    // check if there's an authorization header on the req object
    if (req.headers.authorization)
        token = req.headers.authorization.split(' ')[1]
    
    try {
        // if there is an auth header, get the token from it and verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        // if the user's RoleId is not 2 (ARTIST), return a 401 error
        if (decodedToken.RoleId !== 2)
            res.status(401).json({ data: null, message: "Error", error: "Unauthorized access" })
        else
            next() // call next() if the RoleId is 2
    } catch (error) {
        // if the token is invalid, return a 401 error
        res.status(401).json({ data: null, message: "Error", error: "Unauthorized access" })
        return
    }
}

// revealing module pattern
module.exports = {
    isArtist,
    isLoggedIn,
}