import React from "react";
import ReactDOM from "react-dom";
import Application from "../components/Application";
import { BrowserRouter as Router } from "react-router-dom";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Application />
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});
