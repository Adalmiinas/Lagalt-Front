import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAdminProjects } from "../../Service/ProjectInfos";

const AdminProjects = (props) => {

    const navigation = useNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const navigateToProject = (id) => {
        navigation(`/project/${id}`);

    };

    const getProjects =  async () => {
        const [error, userProject] = await getAdminProjects(props.id);
        if (error != null){
            return "";
        }
        else {
            console.log(userProject);
            setProjects(userProject);
        }
    }

    return projects.map((project, index) => (
        <div key = {project.id} style={{display:'flex', justifyContent:'center', padding:'10px'}}>
        <Card sx={{minWidth: "80%", backgroundColor:"blue" }} >
            <CardContent>
                <Typography variant ="h5"> {project.project.title}</Typography>
                <Typography> {project.project.description}</Typography>
                <Typography> {project.gitRepositoryUrl}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={() => navigateToProject(project.id)} sx={{backgroundColor:"white"}}>View more</Button>
            </CardActions>
        </Card>
        </div>

    ));
}

export default AdminProjects;