const validUsers = [
    'miguelgalindez',
    'wriascos',
    'nmeneses',
    'oidorgonzalez',
    'mpalacios',
    'ccxiomara'
]


exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            error: "Debes ingresar tu usuario y tu contraseña"
        });
    } else {
        // TODO: implement auth
        await setTimeout(() => {
            res.status(200).json({
                username: "miguelgalindez",
                email: "miguelgalindez@unicauca.edu.co",
                isAuthenticated: validUsers.findIndex(element => element === username) >= 0 ? 1 : 0,
                isAuthorized: 0
            })
        }, 200, 'funky');
    }
}