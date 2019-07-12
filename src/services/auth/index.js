const AuthenticatorFactory = require('./authenticatorFactory')

/**
 * Provides authentication services for every provider
 * supported by the authenticators factory
 *
 * @class AuthService
 */

class AuthService {

    /**
     * Creates an instance of AuthService. It includes
     * the instantiation of the authenticators factory
     * @memberof AuthService
     */

    constructor() {
        this.authenticatorFactory = new AuthenticatorFactory()
    }

    /**
     * Given an username and a password, it tries to authenticate the
     * given credentials (username and password) against the auth
     * provider whose id corresponds to providerId.
     *
     * @param {String} username
     * @param {String} password
     * @param {String} providerId.
     * @returns {Boolean} true for a successful authentication and false for invalid
     *                    credentials
     * @memberof AuthService
     */

    async login(username, password, providerId) {
        const authenticator = await this.authenticatorFactory.getAuthenticator(providerId)
        if (authenticator) {
            return await authenticator.login(username, password)
        } else {
            throw new Error(`Couldn't get an authenticator instance for the provider: ${providerId}`)
        }
    }
}

module.exports = AuthService