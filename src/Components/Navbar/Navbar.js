import logo from "../../Assets/logo.png";
import plusIcon from "../../Assets/plusicon3.png";
import { AppBar, Button } from "@mui/material";
import Popup from "reactjs-popup";
import LoginForm from "../Login/LoginForm";
import { Container } from "@mui/system";
import { useUser } from "../../Context/UserContext";
import { storageDelete, storageSave } from "../../Utils/Storage";


const Navbar = () => {
  const { user} = useUser();

  const handleLogout = () => {
    storageDelete("logged-user")
  }

  return (
    <AppBar position="sticky">
      <Container
        maxWidth="1"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src={logo} alt="Logo" width={50} />
        {user === null && (
          <Popup
            trigger={<Button variant="contained">Login</Button>}
            position="top center"
            modal
            nested
          >
            {(close) => (
              <div
                style={{
                  minHeight: "500px",
                  minWidth: "500px",
                  backgroundColor: "#ECD9BA",
                }}
              >
                <button onClick={close}>&times;</button>
                <LoginForm />
              </div>
            )}
          </Popup>
        )}

        {user !== null && (
          <Button variant="contained" href="/profile">
            Profile
          </Button>
        )}

        <Button variant="contained" href="/">
          Main
        </Button>

        {user !== null && (
          <Button variant="contained" href="/project/add-project">
          <img src={plusIcon} alt="Plus Icon" width={50}/>
        </Button>
        )}

        {user !== null && (
          <Button variant="contained" href="/" onClick={handleLogout}>
            Logout
          </Button>
        )}
        
      </Container>
    </AppBar>
  );
};
export default Navbar;
