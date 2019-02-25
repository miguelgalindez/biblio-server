const express = require('express');
const app = express();
const httpServer = require('http').Server(app)
const session = require('express-session')
const cors = require('cors')
const environmentProperties = require('./config/env')
const graphql = require('express-graphql')
const initMongo = require('./lib/mongo')
/**
 * Trying to initialize mongo connection
 */
initMongo(environmentProperties)

app.use(cors())

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: environmentProperties.expressSessionSecret,
  resave: true,
  saveUninitialized: true,
}))

/**
 * Setting up graphql
*/
const graphqlSchema=require('./lib/graphql/schema')
app.use('/graphql/index', graphql({
  graphiql: true,
  schema: graphqlSchema,
  formatError: error => ({
    name: error.name,
    type: error.originalError && error.originalError.type,
    message: error.message,
    paths: error.originalError && error.originalError.paths
  })
}))


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
