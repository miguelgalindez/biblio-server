const jwt = require('jsonwebtoken')
const { jwt: jwtConfig } = require('../../config/env')

/**
 * Creates a JWT token for the audience received as parameter
 * by signing the payload and using the secret and the signing 
 * options defined in the config file env.js
 *
 * @param {Object} payload
 * @param {String} audience
 * @returns {String} JWT token
 */
module.exports.createToken = async (payload, audience) => {
    return await new Promise((resolve, reject) => {
        const options = {
            ...jwtConfig.issuanceOptions,
            audience
        }

        jwt.sign(payload, jwtConfig.secret, options, (err, token) => {
            if (err)
                reject(err)
            else
                resolve(token)
        })
    })
}

/**
 * Verifies a JWT token using the secret defined in the config
 * file env.js and checking that the audience, the token was 
 * issued for, be the same as the provided as parameter. If
 * the token is successfully verified, then the decoded data 
 * is returned, otherwise, an error is thrown.
 *
 * @param {Object} token
 * @param {String} audience
 * @returns decoded token if it is valid.
 */
module.exports.verifyToken = async (token, audience) => {

    return await new Promise((resolve, reject) => {
        const options = {
            ...jwtConfig.verificationOptions,
            audience
        }

        jwt.verify(token, jwtConfig.secret, options, (err, decoded) => {
            if (err)
                reject(err)
            else
                resolve(decoded)
        })
    })
}