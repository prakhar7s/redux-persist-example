import { useState, useRef } from "react";
import { connect } from "react-redux";
import "./App.css";

import {
  updateTasks,
  restoreTodos,
  toggleTheme,
} from "./redux/random-task/random-task.actions";

// ICONS
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";

function App({ tasks, updateTasks, restoreTodos, darkTheme, toggleTheme }) {
  const [task, setTask] = useState("");
  const gotoTopRef = useRef();

  const body = document.body;

  const VISIBLE_GOTO_TOP_AT = 100;

  body.addEventListener("scroll", (e) => {
    if (gotoTopRef.current) {
      const visibility = getComputedStyle(gotoTopRef.current)["visibility"];
      if (body.scrollTop > VISIBLE_GOTO_TOP_AT && visibility === "hidden") {
        gotoTopRef.current.style.visibility = "visible";
      } else if (
        body.scrollTop < VISIBLE_GOTO_TOP_AT &&
        visibility === "visible"
      ) {
        gotoTopRef.current.style.visibility = "hidden";
      }
    }
  });
  const gotoTop = () => {
    body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`app${darkTheme ? " dark" : ""}`}>
      <header>
        <form
          id="task-inp-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateTasks({ task, operation: "+" });
            document.querySelector("form").reset();
            document.querySelector(".task-input").blur();

            // scroll to last
            const height = body.scrollHeight;

            body.scrollTo({
              top: height + 50,
              behavior: "smooth",
            });
          }}
        >
          <div className="inp-task">
            <input
              onChange={(e) => setTask(e.target.value)}
              type="input"
              className="task-input"
              placeholder="enter task"
            />
            <span className="add-button">
              <AddIcon />
            </span>
          </div>
          <input type="submit" style={{ display: "none" }} />
        </form>

        <button onClick={restoreTodos} className="rem-def-btn restore-btn">
          <RestoreFromTrashIcon />
        </button>
        <button
          className="rem-def-btn theme-change-button"
          onClick={toggleTheme}
        >
          {darkTheme ? <WbSunnyIcon /> : <NightsStayIcon />}
        </button>
      </header>

      <ol className="output-tasks">
        {tasks.map((task, idx) => (
          <li className="task-item" key={idx}>
            <span className="s-no">{idx + 1}.</span>
            <div className="about-task">{task}</div>
            <div
              className="delete-task-button"
              onClick={() => updateTasks({ task, operation: "-" })}
            >
              <DeleteForeverTwoToneIcon />
            </div>
          </li>
        ))}
      </ol>

      <button ref={gotoTopRef} onClick={gotoTop} className="goto-top">
        <ArrowUpwardIcon />
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.randomTasks.tasks,
  darkTheme: state.randomTasks.darkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (payload) => dispatch(updateTasks(payload)),
  restoreTodos: () => dispatch(restoreTodos()),
  toggleTheme: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
