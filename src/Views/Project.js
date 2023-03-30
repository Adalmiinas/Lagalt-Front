import { useParams } from "react-router";
import ProjectPage from "../Components/Project/ProjectPage";

/**
 * Renders project page for specific project
 * @returns {JSX.Element}
 */
const Project = () => {
    const {id} = useParams();
    
    return (
        <>
            <ProjectPage id={id} />
        </>
    )
}

export default Project; 