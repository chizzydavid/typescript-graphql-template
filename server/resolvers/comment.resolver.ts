
import { Arg } from "type-graphql";
import { Service } from "typedi";
import { Comment, CommentInput } from "../schema/comment.schema";
import CommentService from "../services/comment.service";


@Service()
export default class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  async getComments(): Promise<Comment[]> {
    return await this.commentService.getComments();
  }

  async addComment(
    @Arg('commentInput') commentInput: CommentInput,
  ): Promise<Comment> {
    return await this.commentService.addComment(commentInput);
  }
}

