class Enum {
    constructor(object) {
        for (const key in object)
            this[key] = object[key]

        return Object.freeze(this)
    }

    has(key) {
        return this.hasOwnProperty(key)
    }
}

module.exports = Enum