import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field(type => Int, { nullable: true })
  rating?: number;

  @Field(type => Int, { nullable: true })
  author_id?: number;
}
