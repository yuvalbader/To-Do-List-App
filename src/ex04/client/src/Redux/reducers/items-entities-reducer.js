import actionTypes from "../actions/constants/index";

const initialState = {
  tasks: [],
  visibilityFilter: "SHOW_ALL",
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TASKS:
      try {
        return {
          ...state,
          tasks: action.payload,
        };
      } catch (error) {
        throw new Error("An error occured while getting all tasks");
      }

    case actionTypes.ADD_TASK:
      try {
        return {
          ...state,
          tasks: [...state.tasks, ...action.payload],
        };
      } catch (error) {
        throw new Error("An error occured while adding a task");
      }

    case actionTypes.DELETE_TASK:
      try {
        return {
          ...state,
          tasks: state.tasks.filter(
            (task) => task.taskContent !== action.payload
          ),
        };
      } catch (error) {
        throw new Error("An error occured while deleting a task");
      }

    case actionTypes.DELETE_ALL_TASKS:
      try {
        return {
          ...state,
          tasks: [],
        };
      } catch (error) {
        throw new Error("An error occured while deleting all tasks");
      }

    case actionTypes.TOGGLE_TASK_STATUS:
      try {
        return {
          ...state,
          tasks: state.tasks.map((task) => {
            if (task.id === action.payload) {
              task.isDone = !task.isDone;
            }
            return task;
          }),
        };
      } catch (error) {
        throw new Error("An error occured while toggling a task status");
      }

    case actionTypes.SET_VISIBILITY_FILTER:
      try {
        return {
          ...state,
          visibilityFilter: action.payload,
        };
      } catch (error) {
        throw new Error("An error occured while setting the visibility filter");
      }

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
