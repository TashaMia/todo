import { useDispatch, useSelector } from "react-redux";
import TasksSection from "./TasksSection";
import { useEffect, useRef } from "react";
import { ASYNC_GET_TASKS } from "../../redux/reducers/tasksReducer";
import Search from "./Search";
import Task from "./Task";
import { StateType, TaskType } from "../../types";

export default function Tasks() {
  const ref = useRef<null | HTMLDivElement>(null);
  const elem = ref.current;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ASYNC_GET_TASKS });
  }, []);
  const searchResult = useSelector(
    (state: StateType) => state.tasks.searchTask
  );

  return (
    <div className="tasks-common-section" ref={ref}>
      <Search />
      {searchResult.length > 0 ? (
        <div className="each-tasks-section">
          <h3 className="head">Searching results</h3>
          <div className="scroll-zone">
            {searchResult.map((res: TaskType) => {
              return <Task key={res.number + Math.random()} task={res}></Task>;
            })}
          </div>
        </div>
      ) : (
        <div className="scroll-section">
          <TasksSection sectionName={"Queue"} elem={elem} />
          <TasksSection sectionName={"Development"} elem={elem} />

          <TasksSection sectionName={"Done"} elem={elem} />
        </div>
      )}
    </div>
  );
}
