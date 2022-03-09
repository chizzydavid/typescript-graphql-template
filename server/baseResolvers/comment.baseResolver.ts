
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Service } from "typedi";
import { Comment, CommentInput } from "../schema/comment.schema";
import CommentResolver from "../resolvers/comment.resolver";
import Context from "../types/context";
import Logger from "../utils/logger/logger";


@Service()
@Resolver(() => Comment)
export default class CommentBaseResolver {
  constructor(
    private readonly commentResolver: CommentResolver,
    private readonly logger: Logger,
  ) {}

  @Query(() => [Comment])
  async getComments(
    @Ctx() context: Context
  ): Promise<Comment[]> {
    try {
      this.logger.createLog('STARTED', 'COMMENT', 'getComments', context, undefined, 'New');
      const res = await this.commentResolver.getComments();
      this.logger.createLog('SUCCESS', 'COMMENT', 'getComments', context, undefined, 'New');
      return res;
    } catch (error: any) {
      this.logger.createLog('FAILED', 'COMMENT', 'getComments', context, { error: error.message }, 'New', 'error');
      throw error;
    }
  }

  @Mutation(() => Comment)
  async addComment(
    @Arg('commentInput') commentInput: CommentInput,
    @Ctx() context: Context
  ): Promise<Comment> {
    try {
      this.logger.createLog('STARTED', 'COMMENT', 'addComment', context, commentInput, 'New');
      const res = await this.commentResolver.addComment(commentInput, context);
      this.logger.createLog('SUCCESS', 'COMMENT', 'addComment', context, commentInput, 'New');
      return res;
    } catch (error: any) {
      this.logger.createLog('FAILED', 'COMMENT', 'addComment', context, { error: error.message }, 'New', 'error');
      throw error;
    }
  }
}

