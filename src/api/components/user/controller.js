const AuthService = require('../../../services/auth')

exports.signIn = async (req, res, next) => {
    const { username, password, company } = req.body;

    if (username && password) {
        try {
            const { loggedIn, token } = await AuthService.login(username, password, company)
            await res.status(200).json({ loggedIn, token })

        } catch (error) {
            next(error)

        }
    } else {
        await res.status(400).json({ error: "Username and password are required" });
    }
}