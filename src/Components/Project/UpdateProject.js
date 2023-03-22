import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SkillsInput, { returnedListSkills } from "./SkillsInput"
import TagsInput, { returnedList } from "./TagsInput"
import { useUser } from "../../Context/UserContext";
import { updateProject } from "../../Service/ProjectInfos"
import { storageRead, storageSave } from "../../Utils/Storage"
import { fetchProjects } from "../../Service/ProjectInfos";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys"

const UpdateProject = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useUser();
    
    const projectToUpdateId = location.state.projectId
    const [apiError, setApiError] = useState(null);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [projectGitUrl, setProjectGitUrl] = useState("")
    const [projectImageUrl, setProjectImageUrl] = useState("")
    const [industry, setIndustry] = useState("")

    const handleCancelButtonOnClick = () => {
        navigate("/profile")
    }
    
    console.log(projectToUpdateId)

    const checkKeyDown = (e) => {
        if (e.key === "Enter") e.preventDefault();
    };

    const projectSuccessfullyUpdatedAlert = () => {
        alert("Project successfully updated!");
    };

    const getUpdatedProjectList = async () => {
        const sessionProjects = storageRead(STORAGE_KEY_PROJECTS);

        if(sessionProjects !== null){
            const [error, fetchedProjects] = await fetchProjects();
            if(error != null){
                return;
            }
            else{
                storageSave(STORAGE_KEY_PROJECTS, fetchedProjects);
               
            }
        }
        else {
            
        }
    }

    const handleSubmitClick = async () => {
        console.log(projectGitUrl)

        const tags = returnedList()
        const skills = returnedListSkills()

        const [error, userResponse] = await updateProject(
          user.id,
          projectToUpdateId,
          title,
          description,
          projectGitUrl,
          projectImageUrl,
          industry,
          tags,
          skills
        );
    
        if (error !== null) {
          setApiError(error);
        }
        getUpdatedProjectList()
        navigate("/profile")
        projectSuccessfullyUpdatedAlert();

    }

    return (
        <>
        <h2>
            Update project information
        </h2>
        <TextField
            required
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
        />
        <p></p>
        <TextField
            required
            label="Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)}
        />
        <p></p>
        <TextField
            label="Git Repository(URL)"
            value={projectGitUrl}
            onChange={e => setProjectGitUrl(e.target.value)}
        />
        <p></p>
        <TextField
            label="Project Image(URL)"
            value={projectImageUrl}
            onChange={e => setProjectImageUrl(e.target.value)}
        />
        <p></p>
        <TextField
            label="Industry"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
        />
        <p></p>
        <TagsInput/>
        <SkillsInput/>
        <Button onClick={handleSubmitClick} variant="contained" onKeyDown={checkKeyDown}>
            Update
        </Button>
        <Button sx={{margin: 1}} variant="contained" onClick={handleCancelButtonOnClick}>
            Cancel
        </Button>
        </>
    )
}

export default UpdateProject;