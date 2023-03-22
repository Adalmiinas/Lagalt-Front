export const fetchProjects = async () => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/List`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const fetchProjectById = async id => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/${id}`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const getUsersProjects = async id => {
  try {
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${id}/Projects`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const getAdminProjects = async id => {
  try {
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${id}/AdminProjects`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const addUserToProject = async (projId, userId, motivation) => {
  try {
    const response = await fetch("http://localhost:5128/api/ProjectUser/User/WaitList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "http://localhost:5128/api/ProjectUser",
        userId: userId
      },
      body: JSON.stringify({
        projectId: projId,
        motivationLetter: motivation
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
