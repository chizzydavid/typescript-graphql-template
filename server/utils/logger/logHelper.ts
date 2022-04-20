import Context from "../../types/context";
import { createLogger, transports, format, Logger, LoggerOptions } from "winston";
import { Service } from "typedi";
import { getOperationEntity, isAllowedOperation } from "./logOperations";
import { isEmpty } from "../general";
import { GraphQLRequestContext } from 'apollo-server-plugin-base';

@Service()
export default class LogHelper {
  logger: Logger;

  constructor() {
    const logConfiguration: LoggerOptions = {
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
      transports: [new transports.Console()],
    };
    this.logger = createLogger(logConfiguration);
  }
  
  
  createLog(
    state: string,
    entity: string | undefined,
    operation: string,
    context: Context | undefined,
    args: any,
    identifier = 'New',
    level = 'info',
  ): void {

      const logData = {
        // requestId: context.requestId,
        state: state,
        operation: operation,
        identifier: identifier,
        entity: entity,
        // user:
        //   context.user && context.user.userId
        //     ? context.user.fullName
        //       ? context.user.fullName
        //       : context.user.userId
        //     : 'Unknown',
        args,
      };

    if (process.env.NODE_ENV !== 'dev') {
      this.logger.log({
        level,
        message: JSON.stringify(logData)
      })
    }
  }

  logRequest(state: string, operation: string, context: GraphQLRequestContext): void {
    return;

    if (!isAllowedOperation(operation)) return;
    let args;

    if (state === 'error') {
      args = { error: context.errors![0].stack };
    } else {
      const { variables, query } = context.request;  
      args = !isEmpty(variables) ? variables : query;
    }

    this.createLog(
      state,
      getOperationEntity(operation),
      operation,
      undefined, //context,
      args,
      'New',
      state === 'started' || state === 'success' ? 'info' : 'error',
    )
  }
}

