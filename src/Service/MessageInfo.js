
export const addMessageToProject = async (projId, userId, message, title) => {
    try {
        const response = await fetch(
          "http://localhost:5128/api/MessageBoard/Create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              userId: userId,
            },
            body: JSON.stringify({
                title: title,
                body: message,
                projectId: projId
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Could not complete request!");
        }
    
        return [null, response];
      } catch (error) {
        return [error.message, []];
      }
};

export const getAllMessagesFromProject = async (projId) => {
    try {
        const response = await fetch(
          "http://localhost:5128/api/MessageBoard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              projectId: projId,
            }
          }
        );
        if (!response.ok) {
          throw new Error("Could not complete request!");
        }
        const data = await response.json();
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
};


export const deleteMessageFromProject = async (projId, userId) => {
    try {
      const response = await fetch(
        "http://localhost:5128/project",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "http://localhost:5128/api/ProjectUser",
            userId: userId,
          },
          body: JSON.stringify({
            userId: userId,
            projectId: projId
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Could not complete request!");
      }
  
      return [null, response];
    } catch (error) {
      return [error.message, []];
    }
  };