import { Comment, CommentInput, CommentModel } from "../schema/comment.schema";
import { Service } from "typedi";


@Service()
export default class CommentService {
  async addComment(commentInput: CommentInput): Promise<Comment> {
    const newComment = await CommentModel.create(commentInput);
    return newComment;
  }

  async getComments(): Promise<Comment[]> {
    const comments = await CommentModel.find().limit(20);
    return comments;
  }
}

