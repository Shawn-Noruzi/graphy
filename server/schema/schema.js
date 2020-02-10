const graphql = require("graphql");
const _ = require("lodash");

//Purpose : describes data, object types, relations between object types,
//and how we can access the data (mutate,query)
//1. Data (from DB or hardcoded or local)
//2. Type declaration (Book has name, genre, author -> nested data)
//3. Define any relations inside the types. (Book with ID? Return Author with same ID as well)
//3. RootQuery (What user can type as a query + how the data is found/returned)
//4. Export into Express Server

//destructure functions/props from graphQL package
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//dummy data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];

const authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" }
];

//declare new object type
//declaring fields helps avoid reference errors
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return any books with an id that matches the authorId given in the 'author' query
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

//grab books - authors - all books - all authors
//not worried about order here -> just access into the different parts of our graph.
//args = which arguments should come when along with the user's query + their data type
//resolve = contains code to get data we need from db/other source
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      //what we expect when user queries book
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      //what is returned
      resolve(parent, args) {
        //args.id exists in this scope
        //search books array and find the book with the ID
        //books is dummy data -> will be replaced by database later
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },

      //we're going to grab the authorId from Author data -> return all books with matching authorId
      //when user queries for author(id:"3") -> they get book x,y,z data back.
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
