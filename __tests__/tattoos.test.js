const request = require('supertest')
const app = require('../app')

let token
let artistToken

describe("Auth Tests", () => {
    test("Login works with valid username, valid password, and undefined email.", async () => {
        // Arrange
        const expectedCode = 200
        const expectedStatusMessage = "Success" // the jsend message property

        // Act
        const { body, statusCode } = await request(app)
            .post('/login')
            .send({ username: "warren-west", password: "1234" })

        // Assert
        expect(statusCode).toBe(expectedCode)

        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("message")
        expect(body).toHaveProperty("error")

        expect(body.message).toBe(expectedStatusMessage)
        expect(body.error).toBeNull()

        // assign the value of the valid token to the token variable to use later in other tests
        token = body.data
    })

    test("Login works for valid email, valid password, and undefined username.", async () => {
        const expectedCode = 200
        const expectedStatusMessage = "Success" // the jsend message property

        // Act
        const { body, statusCode } = await request(app).post('/login').send({ email: "warren@west.com", username: undefined, password: "1234" })

        // Assert
        expect(statusCode).toBe(expectedCode)

        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("message")
        expect(body).toHaveProperty("error")

        expect(body.message).toBe(expectedStatusMessage)
        expect(body.error).toBeNull()
    })

    test("Login fails for correct username, incorrect password.", async () => {
        // Arrange
        const expectedCode = 401
        const expectedErrorMessage = "Username / password incorrect."
        const expectedStatus = "Error"

        // Act
        const { body, statusCode } = await request(app).post('/login').send({ username: "warren-west", password: "abcdef" })

        // Assert
        expect(statusCode).toBe(expectedCode)
        expect(body.error).toBe(expectedErrorMessage)
        expect(body.message).toBe(expectedStatus)

        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("error")
        expect(body).toHaveProperty("message")

        expect(body.data).toBeNull()
    })

    test("Logging in without any username, password, or email. Should return 400: bad request.", async () => {
        // Arrange
        const expectedCode = 400
        const expectedStatusMessage = "Username and password are required."
        const expectedStatus = "Error"

        // Act
        const { body, statusCode } = await request(app).post('/login').send({ username: null, password: null, email: null })

        // Assert
        expect(statusCode).toBe(expectedCode)
        expect(body.message).toBe(expectedStatus)
        expect(body.error).toBe(expectedStatusMessage)

        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("message")
        expect(body).toHaveProperty("error")

        expect(body.data).toBeNull()
    })

    test("Login successfully with ARTIST credentials. Should return a token.", async () => {
        // Arrange
        const username = "kat-von"
        const password = "admin"
        const expectedStatusCode = 200
        const expectedStatusMessage = "Success"

        // Act
        const { body, statusCode } = await request(app).post('/login').send({ username, password })

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body.message).toBe(expectedStatusMessage)
        expect(body).toHaveProperty("message")
        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("error")
        expect(body.error).toBeNull()
        expect(body.data).not.toBeNull()
        expect(body.data).not.toBeUndefined()

        artistToken = body.data
    })
})

