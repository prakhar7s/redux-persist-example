export const updateTodo = (currentTasks, payload) => {
  const { task: newTask, operation } = payload;
  if (operation === "+") {
    return [...currentTasks, newTask];
  } else if (operation === "-") {
    return currentTasks.filter((task) => task !== newTask);
  }
};
