import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { deleteUserFromProject } from "../../Service/ProjectInfos";

const WaitList =  (props) => {

    const deleteUser = (projectId, userId) => {
        console.log(userId);
        console.log(projectId);
        deleteUserFromProject(projectId, userId);
        props.loading(true);

    }

    return props.project.projectUsers.filter(
        (x) => x.isOwner === false ).map((user) => (
        <div key = {user.id} style={{display:'flex', justifyContent:'center', padding:'10px', maxWidth: '50%'}}>
        <Card sx={{minWidth: "80%", backgroundColor:"blue", display: 'flex', justifyContent:'space-around'}} >
            <CardContent>
                <Typography variant ="h5"> {user.userName}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={() => deleteUser(props.project.id, user.userId)} sx={{backgroundColor:"white"}}>Delete</Button>
            </CardActions>
        </Card>
        </div>

      ));

}

export default WaitList;