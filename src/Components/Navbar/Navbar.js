import logo from "../../Assets/logo.png";
import plusIcon from "../../Assets/plusicon3.png";
import { AppBar, Button } from "@mui/material";
import Popup from "reactjs-popup";
import LoginForm from "../Login/LoginForm";
import { Container } from "@mui/system";
import { useUser } from "../../Context/UserContext";
import { storageDelete, storageSave } from "../../Utils/Storage";

import RenderOnAnonymous from "../Renders/RenderOnAnonymous";
import RenderOnAuthenticated from "../Renders/RenderOnAuthenticated";
import UserService from "../../Service/userservice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  const handleLogOut = async e => {
    storageDelete("logged-user");
    e.preventDefault();
    await UserService.doLogout().then(UserService.clearToken());
    // UserService.doLogout();
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="1" style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="Logo" width={50} />
        <RenderOnAnonymous>
          {user === null && (
            <Popup trigger={<Button variant="contained">Login</Button>} position="top center" modal nested>
              {close => (
                <div
                  style={{
                    minHeight: "500px",
                    minWidth: "500px",
                    backgroundColor: "#ECD9BA"
                  }}
                >
                  <button onClick={close}>&times;</button>
                  <LoginForm />
                </div>
              )}
            </Popup>
          )}
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          {user !== null && (
            <Button variant="contained" LinkComponent={Link} to="/profile">
              Profile
            </Button>
          )}

          <Button variant="contained" color="primary" onClick={e => handleLogOut(e)}>
            Logout
          </Button>
        </RenderOnAuthenticated>

        <Button variant="contained">
          <Link to="/"> Main</Link>
        </Button>

        {user !== null && (
          <Button variant="contained" LinkComponent={Link} to="/project/add-project">
            <img src={plusIcon} alt="Plus Icon" width={50} />
          </Button>
        )}

        {user !== null && (
          <Button variant="contained" LinkComponent={Link} to="/" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </Container>
    </AppBar>
  );
};
export default Navbar;
