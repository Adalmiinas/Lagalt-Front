import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { deleteUserFromProject } from "../../Service/ProjectInfos";
import { useUser } from "../../Context/UserContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useEffect, useState } from "react";
import { userById } from "../../Service/UserInfo";
import Skills from "../Main/Skills";
import { AccountCircle } from "@mui/icons-material";
import { storageRead } from "../../Utils/Storage";

const WaitList = ({ key, project, projectUser, loading }) => {
  const { user, setUser } = useUser();
  const [userListUser, setUserlistUser] = useState([""]);

  useEffect(() => {
    getUserInfo();
    setUser(storageRead("logged-user"));
  }, []);

  const getUserInfo = async () => {
    const [error, fetchedUser] = await userById(projectUser.userId);
    console.log(fetchedUser);
    console.log(error);
    setUserlistUser(fetchedUser);
  };

  const deleteUser = async (projectId, userId) => {
    window.confirm("Are you sure you want to remove user from project ?");
    const [error, response] = await deleteUserFromProject(user.id, projectId, userId);

    loading(true);

    console.log(projectId, userId, user.id);
    if (error !== null) {
      window.alert("Error, while trying to delete user.");
    } else {
      window.alert("User deleted successfully.");
    }
  };

  return (
    <div
      key={key}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        maxWidth: "90%"
      }}
    >
      <Card
        sx={{
          minWidth: "100%",
          backgroundColor: "violet",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          {!userListUser?.photoUrl ? <AccountCircle /> : <img src={userListUser?.photoUrl} alt="user avatar" style={{ verticalAlign: "middle", width: "60px", height: "60px", borderRadius: "40%", border: "3px solid black" }} />}
          <Typography variant="h5"> {projectUser.userName}</Typography>

          {(userListUser.isPrivate === false || projectUser.isOwner === true) && project.projectUsers.filter(x => x.userId === user.id).length === 1 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h8"> Career: {userListUser.careerTitle}</Typography>

              <Typography variant="h8"> Email: {userListUser.email}</Typography>

              <Typography variant="h8"> Portfolio: {userListUser.portfolio}</Typography>

              <Typography variant="h8"> Description: {userListUser.description}</Typography>

              {userListUser.Skills > 0 && (
                <div key={"skills"} style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                  <Skills project={userListUser} />
                </div>
              )}
            </div>
          )}

          {projectUser != null && projectUser.isOwner === true && (
            <Chip
              color="darkViolet"
              padding="1rem"
              size="small"
              label="Owner"
              icon={<AdminPanelSettingsIcon />}
              sx={{
                marginLeft: "5px",
                marginTop: "5px"
              }}
            />
          )}
        </CardContent>

        {projectUser.isOwner === false && (
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => deleteUser(project.id, projectUser.userId)}
              variant="contained"
              color="darkViolet"
              sx={{
                borderRadius: "12px"
              }}
            >
              Delete
            </Button>
            {projectUser.userId === user.id && projectUser.isOwner === true && (
              <Button
                onClick={() => deleteUser(project.id, projectUser.userId)}
                variant="contained"
                color="darkViolet"
                sx={{
                  borderRadius: "12px"
                }}
              >
                Leave
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default WaitList;
