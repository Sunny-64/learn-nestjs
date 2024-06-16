import { Resolver, Query, ResolveField, Parent, Int, Args, Mutation } from '@nestjs/graphql';
import { Book } from '../models/book.model'; 
import { Author } from '../models/author.model';  
import { books, authors } from '../mock-data';  
import { CreateBookInput } from '../utils/CreateBookInput';
import { UpdateBookInput } from '../utils/updateBookInput';

@Resolver(of => Book)
export class BookResolver {
  @Query(returns => [Book])
  getBooks() {
    return books;
  }

  @Query(returns => Book)
  getBookWithId(@Args('id', {type : () => Int}) id : number){
    return books.find(b => b.id === id); 
  }

  @ResolveField(returns => Author)
  author(@Parent() book: Book) {
    return authors.find(author => author.id === book.author_id);
  }

  @Mutation(returns => Book)
  createBook(@Args('createBookData') createBookData: CreateBookInput) {
    books.sort((a, b) => b.id - a.id);
    const newId = books[0].id + 1;
    const newBook = { id: newId, ...createBookData };
    books.push(newBook);
    return newBook;
  }

  @Mutation(returns => Book)
  updateBook(@Args('updateBookData') updateBookData: UpdateBookInput) {
    const bookIndex = books.findIndex(b => b.id === updateBookData.id);

    if (bookIndex === -1) {
      throw new Error(`Book with id ${updateBookData.id} not found`);
    }

    const updatedBook = { ...books[bookIndex], ...updateBookData };
    books[bookIndex] = updatedBook;

    return updatedBook;
  }

  @Mutation(returns => [Book])
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
      throw new Error(`Book with id ${id} not found`);
    }

    books.splice(bookIndex, 1);
    return books;
  }
}
