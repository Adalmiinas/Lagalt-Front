import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import "./styles/style.css";
export const ProjectBanner = props => {
  const { user } = useUser();

  const filteredData = props.array.filter(el => {
    if (props.input === null) {
      return el;
    } else {
      if (el.title != null) {
        return el.title.toLowerCase().includes(props.input);
      }
      return "";
    }
  });

  return filteredData.map((project, index) => (
    <div key={project.id} style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      <Card sx={{ minWidth: "50%", minHeight: "250px", border: "2px solid black", boxShadow: "1px 1px 1px", borderRadius: "5px", backgroundColor: blue[700] }}>
        <CardContent>
          <Typography variant="h5"> {project.title}</Typography>
          <Typography> {project.description}</Typography>
          <Typography> {project.gitRepositoryUrl}</Typography>
          {user != null && project.projectUsers.filter(x => x.userId === user.id && x.isOwner === true).length === 1 && <Typography>{project.projectUsers.userId} Owner</Typography>}
        </CardContent>  
        {user && (
          <CardActions sx={{ justifyContent: "center" }}>
            <Button className="project-view-buttons" LinkComponent={Link} to={`/project/${project.id}`} variant="contained" color="warning">
              View More
            </Button>
          </CardActions>
        )}
        {!user && (
          <Button variant="contained" color="warning">
            To view you need to sign in first!
          </Button>
        )}
      </Card>
    </div>
  ));
};
