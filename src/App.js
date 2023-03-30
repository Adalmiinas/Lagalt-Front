import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Views/MainPage";
import Profile from "./Views/Profile";
import Project from "./Views/Project";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { storageDelete, storageRead, storageSave } from "./Utils/Storage";
import { loginUser, registerUser } from "./Service/UserInfo";
import { email, firstName, lastName, userId, username } from "./keycloak";
import { useUser } from "./Context/UserContext";
import { debounce } from "lodash";
import UpdateForm from "./Components/Profile/UpdateForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const { keycloak } = useKeycloak();
  const [load, setLoad] = useState(0);

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

  //Keycloak login and registeration
  if (keycloak.authenticated) {
    const handleRegistration = async () => {
      const data = await registerUser(username(), firstName(), lastName(), email(), userId(), keycloak.token);
      await storageSave("logged-user", data[1].value);
      setUser(storageRead("logged-user"));
    };

    const debounceRegistration = debounce(handleRegistration, 500); //debounce reg
    const fetchdata = async () => {
      // await registerUser(username(), firstName(), lastName(), email(), userId(), keycloak.token);
      const data = await loginUser(userId(), keycloak.token);
      if (!data) {
      } else {
        console.log(data);
        await storageSave("logged-user", data[1].value);
        setUser(storageRead("logged-user"));

        console.log(user);
      }
    };
    const debouncedFetchData = debounce(fetchdata, 500); // debounce fetchdata
    if (user === null) {
      debounceRegistration();
      debouncedFetchData();
    }
  }

  //universal themes
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

            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/update-profile" element={<UpdateForm />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
