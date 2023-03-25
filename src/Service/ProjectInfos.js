import { storageSave } from "../Utils/Storage";
import { STORAGE_KEY_PROJECTS } from "../Const/storageKeys";

export const fetchProjects = async () => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/List`);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    storageSave(STORAGE_KEY_PROJECTS, data);
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const fetchProjectById = async id => {
  try {
    const response = await fetch(`http://localhost:5128/api/Project/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();

    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const getUsersProjects = async id => {
  try {
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${id}/Projects`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
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
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${id}/AdminProjects`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
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

export const acceptUserToProject = async (ownerId, projId, userId, pending) => {
  try {
    const response = await fetch("http://localhost:5128/api/ProjectUser/owner/waitlist/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "http://localhost:5128/api/ProjectUser",
        ownerId: ownerId
      },
      body: JSON.stringify({
        projectId: projId,
        userId: userId,
        pendingStatus: pending
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

export const deleteUserFromProject = async (actingId, projId, userId) => {
  try {
    const response = await fetch("http://localhost:5128/project", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "http://localhost:5128/api/ProjectUser",
        userId: userId
      },
      body: JSON.stringify({
        userId: actingId,
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

export const addProject = async (id, title, description, gitRepositoryUrl, industryName, tagNames, skillNames) => {
  try {
    console.log(id, title, description, gitRepositoryUrl, industryName, tagNames, skillNames);
    const response = await fetch(`http://localhost:5128/api/Project/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: id
      },
      body: JSON.stringify({
        title: title,
        description: description,
        gitRepositoryUrl: gitRepositoryUrl,
        industryName: { industryName: industryName },
        tagNames,
        skillNames
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    fetchProjects();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const updateProject = async (userId, projectId, title, description, gitUrl, projectImageUrl, industryName, tagNames, skillNames) => {
  try {
    console.log(userId, projectId, title, description, gitUrl, projectImageUrl, industryName, tagNames, skillNames);
    const response = await fetch(`http://localhost:5128/api/Project/update`, {
      method: "PUT",
      headers: {
        "X-API-Key": "http://localhost:5128/api/Project",
        "Content-Type": "application/json",
        id: userId
      },
      body: JSON.stringify({
        id: projectId,
        title: title,
        description: description,
        gitRepositoryUrl: gitUrl,
        projectImage: { url: projectImageUrl },
        industryName: { industryName: industryName },
        tagNames,
        skillNames
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();
    console.log(data);
    fetchProjects();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};
