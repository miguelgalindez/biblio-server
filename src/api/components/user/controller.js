const AuthService = require('../../../services/auth')
const authService = new AuthService()
const debug = require('debug')(`api:${__filename}`);

exports.signIn = async (req, res) => {
    const { username, password, provider } = req.body;
    if (username && password && provider) {
        try {
            const loggedIn = await authService.login(username, password, provider)
            res.status(200).json({ loggedIn })
        } catch (error) {
            res.status(500).json({ error: "Your request couldn't be processed" })            
            debug(error)
        }
    } else {
        res.status(400).json({ error: "Username, password and auth provider are required" });
    }
}