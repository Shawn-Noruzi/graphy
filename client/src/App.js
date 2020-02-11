import React, {Component} from "react";
import BookList from "./components/BookList";

class App extends Component {
  render() {
    return (
      <div className="main">
        <BookList/>
      </div>
    );
  }
}

export default App;
