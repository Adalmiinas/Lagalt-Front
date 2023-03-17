import { async } from "q";
import { createHeaders } from ".";

const apiUrl = process.env.REACT_APP_API_URL;

const loginUser = async (username,password) => {
    try {
        //const response = await fetch(`${apiUrl}?username=${username}`);
        const response = await fetch(`${apiUrl}/Account/login`,{
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if(!response.ok){
            throw new Error("Could not complete request!");
        }
        const data = await response.json();
        return [null,data];
    }
    catch (error){
        return [error.message, []];
    }
}

const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${apiUrl}/Account/register`,{
        //const response = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if(!response.ok){
            throw new Error("Could not complete request!");
        }
        const data = await response.json();
        return [null,data];
    }
    catch (error){
        return [error.message, []];
    }
}


export const submitUser = async (username,password) => {
    const [checkError, user] = await loginUser(username,password);
    
    if(checkError !== null){
        return await registerUser(username,password);
    }

    if(checkError === null) {
        return [null, user];
    }
}

export const userById = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`);
        if(!response.ok){
            throw new Error("Could not complete request!");
        }
        const data = await response.json();
        return [null,data];
    }
    catch (error){
        return [error.message, []];
    }
}

export const GetAllUsers = async () =>{
    try {
        const response = await fetch(`${apiUrl}`);
        if(!response.ok){
            throw new Error("Could not complete request!");
        }
        const data = await response.json();
        return [null,data];
    }
    catch (error){
        return [error.message, []];
    }
}

export const updateUserInfo = async () => {

}
