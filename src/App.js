import { useState } from "react";
import { connect } from "react-redux";
import "./App.css";

import {
  updateTasks,
  toggleTheme,
} from "./redux/random-task/random-task.actions";

// ICONS
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function App({ tasks, updateTasks, darkTheme, toggleTheme }) {
  const [task, setTask] = useState("");

  return (
    <div className={`app${darkTheme ? " dark" : ""}`}>
      <header>
        <form
          id="task-inp-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateTasks(task);
            document.querySelector("form").reset();
          }}
        >
          <div className="inp-task">
            <input
              onChange={(e) => setTask(e.target.value)}
              type="input"
              placeholder="enter task"
            />
            <span className="add-button">
              <ChevronRightIcon />
            </span>
          </div>
          <input type="submit" style={{ display: "none" }} />
        </form>
        <button className="theme-change-button" onClick={toggleTheme}>
          {darkTheme ? <WbSunnyIcon /> : <NightsStayIcon />}
        </button>
      </header>

      <ol className="output-tasks">
        {tasks.map((task, idx) => (
          <li className="task-item" key={idx}>
            <span className="s-no">{idx + 1}.</span>
            <div className="about-task">{task}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.randomTasks.tasks,
  darkTheme: state.randomTasks.darkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (task) => dispatch(updateTasks(task)),
  toggleTheme: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
