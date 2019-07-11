module.exports = {
    passportFacebookStrategyProperties: {
        clientID: "asd",
        clientSecret: "asd",
        callbackURL: "http://localhost:9308/auth/facebook/callback"
    },
    passportGoogleStrategyProperties: {
        clientID: "706330254364-vuhc93pvqojplg2np6smvbh72aghj32j.apps.googleusercontent.com",
        clientSecret: "gXcykdbSgYDaz509DXZMJMor",
        callbackURL: "http://localhost:9308/auth/google/callback"
    },
    passportGithubStrategyProperties: {
        clientID: "ffd9120eb7065d0a2783",
        clientSecret: "d84c94e42c8bd37bbe811664cb349fd163490a91",
        callbackURL: "http://localhost:9308/auth/github/callback"
    },
    expressSessionSecret: "http://localhost:9308/",

    mongoDb: {
        url: "mongodb://biblio:biblio123@localhost:27017/biblio",
        options: {
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 3000,
            keepAlive: true,
            autoIndex: false,
            useFindAndModify: false
        }
    },

    auth: {
        providers: {
            unicauca: {
                protocol: "ldap",
                url: 'ldaps://hera.unicauca.edu.co:636',
                adminDN: 'cn=ReaderAD,dc=unicauca,dc=edu,dc=co',
                adminPassword: 'LD1P_R3AD3r_D3V',
                searchDN: 'dc=unicauca,dc=edu,dc=co',
                searchScope: 'sub',                
                searchFilter: `(uid={username})`,
            }
        }
    }
}