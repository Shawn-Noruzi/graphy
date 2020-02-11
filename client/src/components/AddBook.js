import React, {useMemo} from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// queries
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getOptions = (loading,error,data) => {
    if (loading){
        return <option disabled>Loading Authors..</option>
    } 
    if (error){
        return <option disabled>Error loading authors...</option>
    }
    else {
        return data.authors.map(({name, id}) => {
            return (
                <option key={id} value={id}>
                    {name}
                </option>
            )
        })
    }
}

//functional component -> dont need access to state or lifecycle methods here no need for class component.
const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  
  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ]);

  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
            {options}
          </select>
        </div>

        <button></button>
      </form>
    </div>
  );
};

export default AddBook;
