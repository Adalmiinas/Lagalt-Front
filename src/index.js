import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext from "./Context/AppContext";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext>
      <ReactKeycloakProvider authClient={keycloak}>
        <App />
      </ReactKeycloakProvider>
    </AppContext>
  </React.StrictMode>
);
