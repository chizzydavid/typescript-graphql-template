import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType, ID } from "type-graphql";
// import { getSchemaOptions } from "../utils/database/schema_options";
import { Movie } from "./movie.schema";

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => String, { nullable: true })
  @prop({ required: true, ref: () => Movie, type: () => String })
  movie_id: Ref<Movie, string>;  
  
  @Field(() => String)
  @prop({ required: true })
  text: string;

  @Field(() => String, { nullable: true })
  createdAt: string;
}


@InputType()
export class CommentInput implements Partial<Comment> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  movie_id: string;

  @Field(() => String)
  email: string;
}


// export const CommentModel = getModelForClass(Comment, getSchemaOptions());
export const CommentModel = getModelForClass(Comment, {  schemaOptions: {
  timestamps: true
}});

