import { put, select, takeEvery } from "redux-saga/effects";
import { supabase } from "../supabase";
import {
  ADD_PROJECT,
  ASYNC_ADD_PROJECTS,
  ASYNC_DELETE_PROJECT,
  ASYNC_GET_PROJECTS,
  DELETE_PROJECT,
  GET_PROJECTS,
  IS_ROUTING_CHECK,
} from "../redux/reducers/projectsReducer";
import { ProjectType } from "../types";

async function getProjects() {
  const { data } = await supabase.from("projects").select();
  return data;
}

async function addProject(title: string) {
  if (title.length == 0) return;
  const { data, error } = await supabase
    .from("projects")
    .insert([{ title: title }])
    .select();
  return data;
}
function* addProjectWorker() {
  const title: string = yield select((state) => state.projects.projectName);
  const data: { value: ProjectType[] } = yield addProject(title);
  yield put({ type: ADD_PROJECT, payload: data });
}
function* getProjectsWorker() {
  const data: { value: ProjectType[] } = yield getProjects();
  if (data) {
    yield put({ type: IS_ROUTING_CHECK, payload: true });
  }

  yield put({ type: GET_PROJECTS, payload: data });
}

export function* projectWatcher() {
  yield takeEvery(ASYNC_GET_PROJECTS, getProjectsWorker);
}

export function* addProjectWatcher() {
  yield takeEvery(ASYNC_ADD_PROJECTS, addProjectWorker);
}

async function deleteProject(id: number) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
}

function* deleteProjectsWorker() {
  const id: number = yield select((state) => state.projects.projectId);
  yield deleteProject(id);
  yield put({ type: DELETE_PROJECT, payload: id });
}

export function* deleteProjectsWotcher() {
  yield takeEvery(ASYNC_DELETE_PROJECT, deleteProjectsWorker);
}
