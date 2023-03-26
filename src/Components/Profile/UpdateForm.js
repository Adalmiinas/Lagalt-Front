import { Password } from "@mui/icons-material";
import { Button, linkClasses, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { updateUserInfo, userById } from "../../Service/UserInfo";
import { storageSave } from "../../Utils/Storage";
import SkillsInput, { clearSkillsList, returnedListSkills } from "../Project/SkillsInput";

const usernameConfig = {
    required: true,
    minLength: 4
}

const UpdateForm = () => {

    const {user} = useUser();
    const navigate = useNavigate()
    const [apiError, setApiError] = useState(null);

    const [careerTitle, setCareerTitle] = useState()
    const [email, setEmail] = useState("")
    const [portfolio, setPortfolio] = useState("")
    const [description, setDescription] = useState("")

    const checkKeyDown = (e) => {
        if (e.key === "Enter") e.preventDefault();
    };

    const profileSuccessfullyUpdatedAlert = () => {
        alert("Project successfully updated!");
    };

    const handleSubmitClick = async () => {
        
        const skills = returnedListSkills()
        console.log(skills)
        const [error, userResponse] = await updateUserInfo(
          user.id,
          user.username,
          careerTitle,
          email,
          portfolio,
          description,
          skills
        );
    
        if (error !== null) {
          setApiError(error);
        }
        getUpdatedUser()
        clearSkillsList()
        profileSuccessfullyUpdatedAlert();
        navigate("/profile")
    }

    const getUpdatedUser = async () => {
        const [error, fetchedUser] = await userById(user.id);
        if(error !== null){
            return;
        }
        else{
            
        }
    }

    return (
        <>
            <div style={{ alignItems: "center", flexDirection: "column", display: "flex"}}>
                <h2 style={{ color:"#787CD1"}}>UPDATE ACCOUNT INFORMATION</h2>
                <TextField label="Career Title" value={careerTitle} onChange={e => setCareerTitle(e.target.value)}/>
                <p></p>
                <TextField label="Email" value={email}onChange={e => setEmail(e.target.value)}/>
                <p></p>
                <TextField label="Portfolio" value={portfolio} onChange={e => setPortfolio(e.target.value)}/>
                <p></p>
                <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                <p></p>
                <SkillsInput/>
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
                    }}} 
                    variant="contained" onClick={handleSubmitClick} onKeyDown={checkKeyDown} >
                Update
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
                    }}}
                    variant="contained" LinkComponent={Link} to="/profile">
                    Cancel
                </Button>
                </div>
            </div>
        </>
    )
}

export default UpdateForm;
