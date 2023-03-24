import keycloak from "../keycloak";

const apiKey = process.env.REACT_APP_API_KEY;

export const createHeaders = async () => {
  return {
    Authorization: `Bearer  ${keycloak.token()}`,
    "Content-Type": "application/json"
  };
};
