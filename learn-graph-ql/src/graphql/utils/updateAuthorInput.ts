import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateAuthorInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  verified?: boolean;

  @Field(type => [String], { nullable: true })
  favGenres?: string[];
}