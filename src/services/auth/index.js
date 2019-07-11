const AuthenticatorFactory = require('./authenticatorFactory')
const debug = require('debug')(`services:${__filename}`);

class AuthService {
    constructor() {
        this.authenticatorFactory = new AuthenticatorFactory()
    }

    async login(username, password, provider) {
        if (this.authenticatorFactory) {
            const authenticator = await this.authenticatorFactory.createAuthenticator(provider)
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