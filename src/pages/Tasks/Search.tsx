import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ASYNC_SEARCH_TASK,
  WRITE_SEARCH_TASK,
} from "../../redux/reducers/tasksReducer";
import Task from "./Task";

export default function Search() {
  const [search, setSearch] = useState("");
  function inputHandler(e: any) {
    setSearch(e.currentTarget.value);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WRITE_SEARCH_TASK, payload: search });
    dispatch({ type: ASYNC_SEARCH_TASK });
  }, [search]);

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Enter search request"
        value={search}
        onInput={(e) => {
          inputHandler(e);
        }}
      ></input>
    </div>
  );
}
