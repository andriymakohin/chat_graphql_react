const { PubSub, GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

dotenv.config();

// const { DB_URL } = process.env;
const DB_URL  = "mongodb+srv://chat:chat12345678@cluster0.pmwv8.mongodb.net/chat?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
});

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
mongoose.connection.once("open", () =>
  server.start(() => console.log("We make magic over at localhost:4000"))
);
