const express = require('express');
const app = express();
const httpServer = require('http').Server(app)
const cors = require('cors')
const environmentProperties = require('./config/env')
const initMongo = require('./lib/mongo')
const usersRouter=require('./lib/api/routes/users')
/**
 * Trying to initialize mongo connection
 */
initMongo(environmentProperties)

//app.use(cors())

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);

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
