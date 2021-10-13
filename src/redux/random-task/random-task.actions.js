const {
  default: randomTaskActionTypes,
} = require("./random-task.action.types");

export const updateTasks = (payload) => ({
  type: randomTaskActionTypes.UPDATE_TASK,
  payload,
});

export const toggleTheme = () => ({
  type: randomTaskActionTypes.TOGGLE_THEME,
});

export const restoreTodos = () => ({
  type: randomTaskActionTypes.RESTORE_TODOS,
});
