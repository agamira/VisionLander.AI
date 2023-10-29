import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/sass/main.scss";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
