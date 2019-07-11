const UnicaucaAuthenticator = require('./providers/unicaucaAuthenticator')
const SalleAuthenticator = require('./providers/salleAuthenticator')

class AuthenticatorFactory {
    constructor() {
        if (!AuthenticatorFactory.exists) {
            AuthenticatorFactory.instance = this;
            AuthenticatorFactory.exists = true;            
        }
        return AuthenticatorFactory.instance
    }

    async createAuthenticator(providerID) {
        switch (providerID) {
            case "unicauca":
                return await new UnicaucaAuthenticator();
            
            case "salle":
                return await new SalleAuthenticator();

            default:
                return null;
        }
    }
}

module.exports = AuthenticatorFactory