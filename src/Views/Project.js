import { useParams } from "react-router";
import ProjectPage from "../Components/Project/ProjectPage";

const Project = () => {
    const {id} = useParams();
    
    return (
        <>
            <h1>project</h1>
            <ProjectPage id={id} />
        </>
    )
}

export default Project; 