import React, { useState } from "react";
import "./InputContainer.css";
import "./pokeball.css";
import PropTypes from "prop-types";

export default function TodoInput({ handleAddNewTask }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddNewTask(inputValue);
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
        onKeyDown={(e) => handleKeyPress(e)}
        value={inputValue}
      ></input>
      <div className="pokeball add-new-button">
        <button
          className="pokeball__button"
          onClick={() => {
            handleAddNewTask(inputValue);
            setInputValue("");
          }}
        ></button>
      </div>
    </div>
  );
}

TodoInput.prototype = {
  handleAddNewTask: PropTypes.func.isRequired,
};
