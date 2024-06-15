import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

export const authors = [
    {
        id : '1', 
        name : 'Harper Lee'
    }, 
    {
        id : '2', 
        name : 'Jk Rowling', 
    }, 
    {
        id : '3', 
        name : 'Agatha Christie'
    }, 
    {
        id : '4', 
        name : 'Aruthur Conan Doyle'
    }
]

export const books = [
    {
        id : '1', 
        title : 'To Kill a Mockingbird', 
        author_id : '1'
    }, 
    {
        id : '2', 
        title : 'Harry Potter and the cursed child', 
        author_id : '2'
    }, 
    {
        id : '3', 
        title : 'And then there were none', 
        author_id : '3'
    }, 
    {
        id : '4', 
        title : 'Sherlock Holmes : Hound of the Beskerville', 
        author_id : '4'
    }, 
    {
        id : '5', 
        title : 'Third Girl', 
        author_id : '3'
    }, 
]


export const typeDefs = `#graphql

    type Book {
        id : ID!
        title : String!
        author_id : String!
        author : Author
    }

    type Author {
        id : ID!
        name : String!
        books : [Book!]
    }

    type Query {
        books : [Book]!
        book(id : ID!) : Book
        authors : [Author]!
        author(id : ID!) : Author
    }

`

const resolvers = {
   Query : {
        books : () => books, 
        authors : () => authors,
        book : (_, args) => books.find(b => args.id === b.id), 
        author : (_, args) => authors.find(a => args.id === a.id)
   }, 
   Author :  {
        books : (parent) => books.filter(b => parent.id === b.author_id)
   }, 
   Book : {
        author : (parent) => authors.find(a => a.id === parent.author_id)
   }, 
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { 
        port: 4000 
    },
});

console.log(`🚀  Server ready at: ${url}`);
