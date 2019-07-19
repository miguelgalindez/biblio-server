const mongoose = require('mongoose')
const logger = require('../util/logger')

const openConnection = async environmentProperties => {
    await mongoose.connect(environmentProperties.mongoDb.url, environmentProperties.mongoDb.options)
    logger.info('Mongoose connected')
}

const closeConnection = async (msg, callback) => {
    await mongoose.connection.close(async () => {
        await logger.info(`Mongoose disconnected through: ${msg}`)
        callback()
    })
}

module.exports.connect = async (environmentProperties) => {
    try {
        /**
         * Compiling the mongoose schemas into models
         */
        require('./models')

        /**
         * Trying to connect to Mongo
         */
        await openConnection(environmentProperties).catch(async error => logger.error(error))

    } catch (error) {
        logger.error(error)
    }

    /**
    * Adding connection event handlers
    */
    mongoose.connection.on('reconnected', async () => {
        logger.info('Mongoose reconnected')
    })

    mongoose.connection.on('error', async err => {
        logger.error(`Mongoose connection error ${err}`)
    })

    mongoose.connection.on('disconnected', async () => {
        logger.warn('Mongoose disconnected')
    })

    /**
    * Adding some application finishing event handlers
    */
    process.once('SIGUSR2', async () => {
        closeConnection('Nodemon restart', () => process.kill(process.pid, 'SIGUSR2'))
    })

    process.on('SIGINT', async () => {
        closeConnection('App termination', () => process.exit(0))
    })

    process.on('SIGTERM', async () => {
        closeConnection('Heroku app shutdown', () => process.exit(0))
    })

    /**
    * Returning the Mongoose connection
    */
    return mongoose.connection;
}