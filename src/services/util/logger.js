const fs = require('fs')
const path = require('path')
const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const env = process.env.NODE_ENV || 'development'
const homeDir = path.resolve(__dirname.split('src/')[0])
const logDir = path.join(homeDir, 'log')

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
            )
        }),
        new DailyRotateFile({
            dirname: logDir,
            filename: 'log.%DATE%.txt',
            format: format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
        })
    ]
})

module.exports = logger
module.exports.stream = {
    write(message, enconding) {
        logger.info(message)
    }
}
