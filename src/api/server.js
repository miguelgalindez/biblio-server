const nodeEnv = process.env.NODE_ENV
const environmentProperties = require('../config/env')

const express = require('express');
const app = express();
const httpServer = require('http').Server(app)
const cors = require('cors')
const logger = require('../services/util/logger')
const morgan = require('morgan');
const morganFormat = nodeEnv === 'development' ? environmentProperties.morgan.formatForDevelopment : environmentProperties.morgan.formatForProduction
const mongo = require('../services/mongo')

app.use(morgan(morganFormat, { stream: logger.stream }));


/**
 * Trying to initialize mongo connection
 */
mongo.connect(environmentProperties)

//app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting routes
require('./routes')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    error: "Resource not found"
  })
});

// error handler
app.use(async (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = nodeEnv === 'development' ? err : {};


  if (err.status)
    res.status(err.status).json({ error: err.message })
  else {
    logger.error(err.stack)
    res.status(500).json({ error: "Internal Server Error" })
  }

});

module.exports = httpServer;
