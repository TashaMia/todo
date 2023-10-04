import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { projectsReducer } from "../reducers/projectsReducer";
import { tasksReducer } from "../reducers/tasksReducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../../saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
