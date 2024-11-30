import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router";
import App from "./App";

// ...existing code...

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
