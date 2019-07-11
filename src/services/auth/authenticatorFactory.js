const LdapAuthenticator=require('./authenticators/ldapAuthenticator')
const authProvidersConfig = require('../../config/env').auth.providers

class AuthenticatorFactory {
    constructor() {
        if (!AuthenticatorFactory.exists) {
            AuthenticatorFactory.instance = this;
            AuthenticatorFactory.exists = true;            
        }
        return AuthenticatorFactory.instance
    }

    async createAuthenticator(providerID) {
        const providerConfig=authProvidersConfig[providerID]
        switch(providerConfig.protocol){
            case "ldap":
                return await new LdapAuthenticator(providerConfig);
            
            default:
                return null;        
        }
    }
}

module.exports = AuthenticatorFactory