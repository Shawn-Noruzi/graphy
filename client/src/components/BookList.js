import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// queries
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;


//functional component -> dont need access to state or lifecycle methods here no need for class component.
const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;
  console.log(data)

  const bookListItems = books.map(({ id, name }) => {
    return <li key={id}>{name}</li>;
  });

  return (
    <div>
      <ul id="book-list">{bookListItems}</ul>
    </div>
  );
};

export default BookList;
