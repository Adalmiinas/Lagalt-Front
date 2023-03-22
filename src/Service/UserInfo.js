import { useEffect } from "react";
import { createHeaders } from ".";
import { storageSave } from "../Utils/Storage";
import UserService from "./userservice";
const apiUrl = process.env.REACT_APP_API_URL;

/*
if login doesnt send to database it means the token isnt sent there 
change the update token to get token in this case to check if this is the reason
or call directly the token in the bearer

check network status is the token even sent
*/
export const loginUser = async id => {
  let token = UserService.getToken();
  try {
    if (token === undefined) {
      token = UserService.updateToken();
    }
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
    storageSave("logged-user", data)
    console.log(data);
    return data;
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
export const registerUser = async (username, firstName, lastName, email, id) => {
  let token = UserService.getToken();
  if (token === undefined) {
    token = UserService.updateToken();
  }
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
    const response = await fetch(`${apiUrl}/${userId}`);
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
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error("Could not complete request!");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const updateUserInfo = async () => {};
