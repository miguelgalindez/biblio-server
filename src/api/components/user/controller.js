const AuthService = require('../../../services/auth')
const authService = new AuthService()
const jwt = require('../../middleware/jwt')
const debug = require('debug')(`api:${__filename}`);

exports.signIn = async (req, res) => {
    const { username, password, provider } = req.body;

    if (username && password && provider) {
        try {
            const loggedIn = await authService.login(username, password, provider)            
            let token

            if(loggedIn){
                 token = await jwt.createToken({ username, provider })
            }

            await res.status(200).json({ loggedIn, token })

        } catch (error) {
            await res.status(500).json({ error: "Your request couldn't be processed" })
            await debug(error)
        }
    } else {
        await res.status(400).json({ error: "Username, password and auth provider are required" });
    }
}