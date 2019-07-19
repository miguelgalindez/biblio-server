const fs = require('fs')
const path = require('path')
const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const Enum = require('./enum')
const logDir = path.join(process.env.projectRootDirectory, 'log')
const env = process.env.NODE_ENV || 'development'


// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    exitOnError: false,
    format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
            ),
            handleExceptions: true,
            level: 'silly'
        }),
        new DailyRotateFile({
            dirname: logDir,
            filename: 'log.%DATE%.txt',
            format: format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
            handleExceptions: true,
            level: 'info'
        })
    ]
})

module.exports = logger

module.exports.stream = {
    async write(message, enconding) {
        logger.info(message)
    }
}

module.exports.loggingLevels = new Enum({
    error: 'error',
    warn: 'warn',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug',
    silly: 'silly'
})