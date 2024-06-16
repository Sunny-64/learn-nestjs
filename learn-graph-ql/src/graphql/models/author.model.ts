import { Field , Int, ID, ObjectType} from "@nestjs/graphql";
import { authors } from "../mock-data";
import { Book } from "./book.model";


@ObjectType()
export class Author {

    @Field(type => ID)
    id : number

    @Field()
    name : string

    @Field()
    verified : boolean

    @Field(type => [String], {nullable : true})
    favGenres : string []


    @Field(type => [Book], {nullable : true}) // have to specify the type when return custom type of arrays.
    books : [Book]
}