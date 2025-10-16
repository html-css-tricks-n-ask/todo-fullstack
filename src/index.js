import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import { BrowserRouter } from "react-router-dom"; // <-- import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
   <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  // </React.StrictMode>
);
