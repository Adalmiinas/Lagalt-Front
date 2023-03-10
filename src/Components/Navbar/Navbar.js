import logo from "../../Assets/logo.png";
import { Button, ButtonGroup } from "@mui/material";
import { fetchProjects, onSearchSubmitById } from "../../Service/ProjectInfos";
import SearchForm from "./SearchForm";
import Projects from "../../Components/Navbar/Projects";

const Navbar = () => {
  const onSearchSubmit = () => {
    fetchProjects();
  };
  // const onSearchSubmitById = () => { fetchProjectsByName() }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="Logo" width={50} />

        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => onSearchSubmit()}>search</Button>
          {/* <Button type="submit" onClick={() => onSearchSubmitById(2)}>SearchById</Button> */}
          <SearchForm />
        </ButtonGroup>
        <Projects />
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
};
export default Navbar;
