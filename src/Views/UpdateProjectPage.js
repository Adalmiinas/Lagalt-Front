import { useParams } from "react-router-dom";
import UpdateProject from "../Components/Project/UpdateProject";

const UpdateProjectPage = () => {
    const {id} = useParams();
    return (
        <>
            <UpdateProject id= {id} />
        </>
    )
}

export default UpdateProjectPage; 