import React, { Component, useEffect } from "react";
import { Avatar } from "monday-ui-react-core";

import "../../components/ListItem/ListItem.css";

export default function ListItem({
  item,
  handleDoneTask,
  handleDelete,
  handleEdit,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between my-2">
      <Avatar
        size={Avatar.sizes.SMALL}
        src={item.imgUrl}
        type={Avatar.types.IMG}
      ></Avatar>
      <h6
        className={`mt-1 mb-0 align-middle ${
          item.isDone ? "completed-task" : ""
        }`}
      >
        {item.taskContent}
      </h6>
      <div className="todo-icon px-1 ">
        <span
          className={`mx-2 ${item.isDone ? "text-success" : "text-secondary"}`}
          onClick={() => {
            handleDoneTask(item.id);
          }}
        >
          <i
            className={`${
              item.isDone ? "far fa-check-square" : "far fa-square"
            }`}
          />
        </span>
        <span className="mx-2 text-warning" onClick={() => handleEdit}>
          <i className="fas fa-pen" />
        </span>
        <span
          className="mx-2 text-danger"
          onClick={() => handleDelete(item.id)}
        >
          <i className="fas fa-trash" />
        </span>
      </div>
    </li>
  );
}
