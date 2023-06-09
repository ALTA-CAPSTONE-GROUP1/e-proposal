import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/routes";
import "@/styles/index.css";
import "regenerator-runtime/runtime";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
