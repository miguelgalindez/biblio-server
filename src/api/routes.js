// Routers for every component
const usersRouter = require('./components/user/routes')


/**
 * Takes the company identifier from the url parameter ':company'
 * and put into the req.body object so that next middleware
 * functions can access its value
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const companySetter = (req, res, next) => {    
    req.body.company = req.params.company
    next()
}


/**
 * Set the routes for the app
 * @param {*} app
 */
module.exports = app => {

    app.use('/:company/users', companySetter, usersRouter);
}