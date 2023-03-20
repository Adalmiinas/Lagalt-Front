import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { addProject } from "../../Service/ProjectInfos";
import {
  descriptionConfig,
  gitRepositoryUrlConfig,
  industryNameConfig,
  titleConfig,
} from "./Input/InputValidations";
import SkillsInput, { returnedListSkills } from "./SkillsInput";
import TagsInput, { returnedList } from "./TagsInput";


const AddProjectPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const tags = returnedList()
  const skills = returnedListSkills()
  console.log("adjoadad"+tags)
  console.log("adasdasdas"+skills)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (submitted !== false) {
      navigate("/profile");
    }
  }, [submitted, navigate]);

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const onSubmit = async ({
    projectTitle,
    description,
    gitRepositoryUrl,
    industryName,
    
  }) => {
    setSubmitted(true);

    const [error, userResponse] = await addProject(
      user.id,
      projectTitle,
      description,
      gitRepositoryUrl,
      industryName,
      tags,
      skills
    );

    if (error !== null) {
      setApiError(error);
    }
    setSubmitted(false);
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
      return (
        <Alert severity="error">Title has to be at least 5 characters.</Alert>
      );
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
      return (
        <Alert severity="error">
          Description has to be at least 15 characters.
        </Alert>
      );
    }
  })();

  const errorMessageGitRepositoryUrl = (() => {
    if (!errors.gitRepositoryUrl) {
      return null;
    }

    if (errors.gitRepositoryUrl.type === "required") {
      return <Alert severity="error">Git Repositoyry Url is required.</Alert>;
    }

    if (errors.gitRepositoryUrl.type === "minLength") {
      return (
        <Alert severity="error">
          Git Repositoyry Url has to be at least 10 characters.
        </Alert>
      );
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
      return (
        <Alert severity="error">
          Industry name has to be at least 5 characters.
        </Alert>
      );
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
      return (
        <Alert severity="error">Tag has to be at least 2 characters.</Alert>
      );
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
      return (
        <Alert severity="error">
          Skill has to be at least one character long.
        </Alert>
      );
    }
  })();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <fieldset>
          <legend>Project form:</legend>
          {errorMessageTitle}
          {errorMessageDescription}
          {errorMessageGitRepositoryUrl}
          {errorMessageIndustryName}
          <p>
            <label htmlFor="projectTitle">Title:</label>
            <input
              type="text"
              placeholder="Project Title"
              {...register("projectTitle", titleConfig)}
            />
          </p>
          <p>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              placeholder="Project Description"
              {...register("description", descriptionConfig)}
            />
          </p>
          <p>
            <label htmlFor="gitRepositoryUrl">Git Repository URL:</label>
            <input
              type="text"
              placeholder="Git Repository URL"
              {...register("gitRepositoryUrl", gitRepositoryUrlConfig)}
            />
          </p>
          <p>
            <label htmlFor="industryName">Industry:</label>
            <input
              type="text"
              placeholder="Industry"
              {...register("industryName", industryNameConfig)}
            />
          </p>
            Tags:
            <TagsInput />
         
            Skills:
            <SkillsInput />
        </fieldset>
        
        <button type="submit" onKeyDown={checkKeyDown}>
          Submit form
        </button>
        {apiError && <p>{apiError}</p>}
      </form>
    </>
  );
};

export default AddProjectPage;
