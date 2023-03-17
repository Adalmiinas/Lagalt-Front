import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { addUserToProject, fetchProjectById } from "../../Service/ProjectInfos";

const ProjectPage = ({id}) => {

    const [project, setProject] = useState([]);
    const [motivation, setMotivation] = useState("");
    const {user} = useUser(); 
    const owner = false;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getProjectInfo(id);
    },[id]);

    const getProjectInfo = async (id) => {
        const [error, fetchedProject] = await fetchProjectById(id);
        setProject(fetchedProject);
    }
  
    const applyProject = async () => {
        console.log(motivation);
        const [error, data] = await addUserToProject(project.id, user.id, motivation);
        setOpen(false);
        console.log(error);
        console.log(data);
    }

    const handleTextFieldChange = event => {
        setMotivation(event.target.value); 
    }

    return (
        <>  
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>Git url: {project.gitRepositoryUrl}</p>
            <p>User in project: {}</p>
            <p>Industry: {}</p>
            <p>Tags: {}</p>
            <Button onClick={handleOpen}>Apply for project</Button>
            <Modal
            open = {open}
            onClose = {handleClose}
            >
                <Box sx={{position:'absolute', display: 'flex', flexDirection:'column', top: "30%", left:"30%", width:400, bgcolor:'background.paper', border:'2px solid #000', p:4, boxShadow:24 }}>
                    <h3>Write a sort motivation letter about why you want to join the project</h3>
                    <TextField 
                    label="motivation"
                    multiline
                    minRows={6}
                    value={motivation} 
                    onChange={handleTextFieldChange}/>
                    <Button onClick={applyProject}>Send application</Button>
                </Box>

            </Modal>
        </>
    )
}

export default ProjectPage;