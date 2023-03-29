import { Chip, TextField } from "@mui/material";
import { useState } from "react";

let newSkillList = [];
export const returnedListSkills = async () => {
  console.log(newSkillList);
  return newSkillList;
};

export const emptySkillList = async () => {
  newSkillList = [];
};

const SkillsInput = () => {
  const [skills, setSkills] = useState([]);
  const [text, setText] = useState("");

  /**
   * Adds skills after pressing the enter key.
   * @param {*} e 
   */
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    newSkillList.push({ skillName: text.trim() });
    setSkills([...skills, { skillName: text.trim() }]);
    setText("");
  };

  /**
   * removes skills from the list
   * @param {*} index 
   */
  const removeSkill = (index) => {
    setSkills(skills.filter((el, i) => i !== index));
    newSkillList = newSkillList.filter((el, i) => i !== index);
    console.log(newSkillList);
  };

  return (
    <>
      <span>
        <TextField
          sx={{
            margin: 0.75,
            input: { color: "whitesmoke", background: "#545ac4" },
          }}
          label="Skills"
          onKeyDown={handleKeyDown}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          {skills.map((item, index) => (
            <span>
              <Chip
                label={item.skillName}
                onDelete={() => removeSkill(index)}
                sx={{
                  backgroundColor: "#0000ff33",
                  color: "white",
                  "& .MuiChip-deleteIcon": { color: "#A8BA30" },
                }}
              />
            </span>
          ))}
        </div>
      </span>
    </>
  );
};

export default SkillsInput;
