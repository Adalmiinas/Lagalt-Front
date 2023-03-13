import { useEffect, useState } from "react";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys";
import { fetchProjects } from "../../Service/ProjectInfos";
import { storageRead, storageSave } from "../../Utils/Storage";
import { ProjectBanner } from "./ProjectBanner.js";

const MainView = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if(projects.length === 0) {
            getProjects();
        }
    },[projects]);

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
            <ProjectBanner array = {projects}/>
        </>
    )
}

export default MainView;