import TaskList from "./components/logic/TaskList";
import "./styles/App.css";
import ReactLogo from "./assets/react.svg";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src={ReactLogo} alt="React Logo" className="react-logo" />
        <h1>Kanban Task Board</h1>
      </header>
      <TaskList />
    </div>
  );
}

export default App;
