import React from "react";
import { connect } from "react-redux";
import { Avatar } from "monday-ui-react-core";
import {
  toggleTaskStatusAction,
  deleteTaskAction,
} from "../../Redux/actions/tasksActions";

import "../../components/ListItem/ListItem.css";

function ListItem(props) {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between my-2">
        <Avatar
          size={Avatar.sizes.SMALL}
          src={props.item.imgUrl}
          type={Avatar.types.IMG}
        ></Avatar>
        <h6 className={`test   ${props.item.isDone ? "completed-task" : ""}`}>
          {props.item.taskContent}
        </h6>
        <div className="todo-icon px-1 ">
          <span
            className={`mx-2 ${
              props.item.isDone ? "text-success" : "text-secondary"
            }`}
            onClick={() => props.toggleTaskStatus(props.item.id)}
          >
            <i
              className={`${
                props.item.isDone ? "far fa-check-square" : "far fa-square"
              }`}
            />
          </span>
          <span className="mx-2 text-warning">
            <i className="fas fa-pen" />
          </span>
          <span
            className="mx-2 text-danger"
            onClick={() => props.deleteTask(props.item.taskContent)}
          >
            <i className="fas fa-trash" />
          </span>
        </div>
      </li>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.itemsEntities.tasks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleTaskStatus: (id) => dispatch(toggleTaskStatusAction(id)),
  deleteTask: (task) => dispatch(deleteTaskAction(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
