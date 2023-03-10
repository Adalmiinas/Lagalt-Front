import ProfileHeader from "../Components/Profile/ProfileHeader";
import { useUser } from "../Context/UserContext";
const Profile = () => {

    const {user} = useUser();
    return (
        <>
            <h1>Profile</h1>
            <ProfileHeader user={user}/>
        </>
    )
}

export default Profile; 