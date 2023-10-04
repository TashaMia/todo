import { useSelector } from "react-redux";
import TaskAdder from "./ModalComponents/TaskAdder";
import Projects from "./pages/Projects/Projects";
import ProjectAdder from "./ModalComponents/ProjectAdder";
import { Outlet, useNavigate } from "react-router-dom";
function App() {
  const taskAdder = useSelector(
    (state: { tasks: any }) => state.tasks.taskAdderOpened
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
