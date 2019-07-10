const Authenticator = require('../authenticator')

class SalleAuthenticator extends Authenticator {
    login(username, password) {
        return true;
    }
}
module.exports = SalleAuthenticator