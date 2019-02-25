const graphql = require('graphql')
const { createGraphQLErrorFromMongooseError } = require('../../error-crafter')

module.exports.userTypeDef = `
    type User {        
        username: String!
        password: String
        authenticated: Boolean        
    }

    extend type Query {
        signIn(username: String, password: String): User
    }
`

module.exports.userResolvers = {
    Query: {
        signIn: async (parent, args) => {
            try {
                return { ...args, authenticated: true }
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        }
    }
    /*
    Mutation: {
        userSignUp: async (parent, args) => {
            try {
                return await User.signUp(args)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        }
    }
    */
}