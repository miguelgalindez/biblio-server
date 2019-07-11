const Authenticator = require('../authenticator')

class UnicaucaAuthenticator extends Authenticator {

    async login(username, password) {        
        return true;
    };
}
module.exports = UnicaucaAuthenticator