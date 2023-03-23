import Welcome from "../Renders/Welcome";
import { Button } from "@mui/material";
import { useEffect } from "react";
const LoginForm = props => {
  const { handleLoad } = props;

  const handleLogin = async () => {
    handleLoad(1);
  };

  const handleRegister = async () => {
    handleLoad(3);
  };

  useEffect(() => {
  
  }, [handleLoad]);
  return (
    <>
      <h1>Log in:</h1>
      <form>
        <fieldset>
          <div>
            <Welcome />
            <Button variant="contained" color="success" onClick={handleLogin}>
              {" "}
              Login
            </Button>
            <Button variant="contained" color="warning" onClick={handleRegister}>
              {" "}
              Register
            </Button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;
