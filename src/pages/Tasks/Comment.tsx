import { useDispatch, useSelector } from "react-redux";
import {
  SUBCOMMENT_CREATOR_OPENED,
  WRITE_CURRENT_COMMENT_ID,
} from "../../redux/reducers/tasksReducer";
import { CommentType, StateType } from "../../types";

export default function Comment(props: { comment: CommentType }) {
  const subcommentCreatorOpened = useSelector(
    (state: StateType) => state.tasks.subcommentCreatorOpened
  );
  const input = document.querySelector("#comment-input") as HTMLInputElement;

  const dispatch = useDispatch();
  return (
    <div className="comment-info-section">
      <div className="author-img"></div>
      <div className="comment-text-section">
        <p className="author-name">Anonymous user</p>
        <p className="comment">{props.comment.comment}</p>
        <div
          className="more-action-btn reply"
          onClick={(e) => {
            input?.focus();
            dispatch({
              type: WRITE_CURRENT_COMMENT_ID,
              payload: props.comment.id,
            });
            dispatch({
              type: SUBCOMMENT_CREATOR_OPENED,
              payload: !subcommentCreatorOpened,
            });
          }}
        >
          <p>Reply</p>
          <img src="./svg/chat-circle-text.svg" alt="reply to comment"></img>
        </div>
      </div>
    </div>
  );
}
