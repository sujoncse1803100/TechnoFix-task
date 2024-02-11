import { createSlice } from "@reduxjs/toolkit";
import { removeTask, updateFullTask, updateTask } from "./manageMent";

const initialState = {
  tasks: [
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
    },

    removeItem: (state, action) => {
      // console.log(action.payload);
      state.tasks = removeTask(state.tasks, action.payload.id);
    },

    updateItem: (state, action) => {
      state.tasks = updateTask(state.tasks, action.payload.id);
    },

    updateFullItem: (state, action) => {
      state.tasks = updateFullTask(state.tasks, action.payload);
    },

    setTask: (state, action) => {
      state.tasks = [];
    },
  },
});

export const { addItem, removeItem, setTask, updateItem, updateFullItem } =
  todoSlice.actions;
export default todoSlice.reducer;
