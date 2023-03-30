import { Chip } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";

/**
 * Renders projects skills
 * @param {Object} Specific project
 * @returns {JSX.Element}
 */
const Skills = props => {
  return props.project.skills.map((tag, index) => <Chip key={index + tag} icon={<TerminalIcon fontSize="small" />} label={tag.skillName}></Chip>);
};
export default Skills;