// describe is a container for multiple related tests
describe("Style Tests", () => {
    let newStyleId

    // note the function in the test params is ASYNC
    test("The GET /styles endpoint returns a list of styles.", async () => {
        // Arrange
        const expectedCode = 200

        // Act
        // we're using supertest's ".request()" function that uses your server's code to get a response
        // not by sending an actual request to a listening server
        // the benefit to this is that the tests can run without the server being running
        // so tests can be run by GitHub Actions, for example, in the repository
        const { body, statusCode } = await request(app).get('/styles')
        console.log(body)
        console.log(statusCode)

        // Assert
        // check the status code
        expect(statusCode).toBe(expectedCode) // status should be 200

        // check the properties on the root object
        expect(body).toHaveProperty("status")
        expect(body).toHaveProperty("data")

        // check that the data array is greater than 0
        expect(body.data.length).toBeGreaterThan(0)
        // check the properties on the data object
        expect(body.data[0]).toHaveProperty("id")
        expect(body.data[0]).toHaveProperty("styleName")
    })


    test("The GET /styles/:id endpoint returns a single style record with a valid JWT.", async () => {
        // Arrange
        const id = 2
        const expectedCode = 200

        // Act
        // destructure the body and statusCode of the response object
        const { body, statusCode } = await request(app)
            .get(`/styles/${id}`)
            .set("authorization", `Bearer ${token}`)

        console.log(body)

        expect(statusCode).toBe(expectedCode)
        expect(body.status).toBe("success")

        expect(body.data).toHaveProperty("id")
        expect(body.data).toHaveProperty("styleName")
    })

    test("The GET /styles/:id endpoint with an invalid JWT, should get 401.", async () => {
        // todo
    })

    // test POST /styles
    test("The POST /styles endpoint with a valid styleName property, should get a 201.", async () => {
        // Arrange
        const expectedStatusCode = 201
        const expectedStatusMessage = "success"
        const newStyle = { styleName: "Anime" }

        // Act
        const { body, statusCode } = await request(app).post('/styles').set("authorization", `Bearer ${artistToken}`).send(newStyle)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toHaveProperty("status")
        expect(body).toHaveProperty("data")
        expect(body.status).toBe(expectedStatusMessage)
        expect(body.data).toHaveProperty("id")
        expect(body.data).toHaveProperty("styleName", newStyle.styleName)

        newStyleId = body.data.id
    })

    // test PUT /styles/:id
    test("The UPDATE /styles/:id endpoint should update the styleName of the new Style that was created. Should return a 204.", async () => {
        // Arrange
        const expectedStatusCode = 204
        const updatedStyleName = "Animated"

        // Act
        const { body, statusCode } = await request(app).put(`/styles/${newStyleId}`).set("authorization", `Bearer ${artistToken}`).send({ styleName: updatedStyleName })

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toMatchObject({})
    })
    
    // test DELETE /styles/:id
    test("The DELETE /styles/:id endpoint should delete the newly created and updated Style record by ID, should return a 204.", async () => {
        // Arrange
        const expectedStatusCode = 204
        
        // Act
        const { body, statusCode } = await request(app).delete(`/styles/${newStyleId}`).set("authorization", `Bearer ${artistToken}`)
        
        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toMatchObject({})
    })
    
    test("The DELETE /styles/:id endpoint should try delete the same object that was just deleted, should return a 404.", async () => {
        // Arrange
        const expectedStatusCode = 404
        const expectedStatusMessage = "404: Not found."
        const expectedStatus = "error"
        
        // Act
        const { body, statusCode } = await request(app).delete(`/styles/${newStyleId}`).set("authorization", `Bearer ${artistToken}`)
        
        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        
        expect(body).toHaveProperty("message")
        expect(body).toHaveProperty("status")
    
        expect(body.message).toBe(expectedStatusMessage)
        expect(body.status).toBe(expectedStatus)
    })

    test("The UPDATE /styles/:id endpoint where a Style doesn't exist. Should return a 404.", async () => {
        const expectedStatusCode = 404
        const styleName = "Updated style name"
        const expectedStatusMessage = "404: Not found."
        const expectedStatus = "Error"

        const { body, statusCode } = await request(app).put(`/styles/${newStyleId}`).set("authorization", `Bearer ${artistToken}`).send({ styleName })

        expect(statusCode).toBe(expectedStatusCode)
        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("error")
        expect(body).toHaveProperty("message")

        expect(body.data).toBeNull()
        expect(body.error).toBe(expectedStatusMessage)
        expect(body.message).toBe(expectedStatus)
    })
})


describe.skip("Tattoo Tests", () => {
    // Should refactor this old test to use supertest request(app).get('/tattoos')...
    test("We get a list of tattoos back from the /tattoos endpoint.", async () => {

        // Arrange
        const expectedStatusCode = 200
        const expectedStatus = "success"

        // Act
        const { body, statusCode } = await request(app).get('/tattoos')

        // Assert
        // check the status code
        expect(statusCode).toBe(expectedStatusCode) // status should be 200
        expect(body.status).toBe(expectedStatus)

        // check the properties on the root object
        expect(body).toHaveProperty("status")
        expect(body).toHaveProperty("data")

        // check that the status equals "success"
        expect(body.status).toBe("success")
        // check that the data array is greater than 0
        expect(body.data.length).toBeGreaterThan(0)
        // check the properties on the data object
        expect(body.data[0]).toHaveProperty("id")
        expect(body.data[0]).toHaveProperty("description")
        expect(body.data[0]).toHaveProperty("UserId")
        expect(body.data[0]).toHaveProperty("StyleId")
    })

    test("We expect a successful single tattoo to be returned, provided a valid ID.", async () => {
        // Arrange
        const expectedStatusCode = 200
        const expectedStatus = "success"
        const id = 2

        // Act
        const { body, statusCode } = await request(app).get('/tattoos/' + id).set("authorization", `Bearer ${token}`)

        // Assert
        expect(statusCode).toBe(expectedStatusCode)
        expect(body.status).toBe(expectedStatus)

        expect(body).toHaveProperty("status")
        expect(body).toHaveProperty("data")

        expect(body.data).toHaveProperty("id")
        expect(body.data).toHaveProperty("description")
        expect(body.data).toHaveProperty("StyleId")
        expect(body.data).toHaveProperty("UserId")
    })

    test("Successfully create a new Tattoo record in the database.", async () => {
        // Arrange
        const expectedCode = 201
        const newTattooData = { description: "Zebra", UserId: 1, StyleId: 1, Colors: [1] }
        const expectedStatus = "success"

        // Act
        const { body, statusCode } = await request(app).post('/tattoos').send(newTattooData)

        // Assert
        expect(statusCode).toBe(expectedCode)
        expect(body.status).toBe(expectedStatus)

        // response body should have properties:
        expect(body).toHaveProperty("data")
        expect(body).toHaveProperty("status")

        // response body.data should have properties:
        expect(body.data).toHaveProperty("id")
        expect(body.data).toHaveProperty("description")
        expect(body.data).toHaveProperty("UserId")
        expect(body.data).toHaveProperty("StyleId")
        expect(body.data).toHaveProperty("Colors")
    })
})