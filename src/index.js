import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext from "./Context/AppContext";
import axios from "axios";
import UserService from "./Service/userservice";
const root = ReactDOM.createRoot(document.getElementById("root"));

const _axios = axios.create();
_axios.interceptors.request.use(config => {
  if (UserService.isLoggedIn()) {
    const cb = () => {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };

    return UserService.updateToken(cb);
  }
});
setTimeout(() => {
  root.render(
    <React.StrictMode>
      <AppContext>
        <App />
      </AppContext>
    </React.StrictMode>
  );
}, 1000);

UserService.initKeycloak(root);
