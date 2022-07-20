import React, { useState } from "react";
import "./InputContainer.css";
import "./pokeball.css";
import { connect } from "react-redux";
import { addTasksAction } from "../../Redux/actions/tasksActions";
import { Circles } from "react-loader-spinner";
import { Loader } from "monday-ui-react-core";

function TodoInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.addTasksAction(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="add-new-container">
      <input
        type="text"
        className="add-new-input"
        placeholder="Write your new Todo"
        onChange={(e) => handleChange(e.target.value)}
        value={inputValue}
      ></input>
      {isLoading && <Loader size={40}></Loader>}
      {!isLoading && (
        <div className="pokeball add-new-button">
          <button
            className="pokeball__button"
            onClick={() => {
              props.addTasks(inputValue);
              setInputValue("");
            }}
          ></button>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addTasks: (task) => dispatch(addTasksAction(task)),
});

export default connect(null, mapDispatchToProps)(TodoInput);
