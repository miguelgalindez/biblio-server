const jwt = require('jsonwebtoken')
const { jwt: jwtConfig } = require('../../config/env')

/**
 * Creates a JWT token by signing the payload with
 * the secret and signing options defined in the
 * config file env.js
 *
 * @param {Object} payload
 * @returns {String} JWT token
 */
module.exports.createToken = async payload => {
    const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, jwtConfig.secret, jwtConfig.signingOptions, (err, token) => {
            if (err)
                reject(err)
            else
                resolve(token)
        })
    })

    return token
}
