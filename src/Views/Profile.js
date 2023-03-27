import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import AdminProjects from "../Components/Profile/AdminProjects";
import HistoryView from "../Components/Profile/HistoryView";
import ProfileHeader from "../Components/Profile/ProfileHeader";

import SelectHeader from "../Components/Profile/Select";
import StartingFillerPage from "../Components/Profile/StartingFillerPage";
import UserProjects from "../Components/Profile/UserProjects";
import { useUser } from "../Context/UserContext";
import withAuth from "../Guards/WithAuth";
import "../../src/index.css";

const Profile = () => {
  const { user } = useUser();
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    keycloak
      .updateToken(5)
      .then(function (refreshed) {
        if (refreshed) {
          alert("Token was successfully refreshed");
        } else {
          alert("Token is still valid");
        }
      })
      .catch(function () {
        alert("Failed to refresh the token, or the session has expired");
      });
  }
  const [render, setRender] = useState(0);
  const handleProjectList = value => {
    setRender(value);
  };
  return (
    <>
      <SelectHeader handleProjectList={handleProjectList} />
      <div className="container">
        <ProfileHeader className="profile" style={{}} user={user} keycloak={keycloak} />
        <div className="project">
          {render === 0 && <StartingFillerPage />}
          {render === 1 && <AdminProjects id={user.id} />}
          {render === 2 && <UserProjects id={user.id} />}
          {render === 3 && <HistoryView id={user.id} />}
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
