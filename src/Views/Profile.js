import ProfileHeader from "../Components/Profile/ProfileHeader";
import { useUser } from "../Context/UserContext";
import withAuth from "../Guards/WithAuth";
const Profile = () => {

    const {user} = useUser();
    return (
        <>
            <h1>Profile</h1>
            <ProfileHeader user={user}/>
        </>
    )
}

export default withAuth(Profile); 