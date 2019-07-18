class CustomError extends Error {
    constructor(name, message, status) {
        super(message)
        this.name = name
        this.status = status
    }

    set status(value) {
        this._status = value
    }

    get status() {
        return this._status
    }
}

module.exports = CustomError