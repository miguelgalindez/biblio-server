/**
 * Provides authentication services for every provider supported by the authenticators factory
 */
const AuthenticatorFactory = require('./authenticatorFactory')
const authenticatorFactory = new AuthenticatorFactory()
const jwt = require('../jwt')



/**
    * Given an username and a password, it tries to authenticate the
    * given credentials (username and password) against the auth
    * provider whose id corresponds to providerId.
    *
    * @param {String} username
    * @param {String} password
    * @param {String} providerId.
    * @returns {Object} Holds the following attributes:
    *                   {Boolean}   loggedIn
    *                   {String}    token
    */
module.exports.login = async (username, password, providerId) => {
    try {
        const authenticator = await authenticatorFactory.authenticator(providerId)
        const loggedIn = await authenticator.login(username, password)
        let token
        if (loggedIn)
            token = await jwt.createToken({ username, providerId })
        return { loggedIn, token }
    } catch (error) {
        throw new Error(`Couldn't get an authenticator instance for the provider: ${providerId}`)
    }


}