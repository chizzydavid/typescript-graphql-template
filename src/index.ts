import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { Container } from "typedi";
import Context from "./types/context";
import resolvers from "./resolvers";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import connectToDatabase from "./utils/database/mongo";
import LogPlugin from "./utils/logger/logPlugin";


const buildUserContext = (ctx: Context) => {
  const context = ctx;
  return context;
}

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
    container: Container
  })

  const app = express();
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => buildUserContext(ctx),
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      Container.get<LogPlugin>(LogPlugin).log()
    ],    
  })

  await server.start();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    // eslint-disable-next-line no-console
    console.log("App is listening on http://localhost:4000");
  }); 
 
  connectToDatabase();
}



bootstrap();

