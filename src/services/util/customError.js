const logger = require('../util/logger')
class CustomError extends Error {
    constructor(thrower, message, status, logMessage = false) {
        super(message)
        this.thrower = thrower
        this.name = `${thrower}Error`
        this.status = status
        if(logMessage)
            logger.warn(`[${this.thrower}] ${message}`)
    }

    set status(value) {
        this._status = value
    }

    get status() {
        return this._status
    }

    set thrower(value) {
        this._thrower = value
    }

    get thrower() {
        return this._thrower
    }
}

module.exports = CustomError