import { Alert, Button, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, display } from "@mui/system";
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { addProject, fetchProjects } from "../../Service/ProjectInfos";
import { storageRead } from "../../Utils/Storage";
import { descriptionConfig, gitRepositoryUrlConfig, industryNameConfig, titleConfig } from "./Input/InputValidations";
import SkillsInput, { clearSkillsList, emptySkillList, returnedListSkills } from "./SkillsInput";
import TagsInput, { clearTagsList, returnedList } from "./TagsInput";

const AddProjectPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGitUrl, setprojectGitUrl] = useState("");
  //const [projectIndustry, setProjectIndustry] = useState("");
  const [industry, setIndustry] = useState("");

  const {
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (submitted !== false) {
      navigate("/profile");
    }
  }, [submitted, navigate]);

  const handleCancelButtonOnClick = () => {
    navigate("/profile");
  };

  const checkKeyDown = e => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleSubmitClick = async () => {
    const tags = await returnedList();
    const skills = await returnedListSkills();

    const [error, userResponse] = await addProject(user.id, projectTitle, projectDescription, projectGitUrl, industry, tags, skills);

    if (error !== null) {
      setApiError(error);
    }
    navigate("/profile");
    await emptySkillList()
    await clearTagsList()
    projectSuccessfullyCreatedAlert();
    
  };

  const handleIndustryChange = e => {
    setIndustry(e.target.value)
  }

  const projectSuccessfullyCreatedAlert = () => {
    alert("Project successfully created!");
  };

  const errorMessageTitle = (() => {
    if (!errors.projectTitle) {
      return null;
    }

    if (errors.projectTitle.type === "required") {
      return <Alert severity="error">Title is required.</Alert>;
    }

    if (errors.projectTitle.type === "minLength") {
      return <Alert severity="error">Title has to be at least 5 characters.</Alert>;
    }
  })();

  const errorMessageDescription = (() => {
    if (!errors.description) {
      return null;
    }

    if (errors.description.type === "required") {
      return <Alert severity="error">Description is required.</Alert>;
    }

    if (errors.description.type === "minLength") {
      return <Alert severity="error">Description has to be at least 15 characters.</Alert>;
    }
  })();

  const errorMessageGitRepositoryUrl = (() => {
    if (!errors.gitRepositoryUrl) {
      return null;
    }

    if (errors.gitRepositoryUrl.type === "required") {
      return <Alert severity="error">Git Repository Url is required.</Alert>;
    }

    if (errors.gitRepositoryUrl.type === "minLength") {
      return <Alert severity="error">Git Repository Url has to be at least 10 characters.</Alert>;
    }
  })();

  const errorMessageIndustryName = (() => {
    if (!errors.industryName) {
      return null;
    }

    if (errors.industryName.type === "required") {
      return <Alert severity="error">Industry name is required.</Alert>;
    }

    if (errors.industryName.type === "minLength") {
      return <Alert severity="error">Industry name has to be at least 5 characters.</Alert>;
    }
  })();

  const errorMessageTagNames = (() => {
    if (!errors.tagNames) {
      return null;
    }

    if (errors.tagNames.type === "required") {
      return <Alert severity="error">Tags is required.</Alert>;
    }

    if (errors.tagNames.type === "minLength") {
      return <Alert severity="error">Tag has to be at least 2 characters.</Alert>;
    }
  })();

  const errorMessageSkillsNames = (() => {
    if (!errors.skillNames) {
      return null;
    }

    if (errors.skillNames.type === "required") {
      return <Alert severity="error">Skills is required.</Alert>;
    }

    if (errors.skillNames.type === "minLength") {
      return <Alert severity="error">Skill has to be at least one character long.</Alert>;
    }
  })();

  return (
    <>
      <div style={{ alignItems: "center", flexDirection: "column", display: "flex"}}>
      <h1 style={{ color:"#787CD1"}}>Create Project</h1>
        <TextField required label="Title" borderRadius="12px" value={projectTitle} onChange={e => setProjectTitle(e.target.value)}/>
        <p></p>
        <TextField required label="Description" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
        <p></p>
        <TextField label="Git Repository URL" value={projectGitUrl} onChange={e => setprojectGitUrl(e.target.value)} />
        <p></p>
      {/* <TextField required label="Project's Industry" value={projectIndustry} onChange={e => setProjectIndustry(e.target.value)} />
      <p></p> */}
      <Box >
        <FormControl size='medium' sx={{minWidth:"196px"}}>
            <InputLabel id="industry-select"> Industry </InputLabel>
            <Select labelId="industry-select" id="industry" label="industry" value={industry} onChange={handleIndustryChange}>
              <MenuItem value={""}>Select All</MenuItem>
              <MenuItem value={"art"}>Art</MenuItem>
              <MenuItem value={"medical"}>Medical</MenuItem>
              <MenuItem value={"Web-Development"}>Web-Development</MenuItem>
              <MenuItem value={"Industrial"}>Industrial</MenuItem>
            </Select>
          </FormControl>
      </Box>
      <p></p>
      <TagsInput />
      <p></p>
      <SkillsInput />
      <div>
      <Button sx={{
          maxWidth: "60%",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: " 3px 3px 2px 1px rgba(0, 0, 255, .2)",

          backgroundColor: "violet",
                    margin: 1,
                    '&:hover': {
                        backgroundColor: '#312B70',
                        boxShadow: " 2px 2px 1px 1px rgba(120, 124, 209, 1)"
                    }
          }} variant="contained" onClick={handleSubmitClick} onKeyDown={checkKeyDown}>
        Submit
      </Button>
      <Button sx={{
          maxWidth: "60%",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: " 3px 3px 2px 1px rgba(0, 0, 255, .2)",
          backgroundColor: "violet",
          margin: 1,
                    '&:hover': {
                        backgroundColor: '#312B70',
                        boxShadow: " 2px 2px 1px 1px rgba(120, 124, 209, 1)"
                    }
        }} variant="contained" onClick={handleCancelButtonOnClick}>
        Cancel
      </Button>
      
      {apiError && <p>{apiError}</p>}
      </div>
      </div>
    </>
  );
};

export default AddProjectPage;
