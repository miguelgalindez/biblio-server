const AuthService = require('../../../services/auth')

exports.signIn = async (req, res, next) => {
    const { username, password, provider } = req.body;

    if (username && password && provider) {
        try {
            const { loggedIn, token } = await AuthService.login(username, password, provider)
            await res.status(200).json({ loggedIn, token })

        } catch (error) {            
            next(error)
            
        }
    } else {
        await res.status(400).json({ error: "Username, password and auth provider are required" });
    }
}