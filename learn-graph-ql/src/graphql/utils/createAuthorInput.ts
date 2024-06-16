import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAuthorInput {
    @Field()
    name : string
    
    @Field()
    verified : boolean

    @Field(type => [String])
    favGenres : [string]
}