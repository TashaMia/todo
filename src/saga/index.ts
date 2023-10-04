import { all } from "redux-saga/effects";
import {
  addProjectWatcher,
  deleteProjectsWotcher,
  projectWatcher,
} from "./projectsSaga";
import {
  addTaskWatcher,
  searchTaskWatcher,
  tasksWatcher,
  updateTaskSectioWatcher,
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
  ]);
}
