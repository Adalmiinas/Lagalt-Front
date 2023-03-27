import { createHeaders } from ".";
import { storageSave } from "../Utils/Storage";
import { useUser } from "../Context/UserContext";
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

// const registerUser = async (username, password) => {
//     try {
//         const response = await fetch(`${apiUrl}/Account/register`,{
//         //const response = await fetch(`${apiUrl}`, {
//             method: "POST",
//             headers: createHeaders(),
//             body: JSON.stringify({
//                 username,
//                 password,
//             }),
//         });
//         if(!response.ok){
//             throw new Error("Could not complete request!");
//         }
//         const data = await response.json();
//         return [null,data];
//     }
//     catch (error){
//         return [error.message, []];
//     }

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
    storageSave("logged-user", data);
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

export const updateUserInfo = async (userId, username, newCareerTitle, newEmail, newPortfolio, newDescription, newSkills) => {
  try {
    console.log(userId, username, newCareerTitle, newEmail, newPortfolio, newDescription, newSkills);
    const response = await fetch(`http://localhost:5128/api/AppUser/User/${userId}/Update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: userId
      },
      body: JSON.stringify({
        username: username,
        careerTitle: newCareerTitle,
        email: newEmail,
        portfolio: newPortfolio,
        description: newDescription,
        skills: newSkills
      })
    });
    if (response.ok) {
      const data = await userById(userById);
      return data;
    }
  } catch (error) {}
};
