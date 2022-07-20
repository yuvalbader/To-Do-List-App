import TaskService from "../../services/TaskService";
import actionTypes from "../../Redux/actions/constants/index";

const taskService = new TaskService();

export const getTasksAction = () => {
  try {
    return async (dispatch) => {
      const tasks = await taskService.getAllTasks();
      dispatch(getAllTasks(tasks));
    };
  } catch (error) {
    throw error;
  }
};

export const addTasksAction = (taskContent) => {
  try {
    return async (dispatch) => {
      const newTasks = await taskService.addTask(taskContent);
      if (newTasks) {
        dispatch(addTask(newTasks));
      }
    };
  } catch (error) {
    throw error;
  }
};

export const deleteTaskAction = (taskId) => {
  try {
    return async (dispatch) => {
      await taskService.deleteTask(taskId);
      dispatch(deleteTask(taskId));
    };
  } catch (error) {
    throw error;
  }
};

export const deleteAllTasksAction = () => {
  try {
    return async (dispatch) => {
      await taskService.deleteAllItems();
      dispatch(deleteAllTasks());
    };
  } catch (error) {
    throw error;
  }
};

export const toggleTaskStatusAction = (taskId) => {
  try {
    return async (dispatch) => {
      await taskService.checboxClicked(taskId);
      dispatch(toggleTaskStatus(taskId));
    };
  } catch (error) {
    throw error;
  }
};

export const setVisabilityAction = (filter) => {
  try {
    return (dispatch) => {
      dispatch(setVisability(filter));
    };
  } catch (error) {
    throw error;
  }
};

export const resetErrorAction = () => {
  try {
    return (dispatch) => {
      dispatch(resetError());
    };
  } catch (error) {
    throw error;
  }
};

const toggleTaskStatus = (taskId) => {
  return {
    type: actionTypes.TOGGLE_TASK_STATUS,
    payload: taskId,
  };
};

const deleteAllTasks = () => {
  return {
    type: actionTypes.DELETE_ALL_TASKS,
  };
};

const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};

const getAllTasks = (tasks) => {
  return {
    type: actionTypes.GET_ALL_TASKS,
    payload: tasks,
  };
};

const deleteTask = (taskContent) => {
  return {
    type: actionTypes.DELETE_TASK,
    payload: taskContent,
  };
};

const addTask = (newTasks) => {
  try {
    return {
      type: actionTypes.ADD_TASK,
      payload: newTasks,
    };
  } catch (error) {
    throw error;
  }
};

const setVisability = (filter) => {
  return {
    type: actionTypes.SET_VISIBILITY_FILTER,
    payload: filter,
  };
};
