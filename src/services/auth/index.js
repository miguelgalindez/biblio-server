const AuthenticatorFactory = require('./authenticatorFactory')
const debug = require('debug')(`services:${__filename}`);

class AuthService {
    construct() {
        // ? why this doesn't work?
        // FIXME: make this constructor initialize the factory
        //this.authenticatorFactory = new AuthenticatorFactory()
    }

    async login(username, password, provider) {
        debug(`Login attempt for the ${provider} user ${username} with password ${password}`)
        // FIXME: try to use class variable instead of the local one
        const authenticatorFactory = await new AuthenticatorFactory()
        if (authenticatorFactory) {
            const authenticator = await authenticatorFactory.createAuthenticator(provider)
            if (authenticator) {
                return await authenticator.login(username, password)
            } else {
                throw new Error(`Couldn't get an authenticator instance for the provider: ${provider}`)
            }
        } else {
            throw new Error("AuthenticatorFactory couldn't be instantiated")
        }
    }
}

module.exports = AuthService