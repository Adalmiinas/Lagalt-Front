import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppContext from "./Context/AppContext";
import axios from "axios";
import UserService from "./Service/userservice";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
);
UserService.initKeycloak();
// {}UserService.initKeycloak &&  )

// const token = () => {
//   const result = UserService.doLogin();
//   console.log(result);
// };
// token();
// const token = document.cookie
//   .split(";")
//   .find(row => row.startsWith("KEYCLOAK_SESSION_LEGACY"))
//   .split("=")[1];

// Set the token to local storage

// localStorage.setItem("token", x);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
