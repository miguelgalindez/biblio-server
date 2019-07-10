const AuthenticatorFactory = require('./authenticatorFactory')
const Authenticator = require('./authenticator')

class Auth {
    construct() {
        this.authenticatorFactory = new AuthenticatorFactory()
    }

    login = async (username, password, provider) => {
        const authenticator = await authenticatorFactory.createAuthenticator(provider)
        return await authenticator.login(username, password)
    }
}

module.exports = Auth