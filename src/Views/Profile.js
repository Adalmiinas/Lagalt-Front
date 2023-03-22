import AdminProjects from "../Components/Profile/AdminProjects";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import UserProjects from "../Components/Profile/UserProjects";
import { useUser } from "../Context/UserContext";
import withAuth from "../Guards/WithAuth";
import UserService from "../Service/userservice";
const Profile = () => {
  const { user } = useUser();
  return (
    <>
      <ProfileHeader user={user} />
      <UserProjects id={user.id} />
      <h1> Admin projects</h1>
      <AdminProjects id={user.id} />
    </>
  );
};

export default withAuth(Profile);
