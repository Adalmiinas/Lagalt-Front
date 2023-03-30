import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillsInput, {
  emptySkillList,
  returnedListSkills,
} from "./Input/SkillsInput";
import TagsInput, { clearTagsList, returnedList } from "./Input/TagsInput";
import { useUser } from "../../Context/UserContext";
import { updateProject } from "../../Service/ProjectInfos";
import { storageRead, storageSave } from "../../Utils/Storage";
import { fetchProjects } from "../../Service/ProjectInfos";
import { STORAGE_KEY_PROJECTS } from "../../Const/storageKeys";

/**
 * Update project form.
 */
const UpdateProject = (props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const projectId = props.projectId
  const [apiError, setApiError] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [projectGitUrl, setProjectGitUrl] = useState(null);
  const [projectImageUrl, setProjectImageUrl] = useState(null);
  const [industry, setIndustry] = useState(null);

  const handleCancelButtonOnClick = () => {
    props.open(false);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const projectSuccessfullyUpdatedAlert = () => {
    alert("Project successfully updated!");
  };

  /**
   * updates the project list in session storage after updating project.
   */
  const getUpdatedProjectList = async () => {
    const sessionProjects = storageRead(STORAGE_KEY_PROJECTS);

    if (sessionProjects !== null) {
      const [error, fetchedProjects] = await fetchProjects();
      if (error !== null) {
        return;
      } else {
        storageSave(STORAGE_KEY_PROJECTS, fetchedProjects);
      }
    } else {
    }
  };

  /**
   * Handles the submit of the update form.
   */
  const handleSubmitClick = async () => {
    console.log(projectId);

    const tags = await returnedList();
    const skills = await returnedListSkills();

    const [error, userResponse] = await updateProject(
      user.id,
      projectId,
      title,
      description,
      projectGitUrl,
      projectImageUrl,
      industry,
      tags,
      skills
    );

    if (error !== null) {
      setApiError(error);
    }
    getUpdatedProjectList();
    await emptySkillList();
    await clearTagsList();
    navigate("/profile");
    projectSuccessfullyUpdatedAlert();
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Typography variant="h4" sx={{ color: "#a8ba30" }}>
          UPDATE PROJECT INFORMATION
        </Typography>
        <TextField
          sx={{
            input: { color: "whitesmoke", background: "#545ac4" },
            marginTop: "20px",
          }}
          required
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p></p>
        <TextField
          sx={{ input: { color: "whitesmoke", background: "#545ac4" } }}
          required
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p></p>
        <TextField
          sx={{ input: { color: "whitesmoke", background: "#545ac4" } }}
          label="Git Repository(URL)"
          value={projectGitUrl}
          onChange={(e) => setProjectGitUrl(e.target.value)}
        />
        <p></p>
        <TextField
          sx={{ input: { color: "whitesmoke", background: "#545ac4" } }}
          label="Project Image(URL)"
          value={projectImageUrl}
          onChange={(e) => setProjectImageUrl(e.target.value)}
        />
        <p></p>

        <Box>
          <FormControl size="medium" sx={{ minWidth: "194px" }}>
            <InputLabel id="industry-select"> Industry </InputLabel>
            <Select
              sx={{
                ".MuiSvgIcon-root ": { color: "#a8ba30" },
                color: "whitesmoke",
                background: "#545ac4",
              }}
              labelId="industry-select"
              id="industry"
              label="industry"
              value={industry}
              onChange={handleIndustryChange}
            >
              <MenuItem
                sx={{ background: "#545ac4", color: "#a8ba30" }}
                value={""}
              >
                Select All
              </MenuItem>
              <MenuItem
                sx={{ background: "#545ac4", color: "#a8ba30" }}
                value={"art"}
              >
                Art
              </MenuItem>
              <MenuItem
                sx={{ background: "#545ac4", color: "#a8ba30" }}
                value={"medical"}
              >
                Medical
              </MenuItem>
              <MenuItem
                sx={{ background: "#545ac4", color: "#a8ba30" }}
                value={"web-development"}
              >
                Web-Development
              </MenuItem>
              <MenuItem
                sx={{ background: "#545ac4", color: "#a8ba30" }}
                value={"industrial"}
              >
                Industrial
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <p></p>
        <Typography variant="h6" sx={{ color: "#a8ba30" }}>
          Tags and skills are added using the enter button
        </Typography>
        <p></p>
        <TagsInput />
        <p></p>
        <SkillsInput />
        <p></p>
        <div>
          <Button
            sx={{
              maxWidth: "60%",
              justifyContent: "center",
              borderRadius: "12px",
              boxShadow: " 3px 3px 2px 1px rgba(52, 57, 152, 1)",
              border: "1px solid #000",
              backgroundColor: "#545ac4",
              margin: 1,
              "&:hover": {
                backgroundColor: "#343998",
                boxShadow: " 2px 2px 1px 1px rgba(49, 43, 112, 1)",
              },
            }}
            variant="contained"
            onClick={handleSubmitClick}
            onKeyDown={checkKeyDown}
          >
            Submit
          </Button>
          <Button
            sx={{
              maxWidth: "60%",
              justifyContent: "center",
              borderRadius: "12px",
              boxShadow: " 3px 3px 2px 1px rgba(52, 57, 152, 1)",
              border: "1px solid #000",
              backgroundColor: "#545ac4",
              margin: 1,
              "&:hover": {
                backgroundColor: "#343998",
                boxShadow: " 2px 2px 1px 1px rgba(49, 43, 112, 1)",
              },
            }}
            variant="contained"
            onClick={handleCancelButtonOnClick}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
