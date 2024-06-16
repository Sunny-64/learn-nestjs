import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field(type => Int)
  rating: number;

  @Field(type => Int)
  author_id: number;
}

