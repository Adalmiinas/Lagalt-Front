import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys";
import { fetchProjects } from "../../Service/ProjectInfos";
import { storageRead, storageSave } from "../../Utils/Storage";
import { ProjectBanner } from "./ProjectBanner.js";
import SearchIcon from "@mui/icons-material/Search";

const MainView = () => {
  const [projects, setProjects] = useState([]);
  const [inputText, setInputText] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    if (projects.length === 0) {
      getProjects();
    }
  }, [projects]);

  let inputHandler = e => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleChange = e => {
    setIndustry(e.target.value);
  };

  const getProjects = async () => {
    const sessionProjects = storageRead(STORAGE_KEY_PROJECTS);

    if (sessionProjects === null && sessionProjects.length !== 0 ) {
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
            borderRadius: "5px"
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ minWidth: "100px", marginTop: "16px" }}>
          <FormControl fullWidth>
            <InputLabel id="industry-select"> Industry </InputLabel>
            <Select labelId="industry-select" id="industry" label="industry" value={industry} onChange={handleChange}>
              <MenuItem value={""}>Select All</MenuItem>
              <MenuItem value={"art"}>Art</MenuItem>
              <MenuItem value={"medical"}>Medical</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <ProjectBanner array={projects} input={inputText} category={industry} />
    </>
  );
};

export default MainView;
