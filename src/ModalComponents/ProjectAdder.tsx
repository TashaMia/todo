import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ASYNC_ADD_PROJECTS,
  ASYNC_GET_CHENGED_PROJECTS,
  ASYNC_GET_PROJECTS,
  GET_PROJECT_NAME_FROM_INPUT,
  OPEN_PROJECT_ADDER,
} from "../redux/reducers/projectsReducer";

export default function ProjectAdder() {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [attantion, setAttantion] = useState(false);
  const projectAdderOppened = useSelector(
    (state: { projects: any }) => state.projects.projectAdderOpened
  );
  function inputReader(e: React.FormEvent<HTMLInputElement>) {
    setProjectName(e.currentTarget.value);
    if (projectName.length > 0) {
      setAttantion(false);
    }
  }

  function projectNameAdder() {
    dispatch({ type: GET_PROJECT_NAME_FROM_INPUT, payload: projectName });
    setProjectName("");
  }

  return (
    <div
      className="modal-window-bg"
      onClick={(e) => {
        if (e.currentTarget.className == "modal-window-bg") {
          dispatch({ type: OPEN_PROJECT_ADDER, payload: false });
        }
      }}
    >
      <div
        className="project-adder_window"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Project</h2>
        <input
          type="text"
          placeholder="Введите название проекта"
          onInput={(e) => {
            inputReader(e);
          }}
          value={projectName}
        ></input>
        {attantion && (
          <div className="attantion">
            <p>⚠️ The project name field cannot be empty</p>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (projectName.length == 0) {
              setAttantion(true);
              return;
            }
            projectNameAdder();
            dispatch({ type: ASYNC_ADD_PROJECTS });
            dispatch({
              type: OPEN_PROJECT_ADDER,
              payload: !projectAdderOppened,
            });
          }}
        >
          ADD PROJECT
        </button>
      </div>
    </div>
  );
}
