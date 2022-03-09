import { Service } from "typedi";
import Context from "../../types/context";

@Service()
export default class Logger {
  createLog(
    state: string,
    entity: string,
    operation: string,
    context: Context,
    args: any,
    identifier = 'New',
    level = 'info'    
  ): void {
    
    // console.log(state, entity, operation, context, args, identifier, level);
    // IMPLEMENT ACTUAL LOG FUNCTION
  }
}

