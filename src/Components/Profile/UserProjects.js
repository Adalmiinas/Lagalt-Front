import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getUsersProjects } from "../../Service/ProjectInfos";

const UserProjects = props => {
  const navigation = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const navigateToProject = id => {
    navigation(`/project/${id}`);
  };

  const getProjects = async () => {
    const [error, userProject] = await getUsersProjects(props.id);
    if (error != null) {
      return "";
    } else {
      console.log(userProject);
      setProjects(userProject);
    }
  };

  return projects.map(({ project }, index) => (
    <div key={project.id} style={{ display: "flex", justifyContent: "center", textAlign: "center", padding: "10px", marginRight: "10%", width: "70%" }}>
      <div
        className="message-container"
        style={{
          boxShadow: " 12px 12px 2px 1px rgba(0, 0, 255, .2)"
        }}
      >
        <Card className="message-row">
          <h2 className="message-title" style={{ marginLeft: "10px" }}>
            Title: {project.title}
          </h2>
          <p className="message-author">Description: {project.description}</p>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button LinkComponent={Link} to={`/project/${project.id}`} sx={{ backgroundColor: "white" }}>
              View more
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  ));
};

export default UserProjects;
