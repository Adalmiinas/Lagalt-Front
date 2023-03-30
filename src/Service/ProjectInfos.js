import { storageSave } from "../Utils/Storage";
import { STORAGE_KEY_PROJECTS } from "../Const/storageKeys";
const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Fetches all the projects
 * @returns [null, data] if ok, else [error.message, []]
 */
export const fetchProjects = async () => {
  try {
    const response = await fetch(`${apiUrl}/Project/List`);
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

/**
 * fetched a single project whit the id
 * @param {*} id project id
 * @returns [null, data] if ok, else [error.message, []]
 */
export const fetchProjectById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/Project/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
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

/**
 * get all the users in the project
 * @param {*} id project
 * @returns [null, data] if ok, else [error.message, []]
 */
export const getUsersProjects = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/AppUser/User/${id}/Projects`, {
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

/**
 * get all the projects where the user is admin
 * @param {*} id user id
 * @returns[null, data] if ok, else [error.message, []]
 */
export const getAdminProjects = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/AppUser/User/${id}/AdminProjects`, {
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

/**
 * Adds user to the waiting list
 * @param {*} projId project id
 * @param {*} userId user id
 * @param {*} motivation motivation letter
 * @returns [null, response] if ok, else [error.message, []]
 */
export const addUserToProject = async (projId, userId, motivation) => {
  try {
    const response = await fetch(`${apiUrl}/ProjectUser/User/WaitList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "X-API-Key": "http://localhost:5128/api/ProjectUser",
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

/**
 * changes the status of the user in the waiting, when the owner has declined or accepted.
 * @param {*} ownerId owner id
 * @param {*} projId project id
 * @param {*} userId user id
 * @param {*} pending waitinglist status
 * @returns [null, response] if ok, else [error.message, []]
 */
export const acceptUserToProject = async (ownerId, projId, userId, pending) => {
  try {
    const response = await fetch(`${apiUrl}/ProjectUser/owner/waitlist/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // "X-API-Key": "http://localhost:5128/api/ProjectUser",
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

/**
 * Delete user from project.
 * @param {*} userId owner id
 * @param {*} projId project id
 * @param {*} actingId user to be deleted
 * @returns [null, response] if ok, else [error.message, []]
 */
export const deleteUserFromProject = async (userId, projId, actingId) => {
  try {
    const response = await fetch(`${apiUrl}/ProjectUser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "X-API-Key": "http://localhost:5128/api/ProjectUser",
        userId: userId
      },
      body: JSON.stringify({
        userId: actingId,
        projectId: projId,
      }),
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }

    return [null, response];
  } catch (error) {
    return [error.message, []];
  }
};

/**
 * Add project
 * @param {*} id user id
 * @param {*} title
 * @param {*} description
 * @param {*} gitRepositoryUrl
 * @param {*} industryName
 * @param {*} tagNames
 * @param {*} skillNames
 * @returns [null, data] if ok, else [error.message, []]
 */
export const addProject = async (
  id,
  title,
  description,
  gitRepositoryUrl,
  industryName,
  tagNames,
  skillNames
) => {
  try {
    console.log(id, title, description, gitRepositoryUrl, industryName, tagNames, skillNames);
    const response = await fetch(`${apiUrl}/Project/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: id,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        gitRepositoryUrl: gitRepositoryUrl,
        industryName: { industryName: industryName },
        tagNames,
        skillNames,
      }),
    });
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();

    fetchProjects();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

/**
 * Updates project.
 * @param {*} userId
 * @param {*} projectId
 * @param {*} title
 * @param {*} description
 * @param {*} gitUrl
 * @param {*} projectImageUrl
 * @param {*} industryName
 * @param {*} newTagNames
 * @param {*} newSkillNames
 * @returns [null, data] if ok, else [error.message, []]
 */
export const updateProject = async (
  userId,
  projectId,
  title,
  description,
  gitUrl,
  projectImageUrl,
  industryName,
  newTagNames,
  newSkillNames
) => {
  try {
    console.log(userId, projectId, title, description, gitUrl, projectImageUrl, industryName, newTagNames, newSkillNames);
    const response = await fetch(`${apiUrl}/Project/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: userId,
      },
      body: JSON.stringify({
        id: projectId,
        title: title,
        description: description,
        gitRepositoryUrl: gitUrl,
        projectImage: { url: projectImageUrl },
        industryName: { industryName: industryName },
        tagNames: newTagNames,
        skillNames: newSkillNames,
      }),
    });
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const data = await response.json();

    fetchProjects();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

/**
 * Updates the project status.
 * @param {*} userId owner id
 * @param {*} projectId project id
 * @param {*} newStatus status of the project
 * @returns [null, response] if ok, else [error.message, []]
 */
export const updateProjectStatus = async (userId, projectId, newStatus) => {
  try {
    const response = await fetch(`${apiUrl}/Project/patch`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        id: userId,
      },
      body: JSON.stringify({
        id: projectId,
        status: newStatus,
      }),
    });
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }

    fetchProjects();
    return [null, response];
  } catch (error) {
    return [error.message, null];
  }
};
