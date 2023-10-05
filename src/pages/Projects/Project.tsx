import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PROJECT_ID } from "../../redux/reducers/projectsReducer";

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
    </li>
  );
}
