import logo from "../../Assets/logo.png";
import { AppBar, Button, ButtonGroup, TextField } from "@mui/material";
import { fetchProjects } from "../../Service/ProjectInfos";
import SearchForm from "./SearchForm";
import Popup from "reactjs-popup";
import LoginForm from "../Login/LoginForm";
import { Container } from "@mui/system";

const Navbar = () => {
  const onSearchSubmit = () => {
    fetchProjects();
  };
  // const onSearchSubmitById = () => { fetchProjectsByName() }

  return (
    <AppBar position="sticky">
      <Container maxWidth="1" style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="Logo" width={50} />

        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <TextField
                    id="filled-search"
                    label="Search projects..."
                    type="search"
                    variant="filled"
                    
                />
                
          <Button onClick={() => onSearchSubmit()}>search</Button>
          {/* <Button type="submit" onClick={() => onSearchSubmitById(2)}>SearchById</Button> */}
          <SearchForm />
        </ButtonGroup>
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
        <Button variant="contained" href="/profile">Profile</Button>
        <Button variant="contained" href="/">Main</Button>
        <Button variant="contained" href="/project">Project</Button>
      </Container>
    </AppBar>
  );
};
export default Navbar;
