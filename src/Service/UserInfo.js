import { createHeaders } from ".";
import { useUser } from "../Context/UserContext";
import { storageSave } from "../Utils/Storage";
const apiUrl = process.env.REACT_APP_API_URL;

export const loginDev = async username => {
  try {
    //const response = await fetch(`${apiUrl}?username=${username}`);
    const response = await fetch(`${apiUrl}/Account/loginDev`, {
      method: "POST",
      headers: await createHeaders(),
      body: JSON.stringify({
        username
      })
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
export const checkUser = async (id, token) => {
  try {
    //const response = await fetch(`${apiUrl}?username=${username}`);
    const response = await fetch(`${apiUrl}/Account/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer  ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keycloakId: id
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    return [error.message, []];
  }
};
export const loginUser = async (id, token) => {
  try {
    //const response = await fetch(`${apiUrl}?username=${username}`);
    const response = await fetch(`${apiUrl}/Account/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer  ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keycloakId: id
      })
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
/*
if register doesnt send to database it means the token isnt sent there 
change the update token to get token in this case to check if this is the reason
or call directly the token in the bearer

check network status is the token even sent
*/
export const registerUser = async (username, firstName, lastName, email, id, token) => {
  try {
    const response = await fetch(`${apiUrl}/Account/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer  ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keycloakId: id,
        username,
        email,
        firstName,
        lastName
      })
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

export const submitUser = async (username, password) => {
  const [checkError, user] = await loginUser(username, password);

  if (checkError !== null) {
    return await registerUser(username, password);
  }

  if (checkError === null) {
    return [null, user];
  }
};

export const userById = async userId => {
  try {
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${userId}`, {
      headers: {
        "Content-Type": "application/json"
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

export const GetAllUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}`, {
      headers: await createHeaders()
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }
  } catch (error) {
    return [error.message, []];
  }
};


export const updateUserInfo = async (userId, newCareerTitle, newPortfolio, newDescription, newSkills) => {

  try {
    console.log(userId, newCareerTitle, newPortfolio, newDescription, newSkills);
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${userId}/Update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: userId
      },
      body: JSON.stringify({
        careerTitle: newCareerTitle,
        portfolio: newPortfolio,
        description: newDescription,
        skills: newSkills,
        photoUrl: photoUrl
      })
    });
    if (response.ok) {
      const data = await userById(userById);
      return data;
    }
  } catch (error) {}
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isPrivate: status
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    } else {
      const [error, data] = await userById(userId);

      return [null, data];
    }
  } catch (error) {
    return [error.message, []];
  }
};
export const updateViewHistory = async (userId, projectId) => {
  
  try {
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${userId}/viewHistory`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        id: userId
      },
      body: JSON.stringify({
        id: projectId
      })
    });
    if (!response.ok) {
      throw new Error("Could not complete request!");
    } else {
      const [error, data] = await userById(userId);
      console.log(data);
      if(data){
        storageSave("logged-user", data)
         
      }
      // return [null, data];
    }
  } catch (error) {
    // return [error.message, []];
  }
};
// const data = await response.json();
// console.log(data);

// return data;
