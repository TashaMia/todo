import { put, select, takeEvery } from "redux-saga/effects";
import { supabase } from "../supabase";

import {
  ADD_SUBTASK,
  ADD_TASK,
  ASYNC_ADD_SUBTASK,
  ASYNC_ADD_TASK,
  ASYNC_EDIT_SUBTASK,
  ASYNC_GET_COMMENTS,
  ASYNC_GET_SUBCOMMENTS,
  ASYNC_GET_SUBTASK,
  ASYNC_GET_TASKS,
  ASYNC_POST_COMMENT,
  ASYNC_POST_SUBCOMMENT,
  ASYNC_SEARCH_TASK,
  ASYNC_UPDATE_TASK,
  ASYNC_UPDATE_TASK_SECTION,
  GET_COMMENTS,
  GET_SEARCH_TASKS,
  GET_SUBCOMMENTS,
  GET_SUBTASK,
  GET_TASKS,
  POST_COMMENT,
  POST_SUBCOMMENT,
  UPDATE_TASK_SECTION,
} from "../redux/reducers/tasksReducer";
import { CommentType, SubtaskType, TaskType } from "../types";

async function getTasks(filter: number) {
  const { data } = await supabase
    .from("tasks")
    .select()
    .eq("projectIndex", filter);
  return data;
}
async function createSubtask(subtask: SubtaskType) {
  if (subtask.text.length == 0) return;
  const { data, error } = await supabase
    .from("subtasks")
    .insert([subtask])
    .select();
  return data;
}
function* createSubtaskWorker() {
  const subtask: SubtaskType = yield select(
    (state) => state.tasks.createSubtask
  );
  const data: { value: SubtaskType } = yield createSubtask(subtask);
  yield put({ type: ADD_SUBTASK, payload: data });
}

async function getSubtasks(filter: number) {
  const { data } = await supabase
    .from("subtasks")
    .select()
    .eq("taskId", filter);
  return data;
}
function* getSubtaskWorker() {
  const filter: number = yield select((state) => state.tasks.fullTaskOpenedId);
  const data: { value: SubtaskType[] } = yield getSubtasks(filter);
  yield put({ type: GET_SUBTASK, payload: data });
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

async function updateTask(id: number, newData: object) {
  const { data, error } = await supabase
    .from("tasks")
    .update([newData])
    .eq("id", id)
    .select();
  return data;
}
async function updateSubtask(id: number, status: boolean) {
  const { data, error } = await supabase
    .from("subtasks")
    .update({ status: !status })
    .eq("id", id)
    .select();
  return data;
}

function* updateSubtaskWorker() {
  const id: number = yield select((state) => state.tasks.updatedSubtaskId);
  const subtask: SubtaskType[] = yield select((state) => state.tasks.subtasks);
  const filteredSubtask: SubtaskType[] = yield subtask.filter(
    (item) => item.id == id
  );
  const status: boolean = filteredSubtask[0].status;

  const data: [] = yield updateSubtask(id, status);
  const oldData: [] = yield select((state) => state.tasks.subtasks);
  const updatedTasks = [
    ...oldData.filter((task: { id: number }) => task.id != id),
    ...data,
  ];
  yield put({ type: GET_SUBTASK, payload: updatedTasks });
}
function* updateTaskWorker() {
  const newData: object = yield select((state) => state.tasks.editedFields);
  const id: number = yield select((state) => state.tasks.fullTaskOpenedId);

  const data: [] = yield updateTask(id, newData);
  const oldData: [] = yield select((state) => state.tasks.tasks);

  const updatedTasks = [
    ...oldData.filter((task: { id: number }) => task.id != id),
    ...data,
  ];
  yield put({ type: GET_TASKS, payload: updatedTasks });
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
  const data: { value: TaskType[] } = yield searchTasks(searchFilter);

  yield put({ type: GET_SEARCH_TASKS, payload: data });
}

function* getTasksWorker() {
  const filter: number = yield select((state) => state.projects.projectId);
  const data: { value: TaskType[] } = yield getTasks(filter);

  yield put({ type: GET_TASKS, payload: data });
}

export function* tasksWatcher() {
  yield takeEvery(ASYNC_GET_TASKS, getTasksWorker);
}

async function addTask(task: TaskType) {
  if (task.title.length == 0) return;
  const { data, error } = await supabase.from("tasks").insert([task]).select();
  return data;
}
function* addTaskWorker() {
  const task: TaskType = yield select((state) => state.tasks.task);
  const data: { value: TaskType } = yield addTask(task);
  yield put({ type: ADD_TASK, payload: data });
}

export function* addTaskWatcher() {
  yield takeEvery(ASYNC_ADD_TASK, addTaskWorker);
}

async function addComment(comment: CommentType[]) {
  if (comment.length == 0) return;
  const { data, error } = await supabase
    .from("comments")
    .insert([comment])
    .select();
  return data;
}
function* addCommentWorker() {
  const comment: CommentType[] = yield select((state) => state.tasks.comment);

  const data: CommentType = yield addComment(comment);

  yield put({ type: POST_COMMENT, payload: data });
}

function* addSubcommentWorker() {
  const comment: CommentType[] = yield select((state) => state.tasks.comment);
  const data: CommentType = yield addComment(comment);
  yield put({ type: POST_SUBCOMMENT, payload: data });
}

export function* addSubcommentWatcher() {
  yield takeEvery(ASYNC_POST_SUBCOMMENT, addSubcommentWorker);
}
export function* addCommentWatcher() {
  yield takeEvery(ASYNC_POST_COMMENT, addCommentWorker);
}

async function getComments(filter: number) {
  const { data } = await supabase
    .from("comments")
    .select()
    .eq("taskIndex", filter);
  return data;
}
function* getCommentsWorker() {
  const filter: number = yield select((state) => state.tasks.fullTaskOpenedId);
  const data: CommentType[] = yield getComments(filter);
  yield put({ type: GET_COMMENTS, payload: data });
}

export function* getCommentsWatcher() {
  yield takeEvery(ASYNC_GET_COMMENTS, getCommentsWorker);
}
async function getSubomments(filter: number) {
  if (filter == null) {
    return;
  }
  const { data } = await supabase
    .from("comments")
    .select()
    .eq("parentCommentId", filter);
  return data;
}
function* getSubcommentsWorker() {
  const filter: number = yield select((state) => state.tasks.currentCommentId);
  const data: CommentType[] = yield getSubomments(filter);
  yield put({ type: GET_SUBCOMMENTS, payload: data });
}

export function* getSubcommentsWatcher() {
  yield takeEvery(ASYNC_GET_SUBCOMMENTS, getSubcommentsWorker);
}

export function* searchTaskWatcher() {
  yield takeEvery(ASYNC_SEARCH_TASK, searchTasksWorker);
}

export function* updateTaskSectioWatcher() {
  yield takeEvery(ASYNC_UPDATE_TASK_SECTION, updateTaskSectionWorker);
}

export function* updateTaskWatcher() {
  yield takeEvery(ASYNC_UPDATE_TASK, updateTaskWorker);
}

export function* updateSubtaskWatcher() {
  yield takeEvery(ASYNC_EDIT_SUBTASK, updateSubtaskWorker);
}
export function* createSubtaskWatcher() {
  yield takeEvery(ASYNC_ADD_SUBTASK, createSubtaskWorker);
}

export function* getSubtaskWatcher() {
  yield takeEvery(ASYNC_GET_SUBTASK, getSubtaskWorker);
}
