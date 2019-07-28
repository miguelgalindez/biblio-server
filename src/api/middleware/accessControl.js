const jwt = require('../../services/jwt')
const logger = require('../../services/util/logger')
const CustomError = require('../../services/util/customError')


const check = permissions => {
    const middleware = async (req, res, next) => {
        try {
            if (!req.user) {
                const token = await extractTokenFromHeader(req)
            }
            next()
        } catch (error) {
            //logger.debug(error.thrower)
            next(error)
        }
    }

    return middleware
}


const extractTokenFromHeader = async ({ headers }) => {
    let error
    if (headers && headers.authorization) {
        const [scheme, credentials] = headers.authorization.trim().split(' ')
        const supportedScheme = /^Bearer$/i.test(scheme)
        if (supportedScheme && credentials) {
            return credentials
        } else {
            error = !supportedScheme ? "Unsupported authorization scheme" : "Credentials are required"
        }
    } else {
        error = "Authorization header is required"
    }
    error = error + ". The format for the authorization header is => Authorization: Bearer <token>"
    throw await new CustomError(__filename, error, 401, null)
}


module.exports = {
    check
}

/*
If the token is valid, req.user will be set with the JSON object
decoded to be used by later middleware for authorization and access control.
*/
