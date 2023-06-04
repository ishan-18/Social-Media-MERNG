const {gql} = require('apollo-server')
const Post = require('../models/Post')

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Query {
        getPosts: [Post]
    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        email: String!
        confirmPassword: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User 
        login(username: String!, password: String!): User
    }
`

module.exports = { typeDefs }