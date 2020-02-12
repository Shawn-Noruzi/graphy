import { gql } from "apollo-boost";

// queries
const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;

const GET_BOOK_QUERY = gql`
query($id:ID){
    book(id:$id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`;


const GET_AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`;

//mutation takes variables in now
const ADD_BOOK_MUTATION = gql`
mutation($name:String!, $genre:String!, $authorId: ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name,
        id
    }
}
`



export {GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY, GET_BOOK_QUERY};