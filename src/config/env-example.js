module.exports={
    passportFacebookStrategyProperties = {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:9308/auth/facebook/callback"
    },
    passportGoogleStrategyProperties = {
        clientID: GOOGLE_CONSUMER_KEY,
        clientSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:9308/auth/google/callback"
    },
    passportGithubStrategyProperties = {
        clientID: GOOGLE_CONSUMER_KEY,
        clientSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:9308/auth/google/callback"
    },
    expressSessionSecret: YOUR_SECRET,
    
    mongoDb: {
        url: "mongodb://posapp:password@localhost:27017/posapp",
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
            myProviderA: {
                protocol: AUTH_PROTOCOL,
                url: AUTH_SERVER_URL,
                
                // DN for the privileged LDAP user who can search for another LDAP entries 
                adminDN: ADMIN_DISTINGUISHED_NAME,
                
                // Password for the privileged LDAP user
                adminPassword: ADMIN_PASSWORD,
                
                // Distinguished name used as the base for searching
                baseDN: BASE_DN,
                
                // Indicates the set of entries at or below the BaseDN that may be considered potential matches for a search request
                // 'sub' is the most frequent value
                searchScope: SEARCH_SCOPE,
                
                /**
                 * Function that builds the search filter based on the provider's
                 * LDAP directory structure. For example: username => `(uid=${username})`                 
                 * @returns {String}
                 */
                searchFilterBuilder: FUNCTION_FOR_SEARCH_FILTER_BUILDING
            }
        }
    }
}