const personOne = { firstName: "Adam", gender: "Male" }
const personTwo = {...personOne}

personTwo.firstName = "Eve"
personTwo.gender = "Female"

console.log(personOne) // { Adam, Male }
console.log(personTwo) // { Eve, Female }

const numbers = [ 1, 2, 3, 4, 5 ]
const words = [...numbers]

words[0] = "One"
words[1] = "Two"

console.log(numbers) // ?
console.log(words) // ?