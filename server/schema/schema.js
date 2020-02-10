const graphql = require("graphql");
const _ = require("lodash");

//describes data,object types, relations between object types,
//and how we can access the data (mutate,query)

//destructure functions/props from graphQL package
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

//dummy data
var books = [
  { name: "a", genre: "Fantasy", id: "1", authorId:"1" },
  { name: "b", genre: "Romance", id: "2", authorId: "2"},
  { name: "c", genre: "Horror", id: "3", authorId: "1" }
];

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: "1" },
    { name: 'Brandon Sanderson', age: 42, id: "2" },
    { name: 'Terry Pratchett', age: 66, id: "3" },
]



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
                return _.find(authors, { id: parent.authorId })
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


        }
    }
    });

module.exports = new GraphQLSchema({
  query: RootQuery
});
