// CSSを取り込む
require("../stylesheets/app");

import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./TaskList";

ReactDOM.render(
  <TaskList />,
  document.getElementById("container")
);
