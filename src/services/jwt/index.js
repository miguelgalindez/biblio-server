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
    return await new Promise((resolve, reject) => {
        jwt.sign(payload, jwtConfig.secret, jwtConfig.signingOptions, (err, token) => {
            if (err)
                reject(err)
            else
                resolve(token)
        })
    })
}

module.exports.verifyToken = async token => {
    return await new Promise((resolve, reject) => {
        jwt.verify(token, jwtConfig.secret, {}, (err, decoded) => {
            if (err)
                reject(err)
            else
                resolve(decoded)
        })
    })
}