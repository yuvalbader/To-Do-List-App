import actionTypes from "../actions/constants/index";

const initialState = {
  tasks: [],
  visibilityFilter: "SHOW_ALL",
  error: null,
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
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
      }

    case actionTypes.ADD_TASK:
      try {
        if (!action.payload["error"]) {
          return {
            ...state,
            tasks: [...state.tasks, ...action.payload],
          };
        } else {
          throw new Error(action.payload["error"]);
        }
      } catch (error) {
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
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
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
      }

    case actionTypes.DELETE_ALL_TASKS:
      try {
        return {
          ...state,
          tasks: [],
        };
      } catch (error) {
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
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
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
      }

    case actionTypes.SET_VISIBILITY_FILTER:
      try {
        return {
          ...state,
          visibilityFilter: action.payload,
        };
      } catch (error) {
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
      }

    case actionTypes.RESET_ERROR:
      try {
        return {
          ...state,
          error: null,
        };
      } catch (error) {
        return {
          ...state,
          error: {
            message: error.message,
          },
        };
      }

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
