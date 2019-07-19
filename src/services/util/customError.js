const path = require('path')
const logger = require('../util/logger')
const projectRootDirectory = process.env.projectRootDirectory

class CustomError extends Error {

    /**
     *Creates an instance of CustomError.
     * @param {String} thrower
     * @param {String} message
     * @param {Integer} status
     * @param {String} [logLevel=logger.loggingLevels.warn] The message of this error will be, automatically, logged with the level defined by this variable.
     *                                                      If not provided, 'warn' will be the default level, but if 'null', 'undefined' or an  invalid value 
     *                                                      is provided, then the message won't be logged !!!
     * @memberof CustomError
     */
    constructor(thrower, message, status, logLevel = logger.loggingLevels.warn) {
        return (async () => {
            super(message)
            this.thrower = thrower
            this.name = `${thrower}Error`
            this.status = status
            if (logLevel && logger.loggingLevels.has(logLevel)) {
                const throwPoint = await this.getThrowPoint()
                await logger[logLevel](`[${throwPoint}] ${this.message}`)
            }
            return this
        })()
    }

    async getThrowPoint() {
        const fileRowAndColumn = this.stack
            .split("at ")[1]
            .split("(")[1]
            .split(')')[0]
            .split(':');

        const [file, row, column] = fileRowAndColumn
        const fileRelativePath = path.relative(projectRootDirectory, file)
        return `${fileRelativePath}:${row}:${column}`
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
module.exports.loggingLevels = logger.loggingLevels