import React, { useState } from "react";
import "./InputContainer.css";
import "./pokeball.css";
import TaskService from "../../services/TaskService";

export default function TodoInput({ handleAddNewTask }) {
  {
    const taskService = new TaskService();

    const [inputValue, setInputValue] = useState("");

    const handleChange = (value) => {
      console.log(value);
      setInputValue(value);
    };

    return (
      <div className="add-new-container">
        <input
          type="text"
          className="add-new-input"
          placeholder="Write your new Todo"
          onChange={(e) => handleChange(e.target.value)}
        ></input>
        <div className="pokeball add-new-button">
          <button
            className="pokeball__button"
            onClick={() => handleAddNewTask(inputValue)}
          ></button>
        </div>
      </div>
    );
  }
}
