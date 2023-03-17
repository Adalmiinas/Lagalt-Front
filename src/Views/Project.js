import { useParams } from "react-router";
import ProjectPage from "../Components/Project/ProjectPage";

const Project = () => {
    const {id} = useParams();
    
    return (
        <>
            <ProjectPage id={id} />
        </>
    )
}

export default Project; 