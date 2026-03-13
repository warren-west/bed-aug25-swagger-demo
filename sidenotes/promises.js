async function getBoredData() {
    const response = await fetch("https://bored-api.appbrewery.com/random")
    const jsonData = await response.json()

    console.log(response)
    console.log(jsonData)
}

getBoredData()