const apiUrl = process.env.REACT_APP_API_URL;
export const addMessageToProject = async (projId, userId, message, title) => {
  try {
    const response = await fetch(`${apiUrl}/MessageBoard/Create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userId: userId
      },
      body: JSON.stringify({
        title: title,
        body: message,
        projectId: projId
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }

    return [null, response];
  } catch (error) {
    return [error.message, []];
  }
};

export const getAllMessagesFromProject = async projId => {
  try {
    const response = await fetch(`${apiUrl}/MessageBoard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        projectId: projId
      }
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const deleteMessageFromProject = async (messageId, userId) => {
  try {
    const response = await fetch(`${apiUrl}/MessageBoard`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        userId: userId
      },
      body: JSON.stringify({
        messageBoardId: messageId
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }

    return [null, response];
  } catch (error) {
    return [error.message, []];
  }
};
