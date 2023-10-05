const defaultState = {
  projects: [],
  projectAdderOpened: false,
  projectName: "",
  projectId: null,
  isRouting: false,
};
export const GET_PROJECTS = "GET_PROJECTS";
export const GET_PROJECT_NAME_FROM_INPUT = "GET_PROJECT_NAME_FROM_INPUT";
export const ADD_PROJECT = "ADD_PROJECT";
export const ASYNC_GET_PROJECTS = "ASYNC_GET_PROJECTS";
export const ASYNC_ADD_PROJECTS = "ASYNC_ADD_PROJECTS";
export const OPEN_PROJECT_ADDER = "OPEN_PROJECT_ADDER";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const ASYNC_GET_CHENGED_PROJECTS = "ASYNC_GET_CHENGED_PROJECTS";
export const ASYNC_DELETE_PROJECT = "ASYNC_DELETE_PROJECT";
export const PROJECT_ID = "PROJECT_ID";
export const IS_ROUTING_CHECK = "IS_ROUTING_CHECK";
export const projectsReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, projects: action.payload };
    case GET_PROJECT_NAME_FROM_INPUT:
      return { ...state, projectName: action.payload };
    case ADD_PROJECT:
      return { ...state, projects: state.projects.concat(action.payload) };
    case OPEN_PROJECT_ADDER:
      return { ...state, projectAdderOpened: action.payload };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project: any) => project.id !== action.payload
        ),
      };
    case IS_ROUTING_CHECK:
      return { ...state, isRouting: action.payload };
    case PROJECT_ID:
      return { ...state, projectId: action.payload };
    default:
      return state;
  }
};
