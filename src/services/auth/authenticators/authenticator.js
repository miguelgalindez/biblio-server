
/**
 * Base class for authenticators
 * @class Authenticator
 */
class Authenticator {
    
    /**
     * Creates an instance of Authenticator.
     * @param {Object} config Defines the configuration attributes needed to set up 
     *                        the authenticator. Those attributes may vary for each 
     *                        implementation and they must be defined by derived classes
     * @memberof Authenticator
     */

    constructor(config) {
        this.config = config
    }
    
    /**
     * Abstract method. Given an username and a password,
     * this method indicates if there's a successful 
     * authentication or not. All derived classes must
     * implement this method
     *
     * @param {String} username
     * @param {String} password
     * @returns {Boolean} true for a successful authentication and false 
     *                    for invalid credentials
     * @memberof Authenticator
     */
    
    async login(username, password) { }
}

module.exports = Authenticator