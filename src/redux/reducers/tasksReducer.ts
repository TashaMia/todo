const defaultState = {
  tasks: [],
  taskAdderOpened: false,
  searchTaskReq: "",
  searchTask: [],
  dragTaskId: null,
  dragTaskTarget: null,
  fullTaskOpened: false,
  fullTaskOpenedId: null,
  updatedSubtaskId: null,
  updatedSubtask: [],
  createSubtask: null,
  commentCreatorOpened: false,
  subcommentCreatorOpened: false,
  subtasks: [],
  editedFields: {
    title: "",
    description: "",
  },
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
  comment: [],
  comments: [],
  subcomment: [],
  subcomments: [],
  currentCommentId: null,
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
export const FULL_TASK_OPENEDID = "FULL_TASK_OPENEDID";
export const EDIT_SUBTASK = "EDIT_SUBTASK";
export const ASYNC_EDIT_SUBTASK = "ASYNC_EDIT_SUBTASK";
export const EDITED_FIELDS = "EDITED_FIELDS";
export const ASYNC_UPDATE_TASK = "ASYNC_UPDATE_TASK";
export const CREATE_SUBTASK = "CREATE_SUBTASK";
export const ADD_SUBTASK = "ADD_SUBTASK";
export const ASYNC_ADD_SUBTASK = "ASYNC_ADD_SUBTASK";
export const GET_SUBTASK = "GET_SUBTASK";
export const ASYNC_GET_SUBTASK = "ASYNC_GET_SUBTASK";
export const WRITE_UPDATED_SUBTASK_ID = "WRITE_UPDATED_SUBTASK_ID";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const POST_COMMENT = "CREATE_COMMENT";
export const ASYNC_POST_COMMENT = "ASYNC_CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const ASYNC_GET_COMMENTS = "ASYNC_GET_COMMENTS";
export const COMMENT_CREATOR_OPENED = "COMMENT_CREATOR_OPENED";
export const SUBCOMMENT_CREATOR_OPENED = "SUBCOMMENT_CREATOR_OPENED";
export const POST_SUBCOMMENT = "CREATE_SUBCOMMENT";
export const ASYNC_POST_SUBCOMMENT = "ASYNC_CREATE_SUBCOMMENT";
export const GET_SUBCOMMENTS = "GET_SUBCOMMENTS";
export const WRITE_CURRENT_COMMENT_ID = "WRITE_CURRENT_COMMENT_ID";
export const ASYNC_GET_SUBCOMMENTS = "ASYNC_GET_SUBCOMMENTS";
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
    case EDITED_FIELDS:
      return { ...state, editedFields: action.payload };
    case FULL_TASK_OPENEDID:
      return { ...state, fullTaskOpenedId: action.payload };
    case CREATE_SUBTASK:
      return { ...state, createSubtask: action.payload };
    case ADD_SUBTASK:
      return { ...state, subtasks: state.subtasks.concat(action.payload) };
    case EDIT_SUBTASK:
      return { ...state, updatedSubtask: action.payload };
    case GET_SUBTASK:
      return { ...state, subtasks: action.payload };
    case WRITE_UPDATED_SUBTASK_ID:
      return { ...state, updatedSubtaskId: action.payload };
    case CREATE_COMMENT:
      return { ...state, comment: action.payload };
    case POST_COMMENT:
      return { ...state, comments: state.comments.concat(action.payload) };
    case GET_COMMENTS:
      return { ...state, comments: action.payload };
    case COMMENT_CREATOR_OPENED:
      return { ...state, commentCreatorOpened: action.payload };
    case SUBCOMMENT_CREATOR_OPENED:
      return { ...state, subcommentCreatorOpened: action.payload };
    case POST_SUBCOMMENT:
      return {
        ...state,
        subcomments: state.comments.concat(action.payload),
      };
    case GET_SUBCOMMENTS:
      return { ...state, subcomments: action.payload };
    case WRITE_CURRENT_COMMENT_ID:
      return { ...state, currentCommentId: action.payload };
    default:
      return state;
  }
};
