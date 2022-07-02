import React from "react";
import ListItem from "../ListItem/ListItem";
import "../TodoList/TodoList.css";
import PropTypes from "prop-types";

export default function TodoList({
  items,
  handleDoneTask,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            isDone={item.isDone}
            item={item}
            handleDoneTask={handleDoneTask}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      <label className="pending-tasks">
        {items.length === 0
          ? "You don't have pending tasks"
          : `You have ${items.length} tasks`}
      </label>
    </div>
  );
}

TodoList.prototype = {
  items: PropTypes.array.isRequired,
  handleDoneTask: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
