const request = require('supertest')
const app = require('../app')

let token

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

    test.skip("Login works for valid email, valid password, and undefined username.", async () => {
        // todo
    })
    
    test.skip("Login fails for invalid login credentials.", async () => {
        // todo
    })

    // other auth tests
})

// describe is a container for multiple related tests
describe("Style Tests", () => {

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
        const { body, statusCode} = await request(app)
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

    // other style tests
})


describe("Tattoo Tests", () => {
    // Should refactor this old test to use supertest request(app).get('/tattoos')...
    test.skip("We get a list of tattoos back from the /tattoos endpoint.", async () => {
    
        // Arrange
        const expectedStatusCode = 200
    
        // Act
        const resp = await fetch('http://localhost:3000/tattoos')
        const actual = await resp.json()
    
        console.log(actual)
    
        // Assert
        // check the status code
        expect(resp.status).toBe(expectedStatusCode) // status should be 200
    
        // check the properties on the root object
        expect(actual).toHaveProperty("status")
        expect(actual).toHaveProperty("data")
    
        // check that the status equals "success"
        expect(actual.status).toBe("success")
        // check that the data array is greater than 0
        expect(actual.data.length).toBeGreaterThan(0)
        // check the properties on the data object
        expect(actual.data[0]).toHaveProperty("id")
        expect(actual.data[0]).toHaveProperty("description")
        expect(actual.data[0]).toHaveProperty("UserId")
        expect(actual.data[0]).toHaveProperty("StyleId")
    })

    // other tattoo tests
})