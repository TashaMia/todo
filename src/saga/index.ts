import { all } from "redux-saga/effects";
import {
  addProjectWatcher,
  deleteProjectsWotcher,
  projectWatcher,
} from "./projectsSaga";
import {
  addCommentWatcher,
  addSubcommentWatcher,
  addTaskWatcher,
  createSubtaskWatcher,
  getCommentsWatcher,
  getSubcommentsWatcher,
  getSubtaskWatcher,
  searchTaskWatcher,
  tasksWatcher,
  updateSubtaskWatcher,
  updateTaskSectioWatcher,
  updateTaskWatcher,
} from "./tasksSaga";

export function* rootSaga() {
  yield all([
    tasksWatcher(),
    projectWatcher(),
    addProjectWatcher(),
    addTaskWatcher(),
    deleteProjectsWotcher(),
    searchTaskWatcher(),
    updateTaskSectioWatcher(),
    updateTaskWatcher(),
    updateSubtaskWatcher(),
    createSubtaskWatcher(),
    getSubtaskWatcher(),
    addCommentWatcher(),
    getCommentsWatcher(),
    addSubcommentWatcher(),
    getSubcommentsWatcher(),
  ]);
}
