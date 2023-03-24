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
import { storageDelete, storageRead, storageSave } from "./Utils/Storage";
import { loginUser } from "./Service/UserInfo";
import { userId } from "./keycloak";
import { useUser } from "./Context/UserContext";

import UpdateForm from "./Components/Profile/UpdateForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const { keycloak } = useKeycloak();
  const [load, setLoad] = useState(0);
  const [updateBar] = useState(false);
  const { user, setUser } = useUser();

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
    const fetchdata = async () => {
      const data = await loginUser(userId(), keycloak.token);
      storageSave("logged-user", data[1]);
      setUser(storageRead("logged-user"));
    };
    
    fetchdata();
  }

  const theme = createTheme({
    palette: {
      darkViolet: {
        main: "#312B70",
        contrastText: "#fff"
      },
      darkVioletGreen: {
        main: "#312B70",
        contrastText: "#A8BA30"
      },
      violet: "#787CD1",
      BGreen: "#A8BA30"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Navbar handleLoad={handleLoad} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            {keycloak.authenticated && user && (
              <>
                <Route path="/profile/" element={<Profile />} />
                <Route path="/profile/update-profile" element={<UpdateForm />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/project/add-project" element={<AddProject />} />
                <Route path="/project/update-project" element={<UpdateProject />} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
