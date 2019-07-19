const LdapAuthenticator = require('./authenticators/ldapAuthenticator')
const DummyAuthenticator = require('./authenticators/dummyAuthenticator')
const authProvidersConfig = require('../../config/env').auth.providers
const CustomError = require('../util/customError')

/**
 * Authenticators factory
 * @class AuthenticatorFactory
 */

class AuthenticatorFactory {

    /**
     * Async constructor who Creates a Singleton 
     * instance of AuthenticatorFactory.
     * @memberof AuthenticatorFactory
     */

    constructor() {
        // Implementing singleton pattern
        if (!AuthenticatorFactory.exists) {
            AuthenticatorFactory.instance = this;
            AuthenticatorFactory.exists = true;

            // Getting the NODE_ENV and converting it to lower case to
            // avoid case pitfalls when comparing
            this.node_env = process.env.NODE_ENV
            this.node_env = this.node_env ? this.node_env.toLowerCase() : null
            // Initializing authenticators pool
            this.authenticatorsPool = {}
        }

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
        if (providerConfig) {
            switch (providerConfig.protocol) {
                case "ldap":
                    return await new LdapAuthenticator(providerConfig);

                case "dummy":
                    if (this.node_env !== 'production') {
                        return await new DummyAuthenticator();
                    } else {
                        throw await new CustomError(this.constructor.name, "Dummy auth protocol is not allowed on the production environment", 501);
                    }

                default:
                    throw await new CustomError(this.constructor.name, `Not supported protocol: ${providerConfig.protocol} for the auth provider: ${providerId}`, 501);
            }
        } else {
            throw await new CustomError(this.constructor.name, `Configuration not found for the auth provider: ${providerId}`, 501)
        }
    }
}

module.exports = AuthenticatorFactory