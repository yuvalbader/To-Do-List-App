import React, { useEffect, useState } from "react";
import InputContainer from "../components/InputContainer/InputContainer";
import TodoList from "../components/TodoList/TodoList";
import TaskService from "../services/TaskService";
import Simplert from "react-simplert";
import { Button } from "monday-ui-react-core";
import { Delete } from "monday-ui-react-core/dist/allIcons";
import "./TodoListPage.css";
import DeleteBtnsBar from "../components/DeleteBtnsBar/DeleteBtnsBar";

const TodoListPage = () => {
  const taskService = new TaskService();

  const [tasks, setTasks] = useState([]);
  const [showAlreadyExistAlert, setShowAlreadyExistAlert] = useState(false);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDeleteAll = async () => {
    await taskService.deleteAllItems();
    setTasks([]);
  };

  const getAllTasks = async () => {
    const tasks = await taskService.getAllTasks();
    setTasks(tasks);
  };

  const handleDelete = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    await taskService.deleteTask(id);
  };

  const handleDoneTask = async (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
    await taskService.checboxClicked(id);
  };

  const handleAddNewTask = async (inputValue) => {
    try {
      const alreadyExist = await taskService.addTask(inputValue);
      setShowAlreadyExistAlert(alreadyExist);
      getAllTasks();
    } catch (e) {
      console.log(e);
    }
    console.log(`add new task ${inputValue}`);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <Simplert
        showSimplert={showAlreadyExistAlert}
        onClose={() => setShowAlreadyExistAlert(false)}
        type={"info"}
        width={"150%"}
        title={"Task already exist"}
        message={"please try to add another task"}
      />
      <InputContainer handleAddNewTask={handleAddNewTask}></InputContainer>
      <TodoList
        items={tasks}
        handleDoneTask={handleDoneTask}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      ></TodoList>
      <DeleteBtnsBar handleDeleteAll={handleDeleteAll}></DeleteBtnsBar>
    </div>
  );
};

export default TodoListPage;
