import { fetchProjectById } from "./ProjectInfos";

export const isUserOWner = async (currentUserId, projectId) => {
    const [error, data] = await fetchProjectById(projectId);

    if(currentUserId != null && data != null ) {
        data.projectUsers.map((user) => {
            console.log(user);
            console.log(currentUserId);

            if(user.userId === currentUserId && user.isOwner === true){
                return true;
            }
            return false;
        });
    }
    else {
        return false;
    }
};