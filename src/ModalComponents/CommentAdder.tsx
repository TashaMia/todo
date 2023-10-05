import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ASYNC_GET_COMMENTS,
  ASYNC_GET_SUBCOMMENTS,
  ASYNC_POST_COMMENT,
  ASYNC_POST_SUBCOMMENT,
  CREATE_COMMENT,
} from "../redux/reducers/tasksReducer";
import { StateType } from "../types";

export default function CommentAdder(props: { type: string }) {
  const [comment, setComment] = useState("");
  function commentReader(e: React.FormEvent<HTMLInputElement>) {
    if (setComment.length < 1) {
      return;
    }
    setComment(e.currentTarget.value);
  }
  const taskId = useSelector(
    (state: StateType) => state.tasks.fullTaskOpenedId
  );
  const parentCommentId = useSelector(
    (state: StateType) => state.tasks.currentCommentId
  );
  const dispatch = useDispatch();
  const [getComment, setGetComment] = useState(false);
  useEffect(() => {
    dispatch({ type: ASYNC_GET_COMMENTS });
    setGetComment(false);
  }, [getComment]);
  return (
    <div>
      <div className="comment-input-section">
        <input
          id="comment-input"
          type="text"
          placeholder="Enter comment"
          onInput={(e) => {
            commentReader(e);
          }}
          value={comment}
        ></input>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (props.type == "Add comment") {
              dispatch({
                type: CREATE_COMMENT,
                payload: {
                  taskIndex: taskId,
                  comment: comment,
                },
              });

              dispatch({ type: ASYNC_POST_COMMENT });
              setGetComment(true);
            }
            if (props.type == "Add reply") {
              dispatch({
                type: CREATE_COMMENT,
                payload: {
                  taskIndex: taskId,
                  parentCommentId: parentCommentId,
                  comment: comment,
                },
              });
              dispatch({ type: ASYNC_POST_SUBCOMMENT });
              dispatch({ type: ASYNC_GET_SUBCOMMENTS });
              setGetComment(true);
            }
          }}
        >
          {props.type}
        </button>
      </div>
    </div>
  );
}
