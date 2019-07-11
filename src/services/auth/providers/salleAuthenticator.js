const Authenticator = require('../authenticator')

class SalleAuthenticator extends Authenticator {
    async login(username, password) {        
        return true;
    }
}
module.exports = SalleAuthenticator