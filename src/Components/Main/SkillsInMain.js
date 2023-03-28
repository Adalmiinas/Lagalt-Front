import { Chip } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";

const SkillsInMain = props => {
  return props.project.skills.map((skill, index) => 
  props.user?.skills.some(s => s.skillName.toLowerCase() === skill.skillName.toLowerCase()) > 0 ?
   <Chip key={index + skill} color= "secondary" icon={<TerminalIcon fontSize="small" />} label={skill.skillName}></Chip> :
   <Chip key={index + skill}  icon={<TerminalIcon fontSize="small" />} label={skill.skillName}></Chip> );
};
export default SkillsInMain;
