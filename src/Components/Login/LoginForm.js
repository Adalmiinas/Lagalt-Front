import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUser, submitUser } from "../../Service/UserInfo";
import { storageSave } from "../../Utils/Storage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import UserService from "../../Service/userservice";
import RenderOnAnonymous from "../Renders/RenderOnAnonymous";
import Welcome from "../Renders/Welcome";
import { Button } from "@mui/material";

const usernameConfig = {
  required: true,
  minLength: 4
};

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isLoggedIn());

  const handleLogin = async e => {
    e.preventDefault();
    console.log(e);
    await UserService.doLogin();
  };
  const handleRegister = async e => {
    e.React.MouseEventHandler.preventDefault();
    await UserService.doRegister();
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async ({ username, password }) => {
     setLoading(true);
     const [error, userResponse] = await submitUser(username, password);
     if (error !== null) {
       setApiError(error);
     }

     if (userResponse !== null) {
     storageSave("logged-user", userResponse);
     setUser(userResponse);
    }
    setLoading(false);
  };


  return (
    <>
      <h1>Log in:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
           <label htmlFor="username">Username:</label>
          <input type="text" placeholder="username" {...register("username", usernameConfig)} />

          <label htmlFor="password">Password:</label>
          <input type="text" placeholder="password" {...register("password", usernameConfig)} /> 
          {!isLoggedIn && ( 
          <div>
            {/* <RenderOnAnonymous> */}
            <Welcome />
            {/* </RenderOnAnonymous> */}

            <Button variant="contained" color="success" onClick={e => handleLogin(e)}>
              {" "}
              Login
            </Button>
            <Button variant="contained" color="warning" onClick={e => handleRegister(e)}>
              {" "}
              Register
            </Button>
          </div>
          )};
        </fieldset>

        <button type="submit" disabled={loading}>
          Log in
        </button>
        {loading && <p>Logging in...</p>}
        {apiError && <p>{apiError}</p>}
      </form>
    </>
  );
};

export default LoginForm;
