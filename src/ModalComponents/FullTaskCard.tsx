import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import FileAdder from "./FileAdder";
import { useDispatch } from "react-redux";
import { FULL_TASK_OPENED } from "../redux/reducers/tasksReducer";

export default function FullTaskCard(props: any) {
  const test = Date.parse(new Date(props.task.created).toLocaleString());
  const dispatch = useDispatch();
  return (
    <div
      className="modal-window-bg"
      onClick={(e) => {
        e.stopPropagation();
        if (e.currentTarget.className == "modal-window-bg") {
          dispatch({ type: FULL_TASK_OPENED, payload: false });
        }
      }}
    >
      <div
        className="full-task-card"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="head">
          <p className="title">
            #{props.task.number} {props.task.title}
          </p>
          <div className="edit-task">
            <img src="./svg/edit.svg" alt="edit task"></img>
            <div
              className="task-priority"
              style={{
                backgroundColor: `${props.currentStyle}`,
              }}
            >
              <p>{props.task.priority}</p>
            </div>
            <p>{props.task.sectionName}</p>
          </div>
        </div>
        <div className="description-section">
          <p>{props.task.description}</p>
        </div>
        <div className="files-section">
          {props.task.files.map((link: string) => {
            return (
              <img src={link} width={100} height={100} alt="post picture"></img>
            );
          })}
        </div>
        <div className=" date-section">
          <p>Start: {props.task.created}</p>
          <p>
            In work ⌛:{" "}
            <TimeAgo
              now={() => Date.parse(new Date().toLocaleString())}
              date={new Date(props.task.created).toISOString()}
            />
          </p>
          <p>
            Needs to be completed before:{" "}
            {props.task.endDate?.length > 0 ? props.task.endDate : "not chosen"}
          </p>
        </div>
        <div className="more-action-section">
          {" "}
          <FileAdder />
          <button className="comment-open-btn">
            <p>Comments</p>
            <img src="./svg/chat-circle-text.svg" alt="open comments"></img>
          </button>
        </div>
      </div>
    </div>
  );
}
