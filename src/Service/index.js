import UserService from "./userservice";

const apiKey = process.env.REACT_APP_API_KEY;

export const createHeaders = async () => {
  return {
    Authorization: `Bearer  ${UserService.getToken()}`,
    "Content-Type": "application/json"
  };
};
