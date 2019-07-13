const Authenticator = require('./authenticator')

/**
 * Dummy authenticator which always returns true
 * for all the authentications attempts
 *
 * @class DummyAuthenticator
 * @extends {Authenticator}
 */

class DummyAuthenticator extends Authenticator {
    
    /**
     *Creates an instance of DummyAuthenticator.
     * @memberof DummyAuthenticator
     */

    constructor() {
        super(null)
    }

    /**
     * Dummy login that always returns true
     *
     * @param {String} username
     * @param {String} password
     * @returns {Boolean} always true indicating a successful authentication
     * @memberof DummyAuthenticator
     */

    async login(username, password) {        
        return true;
    }
}

module.exports = DummyAuthenticator