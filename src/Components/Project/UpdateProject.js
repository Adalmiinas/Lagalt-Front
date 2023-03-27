import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SkillsInput, { emptySkillList, returnedListSkills } from "./SkillsInput"
import TagsInput, { clearTagsList, returnedList } from "./TagsInput"
import { useUser } from "../../Context/UserContext";
import { updateProject } from "../../Service/ProjectInfos"
import { storageRead, storageSave } from "../../Utils/Storage"
import { fetchProjects } from "../../Service/ProjectInfos";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys"

const UpdateProject = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useUser();
    
    //const projectToUpdateId = location.state.projectId
    
    const [apiError, setApiError] = useState(null);

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [projectGitUrl, setProjectGitUrl] = useState(null)
    const [projectImageUrl, setProjectImageUrl] = useState(null)
    const [industry, setIndustry] = useState(null)

    const handleCancelButtonOnClick = () => {
        navigate("/profile")
    }

    const handleIndustryChange = e => {
        setIndustry(e.target.value)
      }
    
    //console.log(projectToUpdateId)

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
            if(error !== null){
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

        const tags = await returnedList()
        const skills = await returnedListSkills()

        const [error, userResponse] = await updateProject(
          user.id,
          //projectToUpdateId,
          10,
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
        await emptySkillList()
        await clearTagsList()
        navigate("/profile")
        projectSuccessfullyUpdatedAlert();

    }

    return (
        <>
        <div style={{ alignItems: "center", flexDirection: "column", display: "flex"}}>
        <h2 style={{ color:"#787CD1"}}>Update project information</h2>
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
        <Box >
        <FormControl size='medium' sx={{minWidth:"194px"}}>
            <InputLabel id="industry-select"> Industry </InputLabel>
            <Select labelId="industry-select" id="industry" label="industry" value={industry} onChange={handleIndustryChange}>
              <MenuItem value={""}>Select All</MenuItem>
              <MenuItem value={"art"}>Art</MenuItem>
              <MenuItem value={"medical"}>Medical</MenuItem>
              <MenuItem value={"Web-Development"}>Web-Development</MenuItem>
              <MenuItem value={"Industrial"}>Industrial</MenuItem>
            </Select>
          </FormControl>
      </Box>
        <p></p>
        <TagsInput/>
        <p></p>
        <SkillsInput/>
        <p></p>
        <div>
        <Button sx={{
          maxWidth: "60%",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: " 3px 3px 2px 1px rgba(0, 0, 255, .2)",
          backgroundColor: "violet",
          margin: 1,
                '&:hover': {
                     backgroundColor: '#312B70',
                     boxShadow: " 2px 2px 1px 1px rgba(120, 124, 209, 1)"
                 }}}
             variant="contained" onClick={handleSubmitClick} onKeyDown={checkKeyDown}>
        Submit
      </Button>
      <Button sx={{
          maxWidth: "60%",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: " 3px 3px 2px 1px rgba(0, 0, 255, .2)",
          backgroundColor: "violet",
                margin: 1,
                '&:hover': {
                     backgroundColor: '#312B70',
                      boxShadow: " 2px 2px 1px 1px rgba(120, 124, 209, 1)"
                 }}} 
        variant="contained" onClick={handleCancelButtonOnClick}>
        Cancel
      </Button>
      </div>
      </div>
        </>
    )
}

export default UpdateProject;