import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Views/MainPage";
import Profile from "./Views/Profile";
import Project from "./Views/Project";
import AddProject from "./Views/AddProject";
import Navbar from "./Components/Navbar/Navbar";
import UpdateProject from "./Components/Project/UpdateProject";
import { useEffect, useState } from "react";
import LoginForm from "./Components/Login/LoginForm";
import { useKeycloak } from "@react-keycloak/web";
import { storageDelete, storageSave } from "./Utils/Storage";
import { loginUser } from "./Service/UserInfo";
import { userId } from "./keycloak";
import { useUser } from "./Context/UserContext";
function App() {
  const { keycloak } = useKeycloak();
  const [load, setLoad] = useState(0);
  const [updateBar] = useState(false);
  const { user } = useUser();

  const handleLoad = value => {
    setLoad(value);
  };
  useEffect(() => {
    if (load === 1) {
      keycloak.login();
    }
    if (load === 2) {
      storageDelete("logged-user");

      keycloak.logout();
    }
    if (load === 3) {
      keycloak.register();
    }
    setLoad(0);
  }, [load, keycloak]);
  if (keycloak.authenticated) {
    const data = loginUser(userId(), keycloak.token);
    data.then(x => storageSave("logged-user", x[1]));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar handleLoad={handleLoad} updateBar={updateBar} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {keycloak.authenticated && user && (
            <>
              <Route path={"profile/:username"} element={<Profile />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="/project/add-project" element={<AddProject />} />
              <Route path="/project/update-project" element={<UpdateProject />} />
            </>
          )}

          {!keycloak.authenticated && <Route path="/login" element={<LoginForm handleLoad={handleLoad} />} />}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
