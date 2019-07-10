const usersRouter = require('./components/user/routes')

module.exports = (app) => {
    app.use('/users', usersRouter);
}