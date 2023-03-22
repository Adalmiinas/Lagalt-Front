import { Box, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys";
import { fetchProjects } from "../../Service/ProjectInfos";
import { storageRead, storageSave } from "../../Utils/Storage";
import { ProjectBanner } from "./ProjectBanner.js";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "react-bootstrap/Badge";
import { FormControl } from "react-bootstrap";

const MainView = () => {
  const [projects, setProjects] = useState([]);
  const [inputText, setInputText] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    if (projects.length === 0) {
      getProjects();
    }
  }, [projects]);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleChange = (e) => {};

  const getProjects = async () => {
    const sessionProjects = storageRead(STORAGE_KEY_PROJECTS);

    if (sessionProjects === null) {
      const [error, fetchedProjects] = await fetchProjects();
      if (error != null) {
        return;
      } else {
        storageSave(STORAGE_KEY_PROJECTS, fetchedProjects);
        setProjects(fetchedProjects);
      }
    } else {
      setProjects(sessionProjects);
    }
  };

  return (
    <>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <TextField
          variant="outlined"
          onChange={inputHandler}
          fullWidth
          size="medium"
          margin="normal"
          style={{
            backgroundColor: "#787CD1",
            maxWidth: "50%",
            justifyContent: "center",
            borderRadius: "5px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
{/*    
      <Box>
        <FormControl>
          <InputLabel id="industry-select">Industry</InputLabel>
          <Select labelId="industry-select" id="industry" label="industry" value={industry} onChange={handleChange}>
            <MenuItem value={"art"}>Art</MenuItem>
            <MenuItem value={"medical"}>Medical</MenuItem>
          </Select>
        </FormControl>
        </Box> */}

      <ProjectBanner array={projects} input={inputText} />
    </>
  );
};

export default MainView;
