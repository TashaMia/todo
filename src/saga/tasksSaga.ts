import { put, select, takeEvery } from "redux-saga/effects";
import { supabase } from "../supabase";

import {
  ADD_TASK,
  ASYNC_ADD_TASK,
  ASYNC_GET_TASKS,
  ASYNC_SEARCH_TASK,
  ASYNC_UPDATE_TASK_SECTION,
  GET_SEARCH_TASKS,
  GET_TASKS,
  UPDATE_TASK_SECTION,
} from "../redux/reducers/tasksReducer";

async function getTasks(filter: number) {
  const { data } = await supabase
    .from("tasks")
    .select()
    .eq("projectIndex", filter);
  return data;
}

async function searchTasks(searchFilter: string) {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .textSearch("number", searchFilter);
  if (data && data?.length < 1) {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .textSearch("title", searchFilter);
    return data;
  }
  return data;
}

async function updateTaskSection(id: number, newDate: string) {
  const { data, error } = await supabase
    .from("tasks")
    .update([{ sectionName: newDate }])
    .eq("id", id)
    .select();
  return data;
}

function* updateTaskSectionWorker() {
  const id: number = yield select((state) => state.tasks.dragTaskId);
  const newDate: string = yield select((state) => state.tasks.dragTaskTarget);
  const data: [] = yield updateTaskSection(id, newDate);
  const oldData: [] = yield select((state) => state.tasks.tasks);

  const updatedTasks = [
    ...oldData.filter((task: { id: number }) => task.id != id),
    ...data,
  ];

  yield put({ type: GET_TASKS, payload: updatedTasks });
}

function* searchTasksWorker() {
  const searchFilter: string = yield select(
    (state) => state.tasks.searchTaskReq
  );
  const data: { value: any } = yield searchTasks(searchFilter);

  yield put({ type: GET_SEARCH_TASKS, payload: data });
}

function* getTasksWorker() {
  const filter: number = yield select((state) => state.projects.projectId);
  const data: { value: any } = yield getTasks(filter);

  yield put({ type: GET_TASKS, payload: data });
}

export function* tasksWatcher() {
  yield takeEvery(ASYNC_GET_TASKS, getTasksWorker);
}

async function addTask(task: any) {
  if (task.title.length == 0) return;
  const { data, error } = await supabase.from("tasks").insert([task]).select();
  return data;
}
function* addTaskWorker() {
  const task: {} = yield select((state) => state.tasks.task);
  const data: { value: any } = yield addTask(task);
  yield put({ type: ADD_TASK, payload: data });
}

export function* addTaskWatcher() {
  yield takeEvery(ASYNC_ADD_TASK, addTaskWorker);
}

export function* searchTaskWatcher() {
  yield takeEvery(ASYNC_SEARCH_TASK, searchTasksWorker);
}

export function* updateTaskSectioWatcher() {
  yield takeEvery(ASYNC_UPDATE_TASK_SECTION, updateTaskSectionWorker);
}
