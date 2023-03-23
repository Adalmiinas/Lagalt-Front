import {Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useUser } from "../../../Context/UserContext";
import { acceptUserToProject } from "../../../Service/ProjectInfos";

const WaitList =  (props) => {

    const {user} = useUser();

    const addUserToProject = async (projectId, userId, pending) => {
        await acceptUserToProject(user.id, projectId, userId, pending);
        props.loading(true);
    }

    return props.project.waitList.userWaitingLists.map((projectUsers) => (
        <div key = {projectUsers.id} style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'10px'}}>
        <Card sx={{minWidth: "80%", backgroundColor:"blue", display: 'flex' }} >
            <CardContent>
                <Typography variant ="h5"> {projectUsers.username}</Typography>
                <Typography>Motivation letter: {projectUsers.motivationLetter}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={() => addUserToProject(props.project.id, projectUsers.userId, false)} sx={{backgroundColor:"white"}}>Accept</Button>
                <Button onClick={() => addUserToProject(props.project.id, projectUsers.userId, null)} sx={{backgroundColor:"white"}}>Decline</Button>
            </CardActions>
        </Card>
        </div>
      ));
}

export default WaitList;