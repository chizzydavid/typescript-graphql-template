import Context from "../../types/context";
import { createLogger, transports, format, Logger, LoggerOptions } from "winston";
import { Service } from "typedi";
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
    message: string,
    context?: GraphQLRequestContext | undefined,
    args?: any,
    level = 'info',
  ): void {

      const logData = {
        requestId: context?.requestId,
        message: message,
        args,
      };

    if (process.env.NODE_ENV !== 'dev') {
      this.logger.log({
        level,
        message: JSON.stringify(logData)
      })
    }
  }

  logRequest(message: string, context?: GraphQLRequestContext, level = "info", args?: any): void {
    this.createLog(
      message,
      context,
      args,
      level,
    )
  }
}

