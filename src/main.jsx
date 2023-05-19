import React from "react";
import ReactDOM from "react-dom/client";
import Backoffice from "./pages/Backoffice";
import "./assets/index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
    <Backoffice />
  </React.StrictMode>
);
