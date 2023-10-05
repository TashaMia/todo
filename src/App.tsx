import { useSelector } from "react-redux";
import TaskAdder from "./ModalComponents/TaskAdder";
import { Outlet, useNavigate } from "react-router-dom";
import { StateType } from "./types";
function App() {
  const taskAdder = useSelector(
    (state: StateType) => state.tasks.taskAdderOpened
  );
  const navigate = useNavigate();
  return (
    <div className="main">
      <header className="header" onClick={() => navigate("/")}>
        <h1>TO DO APP</h1>
      </header>

      <Outlet />
      {taskAdder && <TaskAdder />}
    </div>
  );
}

export default App;
