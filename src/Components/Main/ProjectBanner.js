import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export const ProjectBanner = (props) => {

    const navigation = useNavigate();

    const navigateToProject = (id) => {
        navigation(`/project/${id}`);

    }

    return props.array.map((project, index) => (
        <div key = {project.id} style={{display:'flex', justifyContent:'center', padding:'10px'}}>
        <Card sx={{minWidth: "80%", backgroundColor:"blue" }} >
            <CardContent>
                <Typography variant ="h5"> {project.title}</Typography>
                <Typography> {project.description}</Typography>
                <Typography> {project.gitRepositoryUrl}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={() => navigateToProject(project.id)} sx={{backgroundColor:"white"}}>View more</Button>
            </CardActions>
        </Card>
        </div>

    ));
}