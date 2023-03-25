import { Password } from "@mui/icons-material";
import { Button, linkClasses, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { updateUserInfo, userById } from "../../Service/UserInfo";
import { storageRead, storageSave } from "../../Utils/Storage";
import SkillsInput, { emptySkillList, returnedListSkills } from "../Project/SkillsInput";

const usernameConfig = {
  required: true,
  minLength: 4
};

const UpdateForm = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const [usernameToUpdate, setUsernameToUpdate] = useState(null);
  //const [passwordToUpdate, setPasswordToUpdate] = useState("")
  const [careerTitle, setCareerTitle] = useState(null);
  const [email, setEmail] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [description, setDescription] = useState(null);
  const [skills, setSkills] = useState([]);

  const checkKeyDown = e => {
    if (e.key === "Enter") e.preventDefault();
  };

  const profileSuccessfullyUpdatedAlert = () => {
    alert("Project successfully updated!");
  };

  const handleSubmitClick = async () => {
    const skills = await returnedListSkills();
    emptySkillList();
    const [error, userResponse] = await updateUserInfo(user.id, usernameToUpdate, careerTitle, email, portfolio, description, skills);
    if (userResponse) {
      console.log(userResponse);
    }
    if (error !== null) {
      setApiError(error);
    }
    const update = await userById(user.id);
    console.log(update);
    storageSave("logged-user", update[1]);
    setUser(storageRead("logged-user"));
    navigate("/profile");
    profileSuccessfullyUpdatedAlert();
  };

  return (
    <>
      <h2>Update account information</h2>
      <TextField label="Username" value={usernameToUpdate} onChange={e => setUsernameToUpdate(e.target.value)} />
      <p></p>
      {/* <TextField
            required
            label="Password" 
            value={passwordToUpdate} 
            onChange={e => setPasswordToUpdate(e.target.value)}
        />
        <p></p> */}
      <TextField label="Career Title" value={careerTitle} onChange={e => setCareerTitle(e.target.value)} />
      <p></p>
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <p></p>
      <TextField label="Portfolio" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
      <p></p>
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <p></p>
      <SkillsInput />
      <Button onClick={handleSubmitClick} variant="contained" onKeyDown={checkKeyDown}>
        Update
      </Button>
      {/* <Button sx={{margin: 1}} variant="contained" onClick={handleCancelButtonOnClick}>
            Cancel
        </Button> */}
      <Button sx={{ margin: 1 }} variant="contained" LinkComponent={Link} to="/" />
    </>
  );
};

export default UpdateForm;
