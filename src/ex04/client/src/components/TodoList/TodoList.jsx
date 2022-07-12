import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListItem from "../ListItem/ListItem";
import { getTasksAction } from "../../Redux/actions/tasksActions";
import { Search } from "monday-ui-react-core";
import "../TodoList/TodoList.css";


function TodoList(props) {
  const { handleEdit } = props;
  const [tasksToShow, setTasksToShow] = useState([]);

  const setTasksToShowByVisibilityFilter = () => {
    if (props.visibilityFilter === "SHOW_ALL") {
      setTasksToShow(props.tasks);
    }
    if (props.visibilityFilter === "SHOW_COMPLETED") {
      setTasksToShow(props.tasks.filter((task) => task.isDone));
    }
    if (props.visibilityFilter === "SHOW_ACTIVE") {
      setTasksToShow(props.tasks.filter((task) => !task.isDone));
    }
  };

  useEffect(() => {
    props.getTasks();
    setTasksToShow(props.tasks);
  }, []);

  useEffect(() => {
    setTasksToShowByVisibilityFilter();
  }, [props.visibilityFilter, props.tasks]);

  return (
    <div className="todo-list-container">
      <Search
        className="search_bar"
        placeholder="Search your todo"
        onChange={(value) => {
          setTasksToShow(
            props.tasks.filter((task) =>
              task.taskContent.toLowerCase().includes(value.toLowerCase())
            )
          );
        }}
        wrapperClassName="monday-storybook-search_size"
      />
      <ul className="todo-list">
        {tasksToShow.map((item, index) => (
          <ListItem
            key={index}
            isDone={item.isDone}
            item={item}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      <label className="pending-tasks">
        {tasksToShow.length === 0
          ? "You don't have pending tasks"
          : `You have ${tasksToShow.length} tasks`}
      </label>
    </div>
  );
}

TodoList.prototype = {
  items: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tasks: state.itemsEntities.tasks,
    visibilityFilter: state.itemsEntities.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
