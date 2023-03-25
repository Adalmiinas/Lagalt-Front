import { Chip, TextField } from "@mui/material";
import { useState } from "react";

let newSkillList = [];
export const returnedListSkills = async () => {
  console.log(newSkillList);
  return newSkillList;
};
export const emptySkillList = async () => {
    newSkillList = []
  };
const SkillsInput = () => {
  const [skills, setSkills] = useState([]);
  const [text, setText] = useState("");

  const handleKeyDown = e => {
    if (e.key !== "Enter") return;
    newSkillList.push({ skillName: text });
    setSkills([...skills, { skillName: text }]);
    setText("");
  };

  const removeSkill = index => {
    setSkills(skills.filter((el, i) => i !== index));
    newSkillList = newSkillList.filter((el, i) => i !== index);
    console.log(newSkillList);
  };

  return (
    <>
      <span>
        <TextField sx={{ margin: 0.75 }} label="Skills" onKeyDown={handleKeyDown} value={text} onChange={e => setText(e.target.value)} />
        <div>
          {skills.map((item, index) => (
            <span>
              <Chip label={item.skillName} onDelete={() => removeSkill(index)} />
            </span>
          ))}
        </div>
      </span>
    </>
  );
};

export default SkillsInput;
