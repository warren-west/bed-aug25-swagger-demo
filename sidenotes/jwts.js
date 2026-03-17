const jwt = require('jsonwebtoken')

function signNewToken() {
    return jwt.sign({
        username: "warren-west",
        email: "warren@west.com",
        firstname: "Warren",
        roleId: 2,
    },
        "you-secret",
        { expiresIn: "1s" }
    )
}

function validateToken(token) {
    try {
        const decodedToken = jwt.verify(token, "you-secret")
        console.log(decodedToken)

    } catch (error) {
        console.log(error)
    }
}

const token = signNewToken()
console.log(token)

setTimeout(() => {
    console.log("executing timeout")
    validateToken(token)
    console.log("done")
}, 2000)