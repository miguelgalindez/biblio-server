const fs = require('fs')
const path = require('path')
const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const Enum = require('./enum')
const { winston: winstonConfig } = require('../../config/env')


/**
 * Singleton class that creates a single instance of
 * the logging provider for the entire app
 *
 * @class Logger
 */
class Logger {

    /**
     * Creates an instance of Logger.
     * @memberof Logger
     */

    constructor() {
        // Implementing singleton pattern
        if (!Logger.exists) {
            this.provider = this.createLogger()
            this.stream = this.buildStream()
            this.levels = this.buildLoggingLevels()
            Logger.instance = this
            Logger.exists = true
        }
        return Logger.instance
    }

    /**
     * Creates a logging provider instance
     *
     * @returns {LoggingProvider}
     * @memberof Logger
     */
    createLogger() {
        const nodeEnv = process.env.NODE_ENV

        return createLogger({
            transports: this.buildTransports(nodeEnv),
            format: format.timestamp({ format: winstonConfig.timestampTemplate }),
            exitOnError: false,
        })
    }

    /**
     * Build transports for the logging provider
     * based on the environment the app is running on,
     * that is, for:
     *      - development: returns [ConsoleTransport, DailyRotateFileTransport]
     *      - production: returns [DailyRotateFileTransport]
     *
     * @param {String} env. Allowed values are: 'development' and 'production'
     * @returns {[Transport]}
     * @memberof Logger
     */
    buildTransports(env) {

        let transports = [this.buildDailyRotateFile()]
        if (env !== 'production') {
            transports.push(this.buildConsoleTransport())
        }
        return transports
    }

    /**
     * Builds a console transport based on
     * the configuration properties defined
     * in the env.js file
     *
     * @returns {Transport}
     * @memberof Logger
     */
    buildConsoleTransport() {
        return new transports.Console({
            ...winstonConfig.transports.console,
            handleExceptions: true,
            format: format.combine(
                format.colorize(),
                format.printf(winstonConfig.transports.console.template),
            ),
        })
    }
    /**
     * Builds a daily rotate file transport based on
     * the configuration properties defined
     * in the env.js file
     *
     * @returns {Transport}
     * @memberof Logger
     */
    buildDailyRotateFile() {
        const defaultLogsDirectory = path.join(process.env.projectRootDirectory, 'log')
        const logsDirectory = winstonConfig.transports.dailyRotateFile.dirname || defaultLogsDirectory

        // Create the log directory if it does not exist
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory);
        }

        return new DailyRotateFile({
            ...winstonConfig.transports.dailyRotateFile,
            handleExceptions: true,
            dirname: logsDirectory,
            format: format.printf(winstonConfig.transports.dailyRotateFile.template),
        })
    }

    /**
     * Builds the logging provider stream
     *
     * @returns {Object} Object whose properties includes write function
     * @memberof Logger
     */
    buildStream() {
        return {
            write: async (message, enconding) => {
                this.provider.info(message)
            }
        }
    }

    /**
     * Builds the enum of logging levels allowed
     * by the provider
     *
     * @returns {Enum}
     * @memberof Logger
     */
    buildLoggingLevels() {
        return new Enum({
            error: 'error',
            warn: 'warn',
            info: 'info',
            verbose: 'verbose',
            debug: 'debug',
            silly: 'silly'
        })
    }
}

const logger = new Logger()

module.exports = logger.provider
module.exports.stream = logger.stream
module.exports.levels = logger.levels