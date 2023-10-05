import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import {
  ASYNC_ADD_SUBTASK,
  ASYNC_GET_COMMENTS,
  ASYNC_GET_SUBCOMMENTS,
  ASYNC_GET_SUBTASK,
  ASYNC_UPDATE_TASK,
  COMMENT_CREATOR_OPENED,
  CREATE_SUBTASK,
  EDITED_FIELDS,
  FULL_TASK_OPENED,
} from "../redux/reducers/tasksReducer";
import Subtask from "./Subtask";
import CommentAdder from "./CommentAdder";
import Comment from "../pages/Tasks/Comment";
import { CommentType, StateType, SubtaskType, TaskType } from "../types";

export default function FullTaskCard(props: {
  currentStyle: string;
  task: TaskType;
}) {
  const [editForm, setEditForm] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const taskId = useSelector(
    (state: StateType) => state.tasks.fullTaskOpenedId
  );
  const dispatch = useDispatch();
  const comments = useSelector((state: StateType) => state.tasks.comments);
  function editTitleHandler(e: React.FormEvent<HTMLInputElement>) {
    setEditedTitle(e.currentTarget.value);
  }

  function editDescriptionHandler(e: React.FormEvent<HTMLInputElement>) {
    setEditedDescription(e.currentTarget.value);
  }

  const editedFields = {
    title: editedTitle,
    description: editedDescription,
  };

  const [subtask, setSubtask] = useState("");

  function subtaskReader(e: React.FormEvent<HTMLInputElement>) {
    if (setSubtask.length < 1) {
      return;
    }
    setSubtask(e.currentTarget.value);
  }
  useEffect(() => {
    dispatch({ type: ASYNC_GET_SUBTASK });
    dispatch({ type: ASYNC_GET_SUBCOMMENTS });
    dispatch({ type: ASYNC_GET_COMMENTS });
  }, []);

  const commentCreatorOpened = useSelector(
    (state: StateType) => state.tasks.commentCreatorOpened
  );
  const subtaskList = useSelector((state: StateType) => state.tasks.subtasks);
  const [openSubtaskCreator, setOpenSubtaskCreator] = useState(false);
  const subcommentCreatorOpened = useSelector(
    (state: StateType) => state.tasks.subcommentCreatorOpened
  );

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
          <div className="title">
            <p> #{props.task.number}</p>
            {editForm ? (
              <input
                type="text"
                placeholder={props.task.title}
                onInput={(e) => editTitleHandler(e)}
                value={editedTitle}
              ></input>
            ) : (
              <p>{props.task.title}</p>
            )}
          </div>
          <div className="edit-task">
            <button
              className="edit-task-btn"
              onClick={() => {
                setEditForm(!editForm);
              }}
            >
              <img src="./svg/edit.svg" alt="edit task"></img>
            </button>
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
          {editForm ? (
            <div className="description-edit">
              <input
                type="text"
                placeholder={props.task.description}
                onInput={(e) => editDescriptionHandler(e)}
                value={editedDescription}
              ></input>
              <button
                onClick={() => {
                  dispatch({ type: EDITED_FIELDS, payload: editedFields });
                  dispatch({ type: ASYNC_UPDATE_TASK });
                  setEditForm(false);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <p>{props.task.description}</p>
          )}
        </div>
        <div className="files-section">
          {props.task.files.map((link: string) => {
            return (
              <img
                src={link}
                key={link}
                width={100}
                height={100}
                alt="post picture"
              ></img>
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
        {openSubtaskCreator ? (
          <div className="subtask-input-section">
            <input
              type="text"
              placeholder="Enter subtask"
              onInput={(e) => {
                subtaskReader(e);
              }}
              value={subtask}
            ></input>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: CREATE_SUBTASK,
                  payload: {
                    taskId: taskId,
                    status: false,
                    text: subtask,
                  },
                });
                dispatch({ type: ASYNC_ADD_SUBTASK });
                dispatch({ type: ASYNC_GET_SUBTASK });
              }}
            >
              Add subtask
            </button>
          </div>
        ) : (
          <></>
        )}
        {subtaskList?.length > 0 ? (
          <ul className="subtask-list">
            <p className="subtask-title">Subtasks:</p>
            {subtaskList.map((subtask: SubtaskType, index: number) => {
              return <Subtask key={index} subtask={subtask} index={index} />;
            })}
          </ul>
        ) : (
          <></>
        )}

        <div className="more-action-section">
          <button
            className="more-action-btn"
            onClick={() => {
              setOpenSubtaskCreator(!openSubtaskCreator);
            }}
          >
            <p>Add subtasks</p>
            <img src="./svg/note-pencil.svg" alt="add subtask"></img>
          </button>
          <button
            className="more-action-btn"
            onClick={() => {
              dispatch({
                type: COMMENT_CREATOR_OPENED,
                payload: !commentCreatorOpened,
              });
            }}
          >
            <p>Comments</p>
            <img src="./svg/chat-circle-text.svg" alt="open comments"></img>
          </button>
        </div>
        {commentCreatorOpened && <CommentAdder type={"Add comment"} />}
        {subcommentCreatorOpened && <CommentAdder type={"Add reply"} />}
        {comments
          ?.filter((com: CommentType) => com.parentCommentId == null)
          ?.map((comment: CommentType) => {
            return (
              <div className="comment-section" key={comment.id + Math.random()}>
                <Comment key={comment.id} comment={comment} />
                <div className="subcomments">
                  {comments
                    ?.filter(
                      (sub: CommentType) => sub.parentCommentId == comment.id
                    )
                    .map((comment: CommentType) => (
                      <div key={comment.id + Math.random()}>
                        <Comment key={comment.id} comment={comment} />

                        <div className="subcomments">
                          {comments
                            ?.filter(
                              (sub: CommentType) =>
                                sub.parentCommentId == comment.id
                            )
                            .map((comment: CommentType) => (
                              <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
