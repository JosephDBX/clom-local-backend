import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { context } from "./middlewares";

const startServer = async () => {
    // start express app
    const app = express();

    // start apollo server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context
    });

    // applying middlewares to express app
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        if (req.method === "OPTIONS") return res.sendStatus(200);
        next();
    });

    server.applyMiddleware({ app });

    // mongodb
    const DB_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true`

    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error) => {
        console.error(error);
    });

    return app.listen(process.env.APP_PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.APP_PORT}${server.graphqlPath}`)
    });
}

startServer();