import { Box, Button, Card, CardActions, CardContent, Modal, TextField, Typography } from "@mui/material";
import { typography } from "@mui/system";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { deleteUserFromProject } from "../../Service/ProjectInfos";

const WaitList =  (props) => {

    const deleteUser = (projectId, userId) => {
        console.log(userId);
        console.log(projectId);
        deleteUserFromProject(projectId, userId);
    }

    return props.project.projectUsers.filter(
        (x) => x.isOwner === false ).map((user) => (
        <div key = {user.id} style={{display:'flex', justifyContent:'center', padding:'10px'}}>
        <Card sx={{minWidth: "80%", backgroundColor:"blue" }} >
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