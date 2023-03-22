import React from "react";
import { loginUser, registerUser } from "../../Service/UserInfo";
import UserService from "../../Service/userservice";

function LoggedIn() {
  return (
    <>
      <h1>Logged in</h1>
      <p>username {UserService.getUsername()}</p>
      <p>name {UserService.name()}</p>
      <p>user id used for login and register, if you can get normal id from sql use it to query {UserService.getId()}</p>
      <p>user token send this as bearer {UserService.getToken()}</p>
      <button onClick={async () => await loginUser(UserService.getId())}>FETCH DATA</button>
      <button onClick={async () => await registerUser(UserService.getUsername(), UserService.givenName(), UserService.familyName(), UserService.email(), UserService.getId())}>Register data</button>
    </>
  );
}

export default LoggedIn;
