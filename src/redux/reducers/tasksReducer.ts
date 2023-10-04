import exp from "constants";

const defaultState = {
  tasks: [],
  taskAdderOpened: false,
  searchTaskReq: "",
  searchTask: [],
  dragTaskId: null,
  dragTaskTarget: null,
  fullTaskOpened: false,
  task: {
    number: "",
    title: "",
    endDate: null,
    priority: "",
    sectionName: "",
    projectIndex: 0,
    files: [],
    subtask: null,
    created: null,
  },
};
export const GET_TASKS = "GET_TASKS";
export const ASYNC_GET_TASKS = "ASYNC_GET_TASKS";
export const OPEN_TASK_ADDER = "OPEN_TASK_ADDER";
export const WRITE_TASK_SECTION = "WRITE_TASK_SECTION";
export const WRITE_TASK_NUMBER = "WRITE_TASK_NUMBER";
export const WRITE_DRAG_ID = "WRITE_DRAG_ID";
export const WRITE_TASK_TARGET = "WRITE_TASK_TARGET";
export const WRITE_TASK_TITLE_PRIORITY_AND_DESCTRIPTION =
  "WRITE_TASK_TITLE_PRIORITY_AND_DESCTRIPTION";
export const WRITE_TASK_IMG_ARRAY = "WRITE_TASK_IMG_ARRAY";
export const ADD_TASK = "ADD_TASK";
export const ASYNC_ADD_TASK = "ASYNC_ADD_TASK";
export const WRITE_TASK_TIME = "WRITE_TASK_TIME";
export const WRITE_SEARCH_TASK = "WRITE_SEARCH_TASK";
export const ASYNC_SEARCH_TASK = "ASYNC_SEARCH_TASK";
export const GET_SEARCH_TASKS = "GET_SEARCH_TASKS";
export const ASYNC_UPDATE_TASK_SECTION = "ASYNC_UPDATE_TASK_SECTION";
export const UPDATE_TASK_SECTION = "UPDATE_TASK_SECTION";
export const FULL_TASK_OPENED = "FULL_TASK_OPENED";
export const tasksReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case OPEN_TASK_ADDER:
      return { ...state, taskAdderOpened: action.payload };
    case WRITE_TASK_SECTION:
      return Object.assign({}, state, {
        task: { ...state.task, sectionName: action.payload },
      });
    case WRITE_TASK_NUMBER:
      return Object.assign({}, state, {
        task: { ...state.task, number: action.payload },
      });
    case WRITE_TASK_TITLE_PRIORITY_AND_DESCTRIPTION:
      return Object.assign({}, state, {
        task: { ...state.task, ...action.payload },
      });
    case ADD_TASK:
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case WRITE_TASK_IMG_ARRAY:
      return Object.assign({}, state, {
        task: { ...state.task, files: action.payload },
      });
    case WRITE_TASK_TIME:
      return Object.assign({}, state, {
        task: { ...state.task, created: action.payload },
      });
    case WRITE_SEARCH_TASK:
      return { ...state, searchTaskReq: action.payload };
    case GET_SEARCH_TASKS:
      return { ...state, searchTask: action.payload };
    case WRITE_DRAG_ID: {
      return { ...state, dragTaskId: action.payload };
    }
    case WRITE_TASK_TARGET:
      return { ...state, dragTaskTarget: action.payload };
    case FULL_TASK_OPENED:
      return { ...state, fullTaskOpened: action.payload };

    default:
      return state;
  }
};
