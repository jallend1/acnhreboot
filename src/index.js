import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ItemContextProvider from "./contexts/ItemContext";

ReactDOM.render(
  <React.StrictMode>
    <ItemContextProvider>
      <App />
    </ItemContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
