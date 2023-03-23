import React from "react";
import { loginUser, registerUser } from "../../Service/UserInfo";
import { useKeycloak } from "@react-keycloak/web";
import { email, firstName, lastName, userId, username } from "../../keycloak";

function LoggedIn() {
  const { keycloak } = useKeycloak();

  const handleLogin = async () => {
    await loginUser(userId(), keycloak.token);
  };
  const handleRegistration = async () => {
    await registerUser(username(), firstName(), lastName(), email(), userId(), keycloak.token);
  };
  return (
    <>
      <h1>Logged in</h1>
      <p>username {username()}</p>
      <p>name {firstName()}</p>
      <p>user id used for login and register, if you can get normal id from sql use it to query {userId()}</p>
      <br />
      <p>user token send this as bearer {keycloak.token}</p>
      <button onClick={() => handleLogin()}>FETCH DATA</button>
      <button onClick={() => handleRegistration()}>Register data</button>
    </>
  );
}

export default LoggedIn;
