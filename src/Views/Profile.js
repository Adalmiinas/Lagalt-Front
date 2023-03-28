import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import AdminProjects from "../Components/Profile/AdminProjects";
import HistoryView from "../Components/Profile/HistoryView";
import ProfileHeader from "../Components/Profile/ProfileHeader";

import SelectHeader from "../Components/Profile/Select";
import UserProjects from "../Components/Profile/UserProjects";
import { useUser } from "../Context/UserContext";
import withAuth from "../Guards/WithAuth";
import "../../src/index.css";

const Profile = () => {
  const { user } = useUser();
  const { keycloak } = useKeycloak();

  if (keycloak) {
    keycloak.onReady(function () {
      if (keycloak.authenticated) {
        // Perform authenticated actions here
      } else {
        keycloak.login();
      }
    });
  }
  if (!keycloak.authenticated) {
    keycloak.updateToken(5);
  }
  const [render, setRender] = useState(1);
  const handleProjectList = value => {
    setRender(value);
  };
  return (
    <>
      <SelectHeader handleProjectList={handleProjectList} />
      <div className="container">
        <ProfileHeader className="profile" style={{}} user={user} keycloak={keycloak} />
        <div className="project">
          {render === 1 && <AdminProjects id={user.id} />}
          {render === 2 && <UserProjects id={user.id} />}
          {render === 3 && <HistoryView id={user.id} />}
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
