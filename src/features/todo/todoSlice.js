import { createSlice } from "@reduxjs/toolkit";
import { removeTask, updateFullTask, updateTask } from "./manageMent";

const localStorageData = JSON.parse(localStorage.getItem("tasks"));

const initialState = {
  tasks: localStorageData?.length
    ? localStorageData
    : [
        {
          id: 1,
          taskName: "Task 1",
          status: "complete",
          priority: "high",
        },
        {
          id: 2,
          taskName: "Task 2",
          status: "incomplete",
          priority: "medium",
        },
        {
          id: 3,
          taskName: "Task 3",
          status: "complete",
          priority: "low",
        },
        {
          id: 4,
          taskName: "Task 4",
          status: "incomplete",
          priority: "high",
        },
      ],
};

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.tasks.push({ id: state.tasks.length + 1, ...action.payload });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    removeItem: (state, action) => {
      const updatedTasks = removeTask(state.tasks, action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      state.tasks = updatedTasks;
    },

    updateItem: (state, action) => {
      const updatedTasks = updateTask(state.tasks, action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      state.tasks = updatedTasks;
    },

    updateFullItem: (state, action) => {
      const updatedTasks = updateFullTask(state.tasks, action.payload);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      state.tasks = updatedTasks;
    },

    setTask: (state, action) => {
      state.tasks = [];
    },
  },
});

export const { addItem, removeItem, setTask, updateItem, updateFullItem } =
  todoSlice.actions;
export default todoSlice.reducer;
