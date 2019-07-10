const UnicaucaAuthenticator = require('./providers/unicaucaAuthenticator')

class AuthenticatorFactory {
    constructor() {
        if(!AuthenticatorFactory.exists){
            AuthenticatorFactory.instance=this;
            AuthenticatorFactory.exists=true;            
        }        
        return AuthenticatorFactory.instance
    }

    createAuthenticator = (providerID) => {
        switch (providerID) {
            case "unicauca":
                return new UnicaucaAuthenticator();

            default:
                return null;
        }
    }
}

module.exports = AuthenticatorFactory