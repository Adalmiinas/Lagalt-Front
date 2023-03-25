import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { deleteUserFromProject } from "../../Service/ProjectInfos";
import { useUser } from "../../Context/UserContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const WaitList = props => {
  const { user } = useUser();

  const deleteUser = async (projectId, userId) => {
    window.confirm("Are you sure you want to remove user from project ?")
    const [error, response] = await deleteUserFromProject(user.id, projectId, userId);
    props.loading(true);

    console.log(projectId,userId, user.id);
    if(error !== null){
      window.alert("Error, while trying to delete user.")
    }
    else {
      window.alert("User deleted successfully.")
    }
  };

  return props.project.projectUsers.map(user => (
      <div
        key={user.id}
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
          
          <CardContent sx={{display:"flex"}}>
            <Typography variant="h5"> {user.userName}</Typography>

            {user != null && user.isOwner === true &&
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
            }
          </CardContent>

          {user.isOwner === false &&
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => deleteUser(props.project.id, user.userId)}
              variant="contained"
              color="darkViolet"
              sx={{
                borderRadius: "12px"
              }}
            >
              Delete
            </Button>
          </CardActions>
          }
        </Card>
      </div>
    ));
};

export default WaitList;
