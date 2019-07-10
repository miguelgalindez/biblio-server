const Authenticator = require('../authenticator')

class UnicaucaAuthenticator extends Authenticator {
    login(username, password) {
        return true;
    }
}
module.exports = UnicaucaAuthenticator