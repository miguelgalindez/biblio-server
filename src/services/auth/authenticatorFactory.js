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
            // Getting the environment the app is running on
            this.nodeEnv = process.env.NODE_ENV
            // Initializing authenticators pool
            this.authenticatorsPool = {}

            AuthenticatorFactory.instance = this
            AuthenticatorFactory.exists = true
        }

        return AuthenticatorFactory.instance
    }

    /**
     * Provides an authenticator that suits the company given
     * as parameter. To do that, it checks if it already has an available
     * authenticator in the pool for that company, if so, it returns it, 
     * otherwise it will create a new one, store it in the pool and return it.
     *
     * @param {String} company
     * @returns {Authenticator}
     * @memberof AuthenticatorFactory
     */

    async getAuthenticator(company) {
        if (!this.authenticatorsPool[company]) {
            this.authenticatorsPool[company] = await this.createAuthenticator(company)
        }
        return this.authenticatorsPool[company]
    }

    /**
     * Creates an authenticator based on the given auth company configuration. 
     * To do that, this method creates a new instance of the base 
     * class {Authenticator} implementation that suits the protocol defined in the 
     * configuration received as parameter.
     *
     * @param {String} company Company identifier the authenticator is going to be created for.
     * @returns {Authenticator} 
     * @memberof AuthenticatorFactory
     */

    async createAuthenticator(company) {
        const companyConfig = authProvidersConfig[company]
        if (companyConfig) {
            switch (companyConfig.protocol) {
                case "ldap":
                    return await new LdapAuthenticator(companyConfig);

                case "dummy":
                    if (this.nodeEnv !== 'production') {
                        return await new DummyAuthenticator();
                    } else {
                        throw await new CustomError(this.constructor.name, "Dummy auth protocol is not allowed on the production environment", 501);
                    }

                default:
                    throw await new CustomError(this.constructor.name, `Not supported protocol: ${companyConfig.protocol} for the auth company: ${company}`, 501);
            }
        } else {
            throw await new CustomError(this.constructor.name, `Configuration not found for the auth company: ${company}`, 501)
        }
    }
}

module.exports = new AuthenticatorFactory()