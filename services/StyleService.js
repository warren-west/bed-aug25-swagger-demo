class StyleService {
    constructor(db) {
        this.Style = db.Style
        this.Tattoo = db.Tattoo
    }

    /**
     * Fetch all Style records from the DB.
     * @returns An array of all the Style record in the DB.
     */
    async getAllStyles() {
        return this.Style.findAll()
    }

    /**
     * Fetch a single Style record from the DB.
     * @param {Number} id The ID of the Style record to fetch from the DB.
     * @returns The Style record matching the ID provided.
     */
    async getStyleById(id) {
        return this.Style.findByPk(id)
    }

    /**
     * Add a new Style record to the DB.
     * @param {String} newStyleName The name of the new Style.
     * @returns The newly created Style record.
     */
    async createStyle(newStyleName) {
        return this.Style.create({ styleName: newStyleName })
    }

    /**
     * Update the details of a Style record in the DB by ID.
     * @param {Number} id The ID of the Style to be updated.
     * @param {String} styleName The updated styleName property.
     * @returns The number of rows affected.
     */
    async updateStyle(id, styleName) {
        return this.Style.update({ styleName }, { where: { id } })
    }

    /**
     * Overwrite multiple Style records in the DB by styleName.
     * @param {String} styleName The styleName to search for and overwrite.
     * @param {String} updatedStyleName The new styleName to replace the current styleName.
     * @returns An array with a single value representing the number of rows affected.
     */
    async massUpdateByStyleName(styleName, updatedStyleName) {
        return this.Style.update({ styleName: updatedStyleName }, { where: { styleName } })
    }

    /**
     * Delete a Style record from the DB.
     * @param {Number} id The ID of the Style to delete from the DB.
     * @returns The number of rows affected.
     */
    async deleteStyle(id) {
        return this.Style.destroy({ where: { id } })
    }
}

module.exports = StyleService