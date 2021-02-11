const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// start express app
const app = express();

// start apollo server
const { typeDefs } = require('./graphql/schema/index');
const { resolvers } = require('./graphql/resolvers/index');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// middleware imports

// applying middlewares to express app
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

server.applyMiddleware({ app });

const DB_URI = process.env.DEBUG
    ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true`
    : `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true`;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongodb connected!");
    return app.listen(process.env.APP_PORT);
}).then(() => {
    console.log(`🚀 Server ready at http://localhost:${process.env.APP_PORT}${server.graphqlPath}`)
}).catch((error) => {
    console.error(error);
});