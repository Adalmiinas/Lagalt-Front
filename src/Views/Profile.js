import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import AdminProjects from "../Components/Profile/AdminProjects";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import UserProjects from "../Components/Profile/UserProjects";
import { useUser } from "../Context/UserContext";
import withAuth from "../Guards/WithAuth";
const Profile = () => {
  const { user } = useUser();
  const {keycloak} = useKeycloak()
  // useEffect( () => {
  //    if(keycloak.)
  // })
  return (
    <>
      <ProfileHeader user={user} keycloak={keycloak} />
      <UserProjects id={user.id} />
      <h1> Admin projects</h1>
      <AdminProjects id={user.id} />
    </>
  );
};

export default withAuth(Profile);
