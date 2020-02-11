import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import BookList from "./components/BookList";

//apollo client setup
const client = new ApolloClient({
  //endpoint we make requests to
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
