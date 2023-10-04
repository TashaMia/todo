import { useDispatch, useSelector } from "react-redux";
import Project from "./Project";
import { useEffect } from "react";
import {
  ASYNC_GET_PROJECTS,
  OPEN_PROJECT_ADDER,
} from "../../redux/reducers/projectsReducer";
import { ASYNC_GET_TASKS } from "../../redux/reducers/tasksReducer";
import ProjectAdder from "../../ModalComponents/ProjectAdder";

export default function Projects() {
  const project = useSelector(
    (state: { projects: any }) => state.projects.projects
  );
  const projectAdderOppened = useSelector(
    (state: { projects: any }) => state.projects.projectAdderOpened
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ASYNC_GET_PROJECTS });
  }, []);

  return (
    <div className="projects">
      <button
        className="add-project-btn"
        onClick={() =>
          dispatch({ type: OPEN_PROJECT_ADDER, payload: !projectAdderOppened })
        }
      >
        Add project
      </button>
      <ul>
        {project.length > 0 ? (
          project.map((project: any, index: number) => {
            return (
              <Project key={index} title={project.title} id={project.id} />
            );
          })
        ) : (
          <li> проектов нет</li>
        )}
      </ul>
      {projectAdderOppened && <ProjectAdder />}
    </div>
  );
}
