#!/usr/bin/env node

const httpServer = require('./api/server');
const logger = require('./services/util/logger')
const mongoose = require('mongoose')
const os = require('os');

/**
 * Get port from environment and store in Express.
*/

const port = normalizePort(process.env.PORT || '9308');

mongoose.connection.once('open', () => {
  httpServer.listen(port);
})

httpServer.on('error', onError);
httpServer.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? addr
    : addr.port;
  const addresses = getAddresses().join(bind + "\n\t\t\t\t\t")

  logger.info(`Listening on: ${addresses}`);
}

function getAddresses() {
  const ifaces = os.networkInterfaces();
  return Object.keys(ifaces).reduce((accumulator, interfaceName) => {
    let foundAddresses = []
    ifaces[interfaceName].forEach(interface => {
      if (interface.family == 'IPv4' && interface.internal == false && accumulator.indexOf(interface.address) == -1) {
        foundAddresses.push(interface.address)
      }
    });
    return accumulator.concat(foundAddresses);
  }, ["localhost"]);
}