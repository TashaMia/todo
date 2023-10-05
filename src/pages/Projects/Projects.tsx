import { useDispatch, useSelector } from "react-redux";
import Project from "./Project";
import { useEffect } from "react";
import {
  ASYNC_GET_PROJECTS,
  OPEN_PROJECT_ADDER,
} from "../../redux/reducers/projectsReducer";
import ProjectAdder from "../../ModalComponents/ProjectAdder";
import { ProjectType, StateType } from "../../types";

export default function Projects() {
  const project = useSelector((state: StateType) => state.projects.projects);
  const projectAdderOppened = useSelector(
    (state: StateType) => state.projects.projectAdderOpened
  );
  const projectsLoaded = useSelector(
    (state: StateType) => state.projects.isRouting
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
      {projectsLoaded ? (
        <ul>
          {project?.length > 0 ? (
            project?.map((project: ProjectType, index: number) => {
              return (
                <Project key={index} title={project.title} id={project.id} />
              );
            })
          ) : (
            <li> Add your first project</li>
          )}
        </ul>
      ) : (
        <span className="loader"></span>
      )}
      {projectAdderOppened && <ProjectAdder />}
    </div>
  );
}
