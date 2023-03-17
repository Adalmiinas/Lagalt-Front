import { useParams } from "react-router";
import ProjectPage from "../Components/Project/ProjectPage";
import WaitList from "../Components/Project/WaitList";

const Project = () => {
    const {id} = useParams();
    
    return (
        <>
            <ProjectPage id={id} />
           
        </>
    )
}

export default Project; 