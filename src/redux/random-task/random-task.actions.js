const {
  default: randomTaskActionTypes,
} = require("./random-task.action.types");

export const updateTasks = (task) => ({
  type: randomTaskActionTypes.UPDATE_TASK,
  payload: task,
});
