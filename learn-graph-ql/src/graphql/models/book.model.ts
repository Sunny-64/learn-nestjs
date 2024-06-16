import { Field, Int, ID, ObjectType, Float } from '@nestjs/graphql';
import { Author } from './author.model';

@ObjectType()
export class Book {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field((type) => Float)
  rating: number;

  @Field((type) => Int)
  author_id: number;

  @Field((type) => Author)
  author: Author;
}
