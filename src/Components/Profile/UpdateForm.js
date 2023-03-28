import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { updateUserInfo, userById } from "../../Service/UserInfo";
import { storageRead, storageSave } from "../../Utils/Storage";
import SkillsInput, { emptySkillList, clearSkillsList, returnedListSkills } from "../Project/SkillsInput";

const UpdateForm = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const [usernameToUpdate, setUsernameToUpdate] = useState(null);
  const [careerTitle, setCareerTitle] = useState(null);
  const [email, setEmail] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [description, setDescription] = useState(null);
  const [skills, setSkills] = useState([]);
  const [avatarSrc, setAvatarSrc] = useState(null);

  const checkKeyDown = e => {
    if (e.key === "Enter") e.preventDefault();
  };

  const profileSuccessfullyUpdatedAlert = () => {
    alert("Profile successfully updated!");
  };

  const handleSubmitClick = async () => {
    const skills = await returnedListSkills();
    await emptySkillList();
    const [error, userResponse] = await updateUserInfo(user.id, usernameToUpdate, careerTitle, email, portfolio, description, skills, avatarSrc);
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
      <div style={{ alignItems: "center", flexDirection: "column", display: "flex" }}>
        <h2 style={{ color: "#787CD1" }}>UPDATE ACCOUNT INFORMATION</h2>
        <TextField label="Career Title" value={careerTitle} onChange={e => setCareerTitle(e.target.value)} />
        <p></p>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <p></p>
        <TextField label="Portfolio" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
        <p></p>
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <p></p>
        <TextField label="Avatar Url" value={avatarSrc} onChange={e => setAvatarSrc(e.target.value)} />
        <p></p>
        <SkillsInput />
        <div>
          <Button
            sx={{
              maxWidth: "60%",
              justifyContent: "center",
              borderRadius: "12px",
              boxShadow: " 3px 3px 2px 1px rgba(0, 0, 255, .2)",
              backgroundColor: "violet",
              margin: 1,
              "&:hover": {
                backgroundColor: "#312B70",
                boxShadow: " 2px 2px 1px 1px rgba(120, 124, 209, 1)"
              }
            }}
            variant="contained"
            onClick={handleSubmitClick}
            onKeyDown={checkKeyDown}
          >
            Update
          </Button>
          <Button
            sx={{
              maxWidth: "60%",
              justifyContent: "center",
              borderRadius: "12px",
              boxShadow: " 3px 3px 2px 1px rgba(0, 0, 255, .2)",
              backgroundColor: "violet",
              margin: 1,
              "&:hover": {
                backgroundColor: "#312B70",
                boxShadow: " 2px 2px 1px 1px rgba(120, 124, 209, 1)"
              }
            }}
            variant="contained"
            LinkComponent={Link}
            to="/profile"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
