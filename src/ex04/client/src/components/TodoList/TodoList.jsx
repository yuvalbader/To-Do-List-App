import React, { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import "../TodoList/TodoList.css";

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
    </div>
  );
}
