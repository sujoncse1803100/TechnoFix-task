import { useEffect, useState } from "react";
import "./Home.css";
import TaskModal from "./TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateItem } from "../features/todo/todoSlice";

const Home = () => {
  let storedTasks = useSelector((state) => state.todos.tasks);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const my_sortedTasks = [...storedTasks]?.sort((a, b) => {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    setTasks(my_sortedTasks);
    countCompletedTasks();
  }, [storedTasks]);

  const countCompletedTasks = () => {
    const completed = storedTasks?.filter((task) => task?.status == "complete");
    setCompletedTasksCount(completed.length);
  };

  const handlAddButton = () => {
    setOpenModal(true);
  };

  const handlCompleTask = (id) => {
    dispatch(updateItem({ id: id }));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setOpenModal(true);
  };

  const handleDeleteTask = (id) => {
    dispatch(removeItem({ id: id }));
  };

  return (
    <div
      className={`${
        openModal ? "home-container-with-modal" : "home-container"
      }`}
    >
      {openModal ? (
        editId ? (
          <TaskModal
            role="Edit"
            editId={editId}
            setEditId={setEditId}
            setOpenModal={setOpenModal}
          />
        ) : (
          <TaskModal role="Add" setOpenModal={setOpenModal} />
        )
      ) : (
        <>
          <h1 className="title">Tasks List</h1>
          <hr />
          <div className="task-desc">
            <div className="total">
              <strong>Total tasks:</strong>{" "}
              {tasks?.length < 10 ? `0${tasks.length}` : tasks.length}
            </div>
            <div className="total">
              <strong>Completed tasks:</strong>
              {completedTasksCount < 10
                ? `0${completedTasksCount}`
                : completedTasksCount}
            </div>
          </div>
          <div className="taks-container">
            <div
              className="add-tasks-btn common-button"
              onClick={handlAddButton}
            >
              Add Task
            </div>
            <div className="all-tasks">
              {tasks.length > 0 ? (
                tasks?.map((task, index) => (
                  <div key={index} className="item">
                    <div>
                      <strong>{task?.id}</strong>
                    </div>
                    <div>
                      <strong>{task?.taskName}</strong>
                    </div>

                    <div>
                      <strong>{task?.priority}</strong>
                    </div>

                    <div>
                      <strong>{task?.status}</strong>
                    </div>
                    <div>
                      <button
                        className={`comoon-btn ${
                          task?.status == "complete"
                            ? "disable-btn-mark"
                            : "btn-mark"
                        } `}
                        onClick={() => handlCompleTask(task?.id)}
                        disabled={task?.status == "complete" ? true : false}
                      >
                        {task?.status == "complete"
                          ? "COMPLETED"
                          : "Mark As Complete"}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEdit(task?.id)}
                        className="comoon-btn btn-edit"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDeleteTask(task?.id)}
                        className="comoon-btn btn-delete"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="not-availabe">No Task Availabe.!!!</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
