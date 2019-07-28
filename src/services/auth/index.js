/**
 * Provides authentication services for every company supported by the authenticators factory
 */
const AuthenticatorFactory = require('./authenticatorFactory')
const jwt = require('../jwt')
const CustomError = require('../util/customError')



/**
    * Given an username and a password, it tries to authenticate the
    * given credentials (username and password) against the corresponding 
    * company authenticator.
    *
    * @param {String} username
    * @param {String} password
    * @param {String} company.
    * @returns {Object} Holds the following attributes:
    *                   {Boolean}   loggedIn
    *                   {String}    token
    */
module.exports.login = async (username, password, company) => {
    try {
        const authenticator = await AuthenticatorFactory.getAuthenticator(company)
        const loggedIn = await authenticator.login(username, password)
        let token
        if (loggedIn)
            token = await jwt.createToken({ username }, company)
        return { loggedIn, token }
    } catch (error) {        
        if (error.thrower === AuthenticatorFactory.constructor.name)
            throw await new CustomError('AuthService', `Not supported authentication for the company ${company}`, 501, null)
        else
            throw error
    }
}