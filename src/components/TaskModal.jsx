import { useEffect, useState } from "react";
import "./TaskModal.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateFullItem } from "../features/todo/todoSlice";

const TaskModal = ({ setOpenModal, role, setEditId, editId }) => {
  const tasks = useSelector((state) => state.todos.tasks);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    taskName: "",
    status: "incomplete",
    priority: "high",
  });

  useEffect(() => {
    const myTask = tasks.find((task) => task.id == editId);
    editId && setTask(myTask) && console.log(editId);
  }, [tasks]);

  const handleChange = (e) => {
    const updatedTask = { ...task };
    updatedTask[e.target.name] = e.target.value;
    setTask(updatedTask);
  };

  const handleTask = () => {
    if (role == "Add") {
      addTask();
    } else {
      editTask();
    }
  };

  const addTask = () => {
    if (task.taskName == "") {
      setError("Please Set Task Name");
    } else {
      dispatch(addItem({ ...task }));
      setOpenModal(false);
    }
  };

  const editTask = () => {
    if (task.taskName == "") {
      setError("Please Set Task Name");
    } else {
      dispatch(updateFullItem({ ...task }));
      setOpenModal(false);
      setEditId(null);
    }
  };

  const handleGoBack = () => {
    role == "Edit" && setEditId(null);
    setOpenModal(false);
  };

  return (
    <div className="task-modal">
      <div className="task-input-container">
        <div className="task-title">Task Name</div>
        <div className="input-container">
          <input
            onChange={handleChange}
            type="text"
            name="taskName"
            className="inputField"
            value={`${task.taskName}`}
          />
        </div>
      </div>
      <div className="task-input-container">
        <div className="task-title">Status</div>
        <div className="input-container">
          <select
            onChange={handleChange}
            name="status"
            id=""
            className="inputField"
            value={`${editId ? task.status : ""}`}
          >
            <option value="complete">complete</option>
            <option value="incomplete">incomplete</option>
          </select>
        </div>
      </div>

      <div className="task-input-container">
        <div className="task-title">Priority</div>
        <div className="input-container">
          <select
            onChange={handleChange}
            name="priority"
            id=""
            className="inputField"
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="task-btn-container">
        <button onClick={handleGoBack} className="add-task common-btn">
          Go Back
        </button>

        <button onClick={handleTask} className="add-task common-btn">
          {role} Task
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
