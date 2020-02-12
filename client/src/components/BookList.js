import React,{useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import {GET_BOOKS_QUERY} from "../queries/queries";
import BookDetails from "./BookDetails";




//functional component -> dont need access to state or lifecycle methods here no need for class component. -- however using hooks in next section so will disregard this 
const BookList = () => {

  const [selected, setSelected] = useState({})
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;
  console.log("data:",data)

  const bookListItems = books.map(({ id, name }) => {
    return <li key={id} onClick={(e) => {setSelected(id)}}>{name}</li>;
  });

  return (
    <div>
      <ul id="book-list">{bookListItems}</ul>
      <BookDetails bookId={selected}/>
    </div>
  );
};

export default BookList;
