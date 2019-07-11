// Routers for every component
const usersRouter = require('./components/user/routes')


/**
 * Set the routes for the app
 * @param {*} app
 */
module.exports = app => {
    
    app.use('/users', usersRouter);
}