export const removeTask = (tasks, id) => {
  const updatedTasks = tasks.filter((task) => {
    if (task.id > id) {
      const updatedTask = { ...task };
      updatedTask.id = updatedTask.id - 1;
      return updatedTask;
    } else if (task.id < id) {
      return task;
    }
  });

  return [...updatedTasks];
};

export const updateTask = (tasks, id) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id == id) {
      const updatedTask = { ...task };
      updatedTask.status = "complete";
      return updatedTask;
    } else {
      return task;
    }
  });

  return updatedTasks;
};

export const updateFullTask = (tasks, item) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id == item.id) {
      return { ...item };
    } else {
      return task;
    }
  });

  return updatedTasks;
};
