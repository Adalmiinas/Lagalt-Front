import { Alert, AlertTitle, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { addProject } from "../../Service/ProjectInfos";
import SkillsInput, { emptySkillList, returnedListSkills } from "./Input/SkillsInput";
import TagsInput, { clearTagsList, returnedList } from "./Input/TagsInput";

const AddProjectPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGitUrl, setprojectGitUrl] = useState("");
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

  return (
    <>
    <div style={{ alignItems: "center", flexDirection: "column", display: "flex"}}>
    <Typography variant="h4" sx={{color:"#a8ba30"}}>CREATE PROJECT</Typography>
        <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"}, marginTop:"25px"}} required label="Title" borderRadius="12px" value={projectTitle} onChange={e => setProjectTitle(e.target.value)}/>
        <p></p>
        <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"}}} required label="Description" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
        <p></p>
        <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"}}} label="Git Repository URL" value={projectGitUrl} onChange={e => setprojectGitUrl(e.target.value)} />
        <p></p>
        <Box >
        <FormControl size='medium' sx={{minWidth:"194px"}}>
            <InputLabel id="industry-select"> Industry </InputLabel>
            <Select sx={{ '.MuiSvgIcon-root ': { color:"#a8ba30"}, color:"whitesmoke", background:"#545ac4",}} labelId="industry-select" id="industry" label="industry" value={industry} onChange={handleIndustryChange}>
              <MenuItem sx={{background:"#545ac4", color:"#a8ba30"}} value={""}>Select All</MenuItem>
              <MenuItem sx={{background:"#545ac4", color:"#a8ba30"}} value={"art"}>Art</MenuItem>
              <MenuItem sx={{background:"#545ac4", color:"#a8ba30"}} value={"medical"}>Medical</MenuItem>
              <MenuItem sx={{background:"#545ac4", color:"#a8ba30"}} value={"web-development"}>Web-Development</MenuItem>
              <MenuItem sx={{background:"#545ac4", color:"#a8ba30"}} value={"industrial"}>Industrial</MenuItem>
            </Select>
          </FormControl>
        </Box>
      <p></p><TagsInput />
      <p></p><SkillsInput />
      <div>
      <Button sx={{
          maxWidth: "60%",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: " 3px 3px 2px 1px rgba(52, 57, 152, 1)",
          border: "1px solid #000",
          backgroundColor: "#545ac4",
          margin: 1,
                '&:hover': {
                  backgroundColor: '#343998',
                  boxShadow: " 2px 2px 1px 1px rgba(49, 43, 112, 1)"
                }
          }} variant="contained" onClick={handleSubmitClick} onKeyDown={checkKeyDown}>
        Submit
      </Button>
      <Button sx={{
          maxWidth: "60%",
          justifyContent: "center",
          borderRadius: "12px",
          boxShadow: " 3px 3px 2px 1px rgba(52, 57, 152, 1)",
          border: "1px solid #000",
          backgroundColor: "#545ac4",
          margin: 1,
                '&:hover': {
                  backgroundColor: '#343998',
                  boxShadow: " 2px 2px 1px 1px rgba(49, 43, 112, 1)"
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