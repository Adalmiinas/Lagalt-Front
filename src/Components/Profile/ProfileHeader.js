import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import UpdateForm from "./UpdateForm";
import { useUser } from "../../Context/UserContext";
import { useKeycloak } from "@react-keycloak/web";
const ProfileHeader = ({ user }) => {
  const { keycloak } = useKeycloak();
  return (
    <>
      {user && keycloak.authenticated ? (
        <div style={{ display: "flex", justifyContent: "right", padding: "10px" }}>
          <Card sx={{ minWidth: "300px", backgroundColor: "blue" }}>
            <CardContent>
              <h1>Hello {user.username} !</h1>
              <Typography sx={{ fontWeight: "bold" }}> Career: {user.careerTitle}</Typography>
              <Typography sx={{ fontWeight: "bold" }}> Description: {user.description}</Typography>
              <Typography sx={{ fontWeight: "bold" }}> Email: {user.email}</Typography>
              <Typography sx={{ fontWeight: "bold" }}> Portfolio: {user.portfolio}</Typography>
              <Typography sx={{ fontWeight: "bold" }}> Skills: {user.skills}</Typography>
            </CardContent>
            <Button LinkComponent={Link} to="/profile/update-profile">
              Update profile
            </Button>
          </Card>
        </div>
      ) : (
        <h1>EMPTY</h1>
      )}
    </>
  );
};

export default ProfileHeader;
