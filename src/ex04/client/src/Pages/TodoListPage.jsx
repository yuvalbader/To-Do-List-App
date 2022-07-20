import React, { useState } from "react";
import { connect } from "react-redux";

import InputContainer from "../components/InputContainer/InputContainer";
import TodoList from "../components/TodoList/TodoList";
import TodoFilter from "../components/TodoFilter/TodoFilter";
import ErrorAlert from "../components/ErrorAlert";

import DeleteBtnsBar from "../components/DeleteBtnsBar/DeleteBtnsBar";
import {
  deleteAllTasksAction,
  resetErrorAction,
} from "../Redux/actions/tasksActions";
import "monday-ui-react-core/dist/main.css";
import "./TodoListPage.css";

function TodoListPage(props) {
  return (
    <div>
      <h1>Todo List</h1>
      <ErrorAlert
        show={props.error}
        message={props.error ? props.error.message : ""}
        onClose={props.resetError}
      ></ErrorAlert>
      <InputContainer></InputContainer>
      <TodoFilter></TodoFilter>
      <TodoList></TodoList>
      <DeleteBtnsBar handleDeleteAll={props.deleteAllTasks}></DeleteBtnsBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.itemsEntities.tasks,
    error: state.itemsEntities.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteAllTasks: () => dispatch(deleteAllTasksAction()),
  resetError: () => dispatch(resetErrorAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPage);
