import { Alert, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { addProject } from "../../Service/ProjectInfos";
import SkillsInput, { returnedListSkills } from "./SkillsInput";
import TagsInput, { returnedList } from "./TagsInput";

const AddProjectPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGitUrl, setprojectGitUrl] = useState("");
  const [projectIndustry, setProjectIndustry] = useState("");

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

    const [error, userResponse] = await addProject(user.id, projectTitle, projectDescription, projectGitUrl, projectIndustry, tags, skills);

    if (error !== null) {
      setApiError(error);
    }
    navigate("/profile");
    projectSuccessfullyCreatedAlert();
  };

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
      <TextField required label="Title" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
      <p></p>
      <TextField required label="Description" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
      <p></p>
      <TextField label="Git Repository URL" value={projectGitUrl} onChange={e => setprojectGitUrl(e.target.value)} />
      <p></p>
      <TextField required label="Project's Industry" value={projectIndustry} onChange={e => setProjectIndustry(e.target.value)} />
      <p></p>
      <TagsInput />
      <SkillsInput />
      <Button variant="contained" onClick={handleSubmitClick} onKeyDown={checkKeyDown}>
        Submit
      </Button>
      <Button sx={{ margin: 1 }} variant="contained" onClick={handleCancelButtonOnClick}>
        Cancel
      </Button>
      {apiError && <p>{apiError}</p>}
    </>
  );
};

export default AddProjectPage;
