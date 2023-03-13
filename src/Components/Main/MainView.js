import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys";
import { fetchProjects } from "../../Service/ProjectInfos";
import { storageRead, storageSave } from "../../Utils/Storage";
import { ProjectBanner } from "./ProjectBanner.js";

const MainView = () => {

    const [projects, setProjects] = useState([]);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        if(projects.length === 0) {
            getProjects();
        }
    
    },[projects]);

    let inputHandler = (e) =>{
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);

    }

    const getProjects = async () => {
        const sessionProjects = storageRead(STORAGE_KEY_PROJECTS);

        if(sessionProjects === null){
            const [error, fetchedProjects] = await fetchProjects();
            if(error != null){
                return;
            }
            else{
                storageSave(STORAGE_KEY_PROJECTS, fetchedProjects);
                setProjects(fetchedProjects);
            }
        }
        else {
            setProjects(sessionProjects);
        }
    }
 
    return (
        <>
            <TextField
                variant="outlined"
                onChange={inputHandler}
                fullWidth
                label="Search"
            ></TextField>
            <ProjectBanner array = {projects} input={inputText}/>
        </>
    )
}

export default MainView;