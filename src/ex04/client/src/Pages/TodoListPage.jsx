import React, { useState } from "react";
import { connect } from "react-redux";

import InputContainer from "../components/InputContainer/InputContainer";
import TodoList from "../components/TodoList/TodoList";
import TodoFilter from "../components/TodoFilter/TodoFilter";
import "monday-ui-react-core/dist/main.css";

import DeleteBtnsBar from "../components/DeleteBtnsBar/DeleteBtnsBar";
import { deleteAllTasksAction } from "../Redux/actions/tasksActions";
import "./TodoListPage.css";

function TodoListPage(props) {
  return (
    <div>
      <h1>Todo List</h1>

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
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteAllTasks: () => dispatch(deleteAllTasksAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPage);
