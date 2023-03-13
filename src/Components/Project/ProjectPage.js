import { useEffect, useState } from "react";
import { fetchProjectById } from "../../Service/ProjectInfos";

const ProjectPage = ({id}) => {

    const [project, setProject] = useState([]);
    useEffect(() => {
        getProjectInfo(id);
    },[id]);

    const getProjectInfo = async (id) => {
        const [error, fetchedProject] = await fetchProjectById(id);
        setProject(fetchedProject);
    }
  
    return (
        <>
            <h1>Hello</h1>
            <h1>{project.title}</h1>
        </>
    )
}

export default ProjectPage;