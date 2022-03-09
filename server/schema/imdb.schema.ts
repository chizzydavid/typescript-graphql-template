import { Field, ObjectType, InputType, Int, Float } from "type-graphql";

@ObjectType()
export class Imdb {
  @Field(() => Float, { nullable: true })
  rating: number;

  @Field(() => Int, { nullable: true })
  votes: number;

  @Field(() => String)
  id: string;  
}

@InputType()
export class ImdbInput {
  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  votes: number;

  @Field(() => Int)
  id: number;  
}


