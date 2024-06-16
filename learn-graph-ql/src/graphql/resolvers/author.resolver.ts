import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Author } from "../models/author.model";
import { authors, books } from "../mock-data";
import { Book } from "../models/book.model";
import { CreateAuthorInput } from "../utils/createAuthorInput";
import { UpdateAuthorInput } from "../utils/updateAuthorInput";

@Resolver(of => Author)
export class AuthorResolver {

    @Query(returns => [Author])
    getAuthors() {
        return authors;
    }

    @Query(returns => Author)
    getAuthorWithId(@Args('id', {type : () => Int}) id : number) {
        return authors.find(a => a.id === id);
    }

    @ResolveField(returns => [Book])
    books(@Parent() author : Author){
        const {id} = author
        return books.filter(b => b.author_id === id); 
    }

    @Mutation(returns => Author)
    createAuthor(@Args('createAuthorData') createAuthorData : CreateAuthorInput){
        authors.sort((a,b) => b.id - a.id);
        const newId = authors[0].id + 1; 
        const payload = {id : newId, ...createAuthorData}; 
        authors.push(payload); 
        return payload; 
    }

    @Mutation(returns => [Author])
    deleteAuthor(@Args('id', {type : () => Int}) id : number) {
        // Find the index of the author to be deleted
        const authorIndex = authors.findIndex(a => a.id === id);
    
        if (authorIndex === -1) {
            throw new Error(`Author with id ${id} not found`);
        }
 
         // Remove the author from the authors array
        const deletedAuthor = authors.splice(authorIndex, 1);
 
          // Remove books by the deleted author
        for (let i = books.length - 1; i >= 0; i--) {
            if (books[i].author_id === id) {
                books.splice(i, 1);
            }
        }
 
         return authors;
    }

    @Mutation(returns => Author)
    updateAuthor(@Args('updateAuthorData') updateAuthorData: UpdateAuthorInput) {
        const authorIndex = authors.findIndex(a => a.id === updateAuthorData.id);

        if (authorIndex === -1) {
            throw new Error(`Author with id ${updateAuthorData.id} not found`);
        }

        const updatedAuthor = { ...authors[authorIndex], ...updateAuthorData };
        authors[authorIndex] = updatedAuthor;

        return updatedAuthor;
    }
}