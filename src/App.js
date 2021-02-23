import { useState } from "react";
import { connect } from "react-redux";
import "./App.css";

import { updateTasks } from "./redux/random-task/random-task.actions";

function App({ tasks, updateTasks }) {
  const [task, setTask] = useState("");

  return (
    <div className="app">
      <form
        id="task-inp-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateTasks(task);
          document.querySelector("form").reset();
        }}
      >
        <input
          className="inp-task"
          onChange={(e) => setTask(e.target.value)}
          type="input"
        />
        <input type="submit" style={{ display: "none" }} />
      </form>

      <ol className="output-tasks">
        {tasks.map((task, idx) => (
          <li key={idx}>
            <span>{task}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.randomTasks.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (task) => dispatch(updateTasks(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
