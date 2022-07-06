import React from "react";
import TodoListPage from "../../Pages/TodoListPage";
import "./AppContainer.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app-container">
        <TodoListPage></TodoListPage>
      </div>
    );
  }
}

export default App;
