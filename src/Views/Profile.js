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
import { Navigate } from "react-router";


/**
 * Renders profile page 
 * @returns {JSX.Element}
 */
const Profile = () => {
  const { user } = useUser();
  const { keycloak } = useKeycloak();

  if (!keycloak) {
    Navigate("/");
  }
  if (!user) {
    Navigate("/");
  }
  const [render, setRender] = useState(1);
  const handleProjectList = value => {
    setRender(value);
  };
  return (
    <>
      <SelectHeader handleProjectList={handleProjectList} />
      <div className="container">
        <ProfileHeader className="profile" style={{}} user={user} />
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
