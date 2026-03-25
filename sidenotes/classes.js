class Animal {
    // inside classes, we don't use "const", "let", or "function" keywords
    constructor(name, weight) {
        this.name = name
        this.weight = weight
        this.hasTeeth = true
    }

    numberOfHearts = 1

    displayAnimalDetails() {
        return `My name is ${this.name} and I weight ${this.weight}`
    }

    getWeight() {
        return this.weight
    }
}