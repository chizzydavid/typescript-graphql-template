import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Field, InputType, ObjectType, ID, Int } from "type-graphql";
import { Comment } from "./comment.schema";
import { Imdb, ImdbInput} from "./imdb.schema";

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    timestamps: true
  }
})
@ObjectType()
export class Movie {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  plot: string;

  @Field(() => [String])
  @prop()
  genres: string[];

  @Field(() => Int)
  @prop({ required: true })
  runtime: number;
  
  @Field(() => [String])
  @prop()
  cast: string[];

  @Field(() => Int)
  @prop()
  num_mflix_comments: number;

  @Field(() => String)
  @prop({ required: true })
  title: string;

  @Field(() => String)
  @prop({ required: true })
  fullplot: string;  

  @Field(() => [String])
  @prop()
  countries: string[];

  @Field(() => String)
  @prop({ required: true })
  released: string;

  @Field(() => [String])
  @prop()
  directors: string[];

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  rated: string;

  @Field(() => String)
  @prop({ required: true })
  type: string;  

  @Field(() => Imdb)
  @prop()
  imdb: Imdb;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[]
}


@InputType()
export class MovieInput implements Partial<Movie> {
  @Field(() => String)
  plot: string;

  @Field(() => [String])
  genres: string[];

  @Field(() => Int)
  runtime: number;
  
  @Field(() => [String])
  cast: string[];

  @Field(() => Int)
  num_mflix_comments: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  fullplot: string;  

  @Field(() => [String])
  countries: string[];

  @Field(() => String)
  released: string;

  @Field(() => [String])
  directors: string[];

  @Field(() => String, { nullable: true })
  rated: string;

  @Field(() => String)
  type: string;  

  @Field(() => ImdbInput)
  imdb: Imdb;
}

export const MovieModel = getModelForClass(Movie);

