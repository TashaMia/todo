import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ASYNC_ADD_TASK,
  OPEN_TASK_ADDER,
  WRITE_TASK_TIME,
  WRITE_TASK_TITLE_PRIORITY_AND_DESCTRIPTION,
} from "../redux/reducers/tasksReducer";
import TaskPriorityOption from "../pages/Tasks/TaskPriorityOption";
import { useParams } from "react-router-dom";
import FileAdder from "./FileAdder";

export default function TaskAdder() {
  const priorityType = [
    {
      priority: "high",
      style: "red",
    },
    {
      priority: "low",
      style: "green",
    },
    {
      priority: "medium",
      style: "yellow",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("red");
  const [openAttantion, setOpenAttantion] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("hight");
  const [finishTask, setFinishTask] = useState("");
  const dispatch = useDispatch();

  function taskNameReader(e: React.FormEvent<HTMLInputElement>) {
    setTaskName(e.currentTarget.value);
    if (taskName.length >= 1) {
      setOpenAttantion(false);
    }
  }
  function taskDescriptionReader(e: React.FormEvent<HTMLInputElement>) {
    if (taskDescription.length > 400) {
      return;
    }
    setTaskDescription(e.currentTarget.value);
    if (taskDescription.length >= 1) {
      setOpenAttantion(false);
    }
  }
  function finishTaskReader(e: React.FormEvent<HTMLInputElement>) {
    setFinishTask(e.currentTarget.value);
  }
  const id = useParams().id;

  const taskInputInfo = {
    priority: taskPriority,
    description: taskDescription,
    title: taskName,
    projectIndex: id && +id,
    endDate: finishTask,
  };
  const date = new Date();

  return (
    <div
      className="modal-window-bg"
      onClick={(e) => {
        if (e.currentTarget.className == "modal-window-bg") {
          dispatch({ type: OPEN_TASK_ADDER, payload: false });
        }
      }}
    >
      <div
        className="task-adder-section"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="task-adder">
          <h2>Add task</h2>
          <input
            type="text"
            placeholder="Enter task name"
            autoFocus
            onInput={(e) => {
              taskNameReader(e);
            }}
            value={taskName}
          ></input>
          <input
            type="text"
            placeholder="Task description"
            onInput={(e) => {
              taskDescriptionReader(e);
            }}
            value={taskDescription}
          ></input>
          <div className="finish-task-section">
            <p className="finish-task-title">Needs to be completed before:</p>
            <input
              type="date"
              placeholder="ex: 01.12.2023, 17:00"
              value={finishTask}
              onInput={(e) => {
                finishTaskReader(e);
              }}
            ></input>
          </div>
          {openAttantion && (
            <div className="attantion">
              <p>⚠️ Name of task and description should be entered</p>
            </div>
          )}
          <div className="priority-section">
            <h3>Select priority</h3>
            <div className="priority-options">
              {priorityType.map((option) => {
                return (
                  <TaskPriorityOption
                    key={option.priority}
                    option={option}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    setTaskPriority={setTaskPriority}
                  />
                );
              })}
            </div>
          </div>
          <div className="more-action-section">
            <FileAdder />
          </div>
        </div>
        <div className="task-adder-btn-section">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (taskName.length < 1 || taskDescription.length < 1) {
                setOpenAttantion(true);
                return;
              }
              dispatch({
                type: WRITE_TASK_TITLE_PRIORITY_AND_DESCTRIPTION,
                payload: taskInputInfo,
              });
              dispatch({
                type: WRITE_TASK_TIME,
                payload: new Date(date),
              });
              dispatch({ type: ASYNC_ADD_TASK });
              dispatch({ type: OPEN_TASK_ADDER, payload: false });
            }}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
}
