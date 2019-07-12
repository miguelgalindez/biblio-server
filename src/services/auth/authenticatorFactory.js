const LdapAuthenticator = require('./authenticators/ldapAuthenticator')
const authProvidersConfig = require('../../config/env').auth.providers
/**
 * Authenticators factory
 * @class AuthenticatorFactory
 */

class AuthenticatorFactory {

    /**
     * Creates a Singleton instance of AuthenticatorFactory.
     * @memberof AuthenticatorFactory
     */

    constructor() {
        if (!AuthenticatorFactory.exists) {
            AuthenticatorFactory.instance = this;
            AuthenticatorFactory.exists = true;
        }

        this.authenticatorsPool = {}
        return AuthenticatorFactory.instance
    }
    
    /**
     * Provides an authenticator that suits the provider given
     * as parameter. To do that, it checks if it already has an available
     * authenticator in the pool for that provider, if so, it returns it, 
     * otherwise it will create a new one, store it in the pool and return it.
     *
     * @param {String} providerId
     * @returns {Authenticator}
     * @memberof AuthenticatorFactory
     */
    
    async getAuthenticator(providerId) {        
        if (!this.authenticatorsPool[providerId]) {
            this.authenticatorsPool[providerId] = await this.createAuthenticator(providerId)
        }
        return this.authenticatorsPool[providerId]
    }

    /**
     * Creates an authenticator based on the given auth provider's configuration. 
     * To do that, this method creates a new instance of the base 
     * class {Authenticator} implementation that suits the protocol defined in the 
     * configuration received as parameter.
     *
     * @param {String} providerId Auth provider's identifier.
     * @returns {Authenticator} 
     * @memberof AuthenticatorFactory
     */

    async createAuthenticator(providerId) {
        const providerConfig = authProvidersConfig[providerId]
        if(providerConfig){
            switch (providerConfig.protocol) {
                case "ldap":
                    return await new LdapAuthenticator(providerConfig);

                default:
                    throw new Error(`Not supported protocol: ${providerConfig.protocol} for provider: ${providerId}`);
            }
        }else{
            throw new Error(`Configuration not found for the auth provider: ${providerId}`)
        }
    }
}

module.exports = AuthenticatorFactory