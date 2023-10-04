import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ASYNC_DELETE_PROJECT,
  PROJECT_ID,
} from "../../redux/reducers/projectsReducer";

export default function Project(props: { title: string; id: number }) {
  const navigate = useNavigate();
  const id = useParams().id;
  const dispatch = useDispatch();
  return (
    <li
      className="project"
      onClick={() => {
        navigate(`/${props.id}`);
        dispatch({ type: PROJECT_ID, payload: id && +id });
      }}
    >
      {props.title}
      <div className="project-action">
        <button onClick={() => {}}>
          <img src="/svg/edit.svg" alt="edit project"></img>
        </button>
        <button
          onClick={() => {
            dispatch({ type: PROJECT_ID, payload: id });
            dispatch({ type: ASYNC_DELETE_PROJECT });
            // dispatch({ type: ASYNC_GET_PROJECTS });
          }}
        >
          <img src="/svg/trash.svg" alt="delete project"></img>
        </button>
      </div>
    </li>
  );
}
