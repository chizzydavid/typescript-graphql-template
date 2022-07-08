
import { Arg, Resolver, Ctx, Query, Mutation } from "type-graphql";
import { Service } from "typedi";
import { Comment, CommentInput } from "../schema/comment.schema";
import CommentService from "../services/comment.service";
import LogHelper from "../utils/logger/logHelper";
import Context from "../types/context";


@Service()
@Resolver(() => Comment)
export default class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: LogHelper,
  ) {}

  @Query(() => [Comment])
  async getComments(@Ctx() context: Context): Promise<Comment[]> {
    try {
      return await this.commentService.getComments();
    } catch (error: any) {
      this.logger.logRequest(error.message)
      throw error;
    }
  }

  @Mutation(() => Comment)
  async addComment(
    @Arg('commentInput') commentInput: CommentInput,
    @Ctx() context: Context
  ): Promise<Comment> {
    try {
      return await this.commentService.addComment(commentInput);
    } catch (error: any) {
      throw error;
    }
  }
}


