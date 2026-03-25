class TattooService {
    constructor(db) {
        this.Tattoo = db.Tattoo
        // include related data
        this.Style = db.Style
        this.Color = db.Color
    }

    // we fill the service class with all of the CRUD functionality we want

    /**
     * Get all of the tattoo records from the database, including related Style and Color data.
     * @returns A list of Tattoo objects.
     */
    async getAllTattoos() {
        return this.Tattoo.findAll({ include: [this.Style, this.Color] })
    }

    async getTattooById(id) {
        return this.Tattoo.findByPk(id, { include: [this.Style, this.Color] })
    }

    async createTattoo(description, UserId, StyleId, Colors = []) {
        const newTattoo = await this.Tattoo.create({ description, UserId, StyleId })

        // attach related Colors data if the array is not empty
        if (Colors) {
            await newTattoo.setColors(Colors)
            await newTattoo.reload({ include: [this.Color] })
        }

        return newTattoo
    }

    async updateTattooById(id, updatedTattoo) {
        return this.Tattoo.update(updatedTattoo, { where: { id } })
    }

    async deleteTattooById(id) {
        return this.Tattoo.destroy({ where: { id } })
    }
}

module.exports = TattooService