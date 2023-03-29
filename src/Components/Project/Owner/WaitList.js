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
import Skills from "../../Main/Skills";

/**
 * Shows all the users in the projects waitinglist.
 * @param {*} projectUsers, projectId, loading
 *
 */
const WaitList = ({ projectUsers, projectId, loading }) => {
  const { user } = useUser();
  const [waitlistUser, setWaitlistUser] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  /**
   * Gets waitlist users info.
   */
  const getUserInfo = async () => {
    const [error, fetchedUser] = await userById(projectUsers.userId);
    setWaitlistUser(fetchedUser);
  };

  /**
   *
   * @param {*} projectId project id
   * @param {*} userId project owners id
   * @param {*} pending wether user is declined or accepted
   */
  const addUserToProject = async (projectId, userId, pending) => {
    window.confirm("Are you sure ?");
    const [error, response] = await acceptUserToProject(
      user.id,
      projectId,
      userId,
      pending
    );
    loading(true);

    if (error !== null) {
      window.alert("Error, while trying add user to the project.");
    } else {
      window.alert("User added successfully.");
    }
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
            minWidth: "100%",
            backgroundColor: "violet",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" fontFamily={"RBold"}>
              {" "}
              {projectUsers.username}
            </Typography>

            <Typography variant="h8">
              {" "}
              Career: {waitlistUser.careerTitle}
            </Typography>

            <Typography variant="h8"> Email: {waitlistUser.email}</Typography>

            <Typography variant="h8">
              {" "}
              Portfolio: {waitlistUser.portfolio}
            </Typography>

            <Typography variant="h8">
              {" "}
              Description: {waitlistUser.description}
            </Typography>

            {waitlistUser.Skills > 0 && (
              <div
                key={"skills"}
                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                <Skills project={waitlistUser} />
              </div>
            )}
            <Typography>Motivation: {projectUsers.motivationLetter}</Typography>
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
