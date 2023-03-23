import MainView from "../Components/Main/MainView";
import LoggedIn from "../Components/Renders/LoggedIn";
import Welcome from "../Components/Renders/Welcome";


import { useKeycloak } from "@react-keycloak/web";
const MainPage = () => {

  const { keycloak } = useKeycloak();

  return (
    <>
      <h1>Main</h1>

      {!keycloak.authenticated && <Welcome />}
      {keycloak.authenticated && <LoggedIn  />}

      <MainView />
    </>
  );
};

export default MainPage; 
