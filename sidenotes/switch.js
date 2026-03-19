const fruit = ["apple", "banana", "grape"]

let selectedFruit = fruit[1]

if (selectedFruit === "apple") {
    console.log("Red")
} else if (selectedFruit === "banana") {
    console.log("Yellow")

} else if (selectedFruit === "grape") {
    console.log("Purple")

} else {
    console.log("I don't know that color...")
}

// this code is arguably more readable than the chained if statements above:
switch (selectedFruit) {
    case "apple": {
        console.log("Red")
        break
    }
    case "banana": {
        console.log("Yellow")
        break
    }
    case "grape": {
        console.log("Purple")
        break
    }
    default: {
        console.log("I don't know that color...")
    }
}