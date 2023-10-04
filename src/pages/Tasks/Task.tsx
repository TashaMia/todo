import { useState } from "react";
import FullTaskCard from "../../ModalComponents/FullTaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  FULL_TASK_OPENED,
  WRITE_DRAG_ID,
} from "../../redux/reducers/tasksReducer";

export default function Task(props: { task: any }) {
  const priorityStyle = [
    {
      priority: "hight",
      style: "rgba(192, 60, 60, 0.731)",
    },
    {
      priority: "medium",
      style: "rgba(192, 188, 60, 0.731)",
    },
    {
      priority: "light",
      style: "rgba(60, 192, 89, 0.731)",
    },
  ];
  const dispatch = useDispatch();
  const currentStyleFiltering = priorityStyle.filter(
    (style) => style.priority == props.task.priority
  );
  const currentStyle =
    currentStyleFiltering[0] && currentStyleFiltering[0].style;

  const fullCard = useSelector((state: any) => state.tasks.fullTaskOpened);

  console.log(fullCard);
  function dropHandler(e: any) {
    e.preventDefault();
  }

  function dragStartHandler(e: any) {
    dispatch({ type: WRITE_DRAG_ID, payload: props.task.id });
  }

  return (
    <div
      className="task"
      style={{
        borderLeft: ` 4px solid ${currentStyle}`,
      }}
      draggable="true"
      onDragStart={(e) => dragStartHandler(e)}
      onDrop={(e) => dropHandler(e)}
      onClick={() => {
        dispatch({ type: FULL_TASK_OPENED, payload: true });
      }}
    >
      {fullCard && (
        <FullTaskCard currentStyle={currentStyle} task={props.task} />
      )}
      <p>
        #{props.task.number} {props.task.title}
      </p>
      <div
        className="task-priority"
        style={{
          backgroundColor: `${currentStyle}`,
        }}
      >
        <p>{props.task.priority}</p>
      </div>
    </div>
  );
}
