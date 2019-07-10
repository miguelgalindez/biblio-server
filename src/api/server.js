const express = require('express');
const app = express();
const httpServer = require('http').Server(app)
const morgan=require('morgan');
const cors = require('cors')
const environmentProperties = require('../config/env')
const mongo = require('../services/mongo')

/**
 * Trying to initialize mongo connection
 */
mongo.connect(environmentProperties)

//app.use(cors())

app.use(morgan('dev'));
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
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = httpServer;
