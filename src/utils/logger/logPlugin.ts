import Context from "../../types/context";

import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
  // GraphQLServiceContext,
  // GraphQLResponse,
  GraphQLRequestExecutionListener
} from 'apollo-server-plugin-base';
import { Service } from "typedi";
import LogHelper from "./logHelper";
import { OperationDefinitionNode, FieldNode } from 'graphql';


@Service()
export default class LogPlugin {
  constructor(private readonly logger: LogHelper) {}  
  
  log(): ApolloServerPlugin {
    return {
      /**
       * requestDidStart
       * Triggered at the beginning of every request cycle, and returns an object (GraphQLRequestListener)
       * that has the functions for each request lifecycle event.
       */      
      requestDidStart: async (requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener | void>  => {
        const start = Date.now()
        let operation!: string;
        let requestSuccessful = true;

        return {
          /**
           * The didResolveOperation event fires after the graphql library successfully determines the operation to execute from a request's document AST. 
           * At this stage, both the operationName string and operation AST are available.
           * @param context 'metrics' | 'source' | 'document' | 'operationName' | 'operation'
           */
          didResolveOperation: async (requestContext: GraphQLRequestContext): Promise<void> => {            
            const operationDefinition = requestContext.document?.definitions[0] as OperationDefinitionNode;
            const fieldNode = operationDefinition?.selectionSet.selections[0] as FieldNode;
            operation = fieldNode?.name?.value; 
            this.logger.logRequest('started',  requestContext);
          },
 
          /**
           * The didEncounterErrors event fires when Apollo Server encounters errors while parsing, validating, or executing a GraphQL operation.
           * @param context 'metrics' | 'source' | 'errors' 
           */
          didEncounterErrors: async (requestContext: GraphQLRequestContext): Promise<void> => {
            requestSuccessful = false;
            this.logger.logRequest('error', requestContext);
          },
          
          /**
           * The willSendResponse event fires whenever Apollo Server is about to send a response for a GraphQL operation. 
           * This event fires (and Apollo Server sends a response) even if the GraphQL operation encounters one or more errors.
           * @param context 'metrics' | 'response'
           */

          willSendResponse: async (requestContext: GraphQLRequestContext): Promise<void> => { 
            const elapsed = Date.now() - start
            const size = JSON.stringify(requestContext.response).length * 2
            const requestStats = `operation=${operation} duration=${elapsed}ms bytes=${size}`
            if (requestSuccessful) {
              this.logger.logRequest('success',  requestContext)
            }
          },


          // parsingDidStart: async (requestContext: GraphQLRequestContext): Promise<void> => {
          //   console.log(`Parsing started!  ${operation}\n`);
          // },
          // validationDidStart: async (requestContext: GraphQLRequestContext): Promise<void> => {
          //   console.log(`Validation started!  ${operation}\n`);
          // },
          // executionDidStart: async (
          //   requestContext: GraphQLRequestContext
          // ): Promise<GraphQLRequestExecutionListener | void> => {
          //   console.log(`executionDidStart fired!!`);

          //   return {
          //     executionDidEnd: async (err): Promise<void> => {
          //       console.log(`executionDidEnd fired!!`);

          //       if (err) { 
          //         console.error(err);
          //       }
          //     }
          //   };
          // }
        }
      }
    }
  } 
}



