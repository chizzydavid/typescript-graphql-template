import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { Container } from "typedi";
import Context from "./types/context";
import resolvers from "./baseResolvers";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import connectToDatabase from "./utils/database/mongo";


const buildUserContext = (ctx: Context) => {
  // ADD HEADER PARAMS TO CONTEXT
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
    ],    
  })

  await server.start();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    console.log("App is listening on http://localhost:4000");
  });

  connectToDatabase();
}

bootstrap();

