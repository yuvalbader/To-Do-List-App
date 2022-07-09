import React, { useState } from "react";
import "./InputContainer.css";
import "./pokeball.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTasksAction } from "../../Redux/actions/tasksActions";
import { Circles } from "react-loader-spinner";
import Simplert from "react-simplert";

function TodoInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      <Simplert
        showSimplert={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        type={"info"}
        title={errorMessage}
        message={"please try again"}
      />
      <input
        type="text"
        className="add-new-input"
        placeholder="Write your new Todo"
        onChange={(e) => handleChange(e.target.value)}
        value={inputValue}
      ></input>
      {isLoading && <Circles ariaLabel="loading-indicator" />}
      {!isLoading && (
        <div className="pokeball add-new-button">
          <button
            className="pokeball__button"
            onClick={() => {
              try {
                props.addTasks(inputValue);
                setInputValue("");
              } catch (error) {
                setShowErrorAlert(true);
                setErrorMessage(error.message);
              }
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
