import { Box, Button, Card, CardActions, CardContent, Modal, TextField, Typography } from "@mui/material";
import { typography } from "@mui/system";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { acceptUserToProject } from "../../Service/ProjectInfos";

const WaitList =  (props) => {

    const {user} = useUser();

    const addUserToProject = (projectId, userId, pending) => {
        console.log(userId);
        console.log(pending);
        console.log(projectId);
        acceptUserToProject(user.id, projectId, userId, pending);
    }

    return props.project.waitList.userWaitingLists.map((projectUsers) => (
        <div key = {projectUsers.id} style={{display:'flex', justifyContent:'center', padding:'10px'}}>
        <Card sx={{minWidth: "80%", backgroundColor:"blue" }} >
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