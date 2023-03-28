import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { updateUserInfo, userById } from "../../Service/UserInfo";
import { storageRead, storageSave } from "../../Utils/Storage";
import SkillsInput, { emptySkillList, returnedListSkills } from "../Project/Input/SkillsInput";

const UpdateForm = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState();

  const [careerTitle, setCareerTitle] = useState(null)
  const [portfolio, setPortfolio] = useState(null)
  const [description, setDescription] = useState(null)
  const [avatarSrc, setAvatarSrc] = useState(null);

  const checkKeyDown = e => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleCancelButtonOnClick = () => {
    console.log("Tuleeko")
    navigate("/profile");
  };

  const profileSuccessfullyUpdatedAlert = () => {
    alert("Profile successfully updated!");
  };

  const handleSubmitClick = async () => {
    const skills = await returnedListSkills();
    await emptySkillList();

    const [error, userResponse] = await updateUserInfo(user.id, careerTitle, portfolio, description, skills, avatarSrc);

    if (userResponse) {
      console.log(userResponse);
    }
    
    if (error !== null) {
      setApiError(error);
    }
    
    const update = await userById(user.id);
    console.log(update);
    await emptySkillList();
    storageSave("logged-user", update[1]);
    setUser(storageRead("logged-user"));
    navigate("/profile");
    profileSuccessfullyUpdatedAlert();
  };

    return (
        <>
            <div style={{ alignItems: "center", flexDirection: "column", display: "flex"}}>
              <Typography variant="h4" sx={{color:"#a8ba30"}}>UPDATE ACCOUNT INFORMATION</Typography>
                <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"}, marginTop:"25px" }} label="Career Title" value={careerTitle} onChange={e => setCareerTitle(e.target.value)}/>
                <p></p>
                <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"} }} label="Portfolio" value={portfolio} onChange={e => setPortfolio(e.target.value)}/>
                <p></p>
                {/* <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"} }} label="Description" value={description} onChange={e => setDescription(e.target.value)}/> */}
                <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"} }} label="Description" multiline minRows={7} maxRows={7} style={{ minWidth: "50%" }} value={description} onChange={e => setDescription(e.target.value)} />
                <p></p>
                <TextField sx={{ input:{color:"whitesmoke", background:"#545ac4"} }} label="PhotoURL" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)}/>
                <p></p>
                <SkillsInput/>
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
                    }}} 
                    variant="contained" onClick={handleSubmitClick} onKeyDown={checkKeyDown} >
                Update
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
                    }} variant="contained" onClick={() => handleCancelButtonOnClick()}>
                  Cancel
                </Button>
              </div>
          </div>
      </>
    );

};

export default UpdateForm;