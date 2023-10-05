import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ASYNC_EDIT_SUBTASK,
  EDIT_SUBTASK,
  WRITE_UPDATED_SUBTASK_ID,
} from "../redux/reducers/tasksReducer";
import { SubtaskType } from "../types";

export default function Subtask(props: {
  subtask: SubtaskType;
  index: number;
}) {
  const [subTaskDone, setSubTaskDone] = useState(false);
  const dispatch = useDispatch();
  return (
    <li>
      <div
        className="check-list"
        onClick={() => {
          setSubTaskDone(!subTaskDone);
          dispatch({
            type: WRITE_UPDATED_SUBTASK_ID,
            payload: props.subtask.id,
          });
          dispatch({ type: ASYNC_EDIT_SUBTASK });
        }}
      >
        {subTaskDone || props.subtask.status == true ? (
          <img src="./svg/check.svg" alt="check" width={8} height={8}></img>
        ) : (
          <></>
        )}
      </div>
      {props.subtask.text}
    </li>
  );
}
