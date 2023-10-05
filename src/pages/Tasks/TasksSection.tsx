import { useDispatch, useSelector } from "react-redux";
import {
  ASYNC_UPDATE_TASK_SECTION,
  OPEN_TASK_ADDER,
  WRITE_TASK_NUMBER,
  WRITE_TASK_SECTION,
  WRITE_TASK_TARGET,
} from "../../redux/reducers/tasksReducer";
import Task from "./Task";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PROJECT_ID } from "../../redux/reducers/projectsReducer";
import { StateType, TaskType } from "../../types";

export default function TasksSection(props: {
  sectionName: string;
  elem: HTMLDivElement | null;
}) {
  const tasks = useSelector((state: StateType) => state.tasks.tasks);
  const dispatch = useDispatch();
  const id = useParams().id;
  useEffect(() => {
    dispatch({ type: PROJECT_ID, payload: id && +id });
  }, []);
  const filteredTasksList =
    tasks &&
    tasks[0] &&
    tasks?.filter(
      (tasks: TaskType) => tasks?.sectionName == props?.sectionName
    );
  const taskAdderOpened = useSelector(
    (state: StateType) => state.tasks.taskAdderOpened
  );
  const taskNumber = tasks.length + 1;

  const [currentDragColon, setCurrentDragColon] = useState("");
  function dragOverHandler(
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) {
    event.preventDefault();
    if (
      event.currentTarget.className == "dragOverTrackerRight" &&
      props.elem !== null
    ) {
      props.elem.scrollLeft += 200;
    }
    if (
      event.currentTarget.className == "dragOverTrackerLeft" &&
      props.elem !== null
    ) {
      props.elem.scrollLeft -= 200;
    }
    setCurrentDragColon(name);
  }

  function dropHandler(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dispatch({ type: WRITE_TASK_TARGET, payload: currentDragColon });
    dispatch({ type: ASYNC_UPDATE_TASK_SECTION });
  }

  return (
    <div
      className="each-tasks-section"
      onDragOver={(event) => {
        dragOverHandler(event, props.sectionName);
      }}
      onDrop={(e) => dropHandler(e)}
    >
      <div className="dragOverTrackerLeft"></div>

      <div className="head">
        <h3>{props.sectionName}</h3>
        <button
          onClick={() => {
            dispatch({ type: OPEN_TASK_ADDER, payload: !taskAdderOpened });
            dispatch({ type: WRITE_TASK_SECTION, payload: props.sectionName });
            dispatch({ type: WRITE_TASK_NUMBER, payload: taskNumber });
          }}
        >
          +
        </button>
      </div>
      <div className="scroll-zone">
        {filteredTasksList?.map((task: TaskType) => {
          return <Task key={task.number + Math.random()} task={task}></Task>;
        })}
      </div>
      <div className="dragOverTrackerRight"></div>
    </div>
  );
}
