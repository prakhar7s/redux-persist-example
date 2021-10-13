import { manipulateTasks } from "./random-task.utils";

const {
  default: randomTaskActionTypes,
} = require("./random-task.action.types");

const INITIAL_STATE = {
  tasks: [],
  deletedTasks: [],
  darkTheme: true,
};

const randomTaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case randomTaskActionTypes.UPDATE_TASK:
      const res = manipulateTasks(state.tasks, action.payload);

      return {
        ...state,
        tasks: res[0],
        ...(action.payload.operation === "-" && {
          deletedTasks: [...state.deletedTasks, res[1]],
        }),
      };

    case randomTaskActionTypes.RESTORE_TODOS:
      const temp = state.deletedTasks.map((task) => task);
      state.deletedTasks.length = 0;
      return {
        ...state,
        tasks: [...state.tasks, ...temp],
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
