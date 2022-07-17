import itemsEntitiesReducer from "../items-entities-reducer";
import {
  addTask,
  deleteTask,
  deleteAllTasks,
  toggleTaskStatus,
  setVisability,
} from "../../actions/tasksActions";

const emptyTasks = [];

const oneTask = [
  {
    id: 1,
    taskContent: "task 1",
    isDone: 0,
  },
];

const taskToAdd = [
  {
    id: 3,
    taskContent: "task 3",
    isDone: 0,
  },
];

const twoTasks = [
  {
    id: 1,
    taskContent: "task 1",
    isDone: 0,
  },
  {
    id: 2,
    taskContent: "task 2",
    isDone: 0,
  },
];

const threeTasks = [
  {
    id: 1,
    taskContent: "task 1",
    isDone: 0,
  },
  {
    id: 2,
    taskContent: "task 2",
    isDone: 0,
  },
  {
    id: 3,
    taskContent: "task 3",
    isDone: 0,
  },
];

const threeTasksAfterToggleSecondTask = [
  {
    id: 1,
    taskContent: "task 1",
    isDone: 0,
  },
  {
    id: 2,
    taskContent: "task 2",
    isDone: true,
  },
  {
    id: 3,
    taskContent: "task 3",
    isDone: 0,
  },
];

const threeTasksAfterDeleteFirstTask = [
  {
    id: 2,
    taskContent: "task 2",
    isDone: true,
  },
  {
    id: 3,
    taskContent: "task 3",
    isDone: 0,
  },
];

test("Adds the third task to the list of  twoTasks and expect the list to be threeTasks", () => {
  const previousState = { tasks: [...twoTasks] };
  expect(itemsEntitiesReducer(previousState, addTask(taskToAdd))).toEqual({
    tasks: [...threeTasks],
  });
});

test("Toggle the second task to be done and expect the list to be threeTasksAfterToggleSecondTask", () => {
  const previousState = { tasks: [...threeTasks] };
  expect(itemsEntitiesReducer(previousState, toggleTaskStatus(2))).toEqual({
    tasks: [...threeTasksAfterToggleSecondTask],
  });
});

test("Delete the first task and expect the list to be threeTasksAfterDeleteFirstTask", () => {
  const previousState = { tasks: [...threeTasks] };
  expect(itemsEntitiesReducer(previousState, deleteTask("task 1"))).toEqual({
    tasks: [...threeTasksAfterDeleteFirstTask],
  });
});

test("Delete all tasks and expect the list to be emptyTasks", () => {
  const previousState = { tasks: [...threeTasks] };
  expect(itemsEntitiesReducer(previousState, deleteAllTasks())).toEqual({
    tasks: [...emptyTasks],
  });
});
