const { port, uri } = require('./config.js'); 
const app = require('express')();
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const typeDefs = gql(fs.readFileSync('./schema.gql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers.js');
const dataSources = require('./dataLogic.js');

const server = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers,
});
server.applyMiddleware({
    app,
    path: '/api/v11'

});


app.listen({ port }, () => console.log(`🚀  Server ready at ${uri + server.graphqlPath.slice(1)}`));