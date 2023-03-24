import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../../Context/UserContext";
import { acceptUserToProject } from "../../../Service/ProjectInfos";
import { userById } from "../../../Service/UserInfo";

const WaitList = ({projectUsers, projectId, loading}) => {
  const { user } = useUser();

  const [waitlistUser, setWaitlistUser] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const [error, fetchedUser] = await userById(projectUsers.userId);
    console.log(fetchedUser);
    console.log(error);
    setWaitlistUser(fetchedUser);
  };

  const addUserToProject = async (projectId, userId, pending) => {
    await acceptUserToProject(user.id, projectId, userId, pending);
    loading(true);
  };

  return (
    <>
      <div
        key={projectUsers.id}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Card
          sx={{
            minWidth: "80%",
            backgroundColor: "violet",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontFamily={"RBold"}>
              {" "}
              {projectUsers.username}
            </Typography>
            <Typography variant="h5" fontFamily={"RBold"}>
              {" "}
              {waitlistUser.username}
            </Typography>
            <Typography>{projectUsers.motivationLetter}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Button
              color="darkViolet"
              sx={{
                borderRadius: "10rem",
              }}
              onClick={() =>
                addUserToProject(projectId, projectUsers.userId, false)
              }
            >
              Accept
            </Button>
            <Button
              color="darkViolet"
              onClick={() =>
                addUserToProject(projectId, projectUsers.userId, null)
              }
              sx={{
                borderRadius: "10rem",
              }}
            >
              decline
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};
export default WaitList;
