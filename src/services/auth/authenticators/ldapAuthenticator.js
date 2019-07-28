const Authenticator = require('./authenticator')
const { Client } = require('ldapts')

/**
 * Authenticator implementation to perform authentication against LDAP servers
 *
 * @class LdapAuthenticator
 * @extends {Authenticator}
 */

class LdapAuthenticator extends Authenticator {

    /**
     * Async constructor
     * Creates an instance of LdapAuthenticator.
     * @param {Object} config Defines the configuration attributes needed to set up this kind of authenticator. 
     *                        It must contain the following properties:
     *                              url {String} LDAP server url
     *                              adminDN {String} DN for the privileged LDAP user who can search for another LDAP entries
     *                              adminPassword {String} Password for the privileged LDAP user
     *                              baseDN {String} Distinguished name used as the base for searching
     *                              searchScope {String} Indicates the set of entries at or below the baseDN that may be considered potential matches for a search request. 'sub' is the most frequent value 
     *                              searchFilterBuilder {Function} Function that builds and returns the search filter {String} based on the company's LDAP directory structure. For example: username => `(uid=${username})`
     * 
     * @memberof LdapAuthenticator
     */

    constructor(config) {
        return (async () => {
            super(config)
            this.client = await new Client({ url: this.config.url })
            return this
        })()
    }

    /**
     * Given an username and a password indicates whether the authentication
     * is successful or not. To achieve that, this method first do binding
     * with a privileged user who can search for another entries in the LDAP.
     * Once bound, it uses the client to seek the DN for the given username.
     * If it is found then the method tries to do binding again, but this time
     * with the DN of the user and the password provided as parameter
     *
     * @param {String} username
     * @param {String} password
     * @returns {Boolean} true for a successful authentication and false for invalid
     *                    credentials
     * @memberof LdapAuthenticator
     */

    async login(username, password) {
        let userDN, isAuthenticated = false

        await this.bind(this.config.adminDN, this.config.adminPassword, async () => {
            const { searchEntries } = await this.client.search(this.config.baseDN, {
                scope: this.config.searchScope,
                filter: this.config.searchFilterBuilder(username)
            })

            if (searchEntries && searchEntries.length) {
                userDN = searchEntries[0].dn
            }
        })

        if (userDN) {
            try {
                await this.bind(userDN, password, null)
                // The authentication will be successful only when the userDN is found
                // and when a successful binding is performed with that DN and the 
                // password provided as parameter
                isAuthenticated = true
            } catch (error) { }
        }

        return isAuthenticated
    }

    /**
     * Performs a binding against a LDAP server. Once the binding is made, and before
     * unbinding the client, this method invoke the callback provided as parameter.
     *
     * @param {String} username
     * @param {String} password
     * @param {Function} callback
     * @throws {Error} Throws an error when a problem occurs during the binding attempt (it doesn't catch exceptions)
     * @memberof LdapAuthenticator
     */

    async bind(username, password, callback) {
        try {
            await this.client.bind(username, password)
            if (callback) {
                await callback();
            }
        } finally {
            await this.client.unbind()
        }
    }
}

module.exports = LdapAuthenticator