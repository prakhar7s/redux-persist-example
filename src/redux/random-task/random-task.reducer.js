const {
  default: randomTaskActionTypes,
} = require("./random-task.action.types");

const INITIAL_STATE = {
  tasks: [],
  darkTheme: true,
};

const randomTaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case randomTaskActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case randomTaskActionTypes.TOGGLE_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    default: {
      return state;
    }
  }
};

export default randomTaskReducer;
