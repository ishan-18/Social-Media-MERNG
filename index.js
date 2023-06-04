require('dotenv').config()

const {ApolloServer} = require('apollo-server')

const {typeDefs} = require('./schema/type-defs')
const resolvers = require('./schema/resolvers/')

const connectDB = require('./db/connectedDB')

const server = new ApolloServer({
    typeDefs,
    resolvers
});

connectDB()

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`Server Listening @${url}`)
})
