import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/sass/main.scss";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
