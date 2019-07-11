const Authenticator = require('./authenticator')
const { Client } = require('ldapts')
const StringUtils = require('../../util/stringUtils')

class LdapAuthenticator extends Authenticator {
    constructor(config) {
        super(config)
        this.client = new Client({ url: this.config.url })
    }

    async login(username, password) {
        let userDN
        await this.bind(this.config.adminDN, this.config.adminPassword, async () => {
            const searchFilter = await StringUtils.injectVariables(this.config.searchFilter, { username })
            const { searchEntries } = await this.client.search(this.config.searchDN, {
                scope: this.config.searchScope,
                filter: searchFilter
            })

            userDN = searchEntries[0].dn
        })

        try {
            await this.bind(userDN, password, null)
            return true
        } catch (error) {
            return false
        }
    }

    async bind(username, password, callback) {
        try {
            await this.client.bind(username, password)
            if (callback) {
                await callback();
            }
        } catch (error) {
            throw error;
        } finally {
            await this.client.unbind()            
            //console.log(`\n**** LDAP client unbound for user ${username}...\n`)
        }
    }
}

module.exports = LdapAuthenticator