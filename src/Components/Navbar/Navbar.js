import logo from "../../Assets/logo.png";
import { AppBar, Button } from "@mui/material";
import { Container } from "@mui/system";

import { Link, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { storageRead } from "../../Utils/Storage";
const Navbar = props => {
  const { handleLoad } = props;
  const history = useNavigate();

  const { keycloak } = useKeycloak();
  const userInfo = storageRead("logged-user");

  const handleRedirect = () => {
    history("/");
    handleLoad(2);
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="1" style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="Logo" width={50} />

        {keycloak.authenticated && (
          <Button variant="contained" LinkComponent={Link} to={`/profile/${userInfo ? userInfo.username : ""}`}>
            Profile
          </Button>
        )}
        {!keycloak.authenticated && (
          <Button variant="contained" onClick={() => handleLoad(1)}>
            Login
          </Button>
        )}
        {!keycloak.authenticated && (
          <Button variant="contained" onClick={() => handleLoad(3)}>
            Register
          </Button>
        )}

        <Button variant="contained" LinkComponent={Link} to="/">
          Home
        </Button>

        {keycloak.authenticated && (
          <Button variant="contained" color="primary" onClick={() => handleRedirect()}>
            Logout
          </Button>
        )}
      </Container>
    </AppBar>
  );
};
export default Navbar;
