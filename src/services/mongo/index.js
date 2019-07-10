const mongoose = require('mongoose')
const debug = require('debug')(`server:${__filename}`);

const openConnection = async environmentProperties => {
    await mongoose.connect(environmentProperties.mongoDb.url, environmentProperties.mongoDb.options)
    debug('Mongoose connected')
}

const closeConnection = async (msg, callback) => {
    await mongoose.connection.close(function () {
        debug('Mongoose disconnected through: ', msg)
        callback()
    })
}

module.exports.connect = async (environmentProperties) => {    
    try{
        /**
         * Compiling the mongoose schemas into models
         */
        require('./models')
        /**
         * Trying to connect to Mongo
         */
        await openConnection(environmentProperties).catch(error => debug(error))        

    } catch(error){
        debug(error)
    }

    /**
    * Adding connection event handlers
    */
    mongoose.connection.on('reconnected', function () {
        debug('Mongoose reconnected')
    })

    mongoose.connection.on('error', function (err) {
        debug('Mongoose connection error ', err)
    })

    mongoose.connection.on('disconnected', function () {
        debug('Mongoose disconnected')
    })

    /**
    * Adding some application finishing event handlers
    */    
    process.once('SIGUSR2', async () => {
        await closeConnection('Nodemon restart', () => process.kill(process.pid, 'SIGUSR2'))
    })

    process.on('SIGINT', async () => {
        await closeConnection('App termination', () =>  process.exit(0))
    })

    process.on('SIGTERM', async () => {
        await closeConnection('Heroku app shutdown', () => process.exit(0))
    })

    /**
    * Returning the Mongoose connection
    */
    return mongoose.connection;
}