test("We get a list of tattoos back from the /tattoos endpoint.", async () => {

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