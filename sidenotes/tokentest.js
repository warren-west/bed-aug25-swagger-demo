// TOKEN-BASED AUTHENTICATION
// is an alternative to SESSION-BASED authentication
// When the user logs in or signs up successfully, they are issued a TOKEN
// A token is an encoded JSON object with 3 parts:
// 1. Header
// 2. Payload (body)
// 3. Secret signature
// The user will attach their token to every request to the back end server.
// The server can use this token to get details about the user, and if needed,
// the server can verify the token to make sure it is valid:
// Validation means that a token has not expired, AND
// the token can be validated with a "secret" string.


const jwt = require('jsonwebtoken')

const userDetails = {
  firstName: "Pål",
  lastName: "Drageset",
  username: "paal_dr",
  roleId: 2,
  age: 35,
}

const newToken = jwt.sign(userDetails, 'i-love-skateboards')
console.log("NEW TOKEN:")
console.log(newToken)

try {
    const result = jwt.verify(newToken, 'i-love-skateboards')
    console.log("SUCCESSFULLY VALIDATED TOKEN:")
    console.log(result)
    
} catch (error) {
    console.log("ERROR")
    console.log(error)
}