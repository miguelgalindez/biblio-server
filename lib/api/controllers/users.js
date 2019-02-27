exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            error: "You must provide a valid username and password"
        });
    } else {
        // TODO: implement auth
        await setTimeout(() => {
            res.status(200).json({
                username: "miguelgalindez",
                email: "miguelgalindez@unicauca.edu.co",
                isAuthenticated: username=='miguelgalindez' ? 1 : 0,
                isAuthorized: 0
            })
        }, 3000, 'funky');
    }
}