import { Chip } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

const Tags = props => {
  return props.project.tags.map((tag, index) => <Chip key={index + tag} icon={<TagIcon fontSize="small" />} label={tag.tagName}></Chip>);
};
export default Tags;
