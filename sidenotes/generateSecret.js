const fs = require('fs')

function genSecret() {
    let output = "JWT_SECRET='"
    for (let i = 0; i < 64; i++) {
        // generate a number between 60 and 122
        const n = Math.floor(Math.random() * 62) + 60
        output += String.fromCharCode(n)
    }
    output += "'"
    console.log(output)

    fs.writeFileSync('./test.env', output)

    return output
}

genSecret()