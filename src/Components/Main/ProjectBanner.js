import { Card, CardActions, CardContent, Typography, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import "./styles/style.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Tags from "./Tags";
import FactoryIcon from "@mui/icons-material/Factory";
import Skills from "./Skills";
import { useKeycloak } from "@react-keycloak/web";
import { updateViewHistory } from "../../Service/UserInfo";
import { storageRead } from "../../Utils/Storage";

export const ProjectBanner = props => {
  const { user, setUser } = useUser();
  const { keycloak } = useKeycloak();
  let tags = "";
  let skills = "";

  const ongoingProjects = props.array.filter(el => {
    if (el.status != null) {
      if (el.status !== "Ongoing") {
        return el;
      }
    }
    return el;
  });

  const categorizedData = ongoingProjects.filter(el => {
    if (props.category === null) {
      return el;
    } else {
      if (el.industry.industryName != null) {
        return el.industry.industryName.toLowerCase().includes(props.category);
      }
      return "";
    }
  });

  const filteredData = categorizedData.filter(el => {
    tags = "";
    skills = "";
    if (props.input === null) {
      return el;
    } else {
      if (el.title != null) {
        el.skills.forEach(skill => (skills += skill.skillName));
        el.tags.forEach(tag => (tags += tag.tagName));
        return el.title.toLowerCase().includes(props.input) || skills.toLowerCase().includes(props.input) || tags.toLowerCase().includes(props.input);
      }
      return "";
    }
  });
  const HandleUserHistory = id => {
    console.log(id);
  };
  return filteredData.map((project, index) => (
    <div key={project.id} style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      <Card
        onMouseEnter={() => HandleUserHistory(project.id)}
        key={project.id}
        sx={{
          minWidth: "60%",
          maxWidth: "60%",
          justifyContent: "center",
          position: "relative",
          minHeight: "200px",
          borderRadius: "12px",
          boxShadow: " 12px 12px 2px 1px rgba(0, 0, 255, .2)",
          backgroundColor: "violet"
        }}
      >
        <CardContent>
          <Typography variant="h3" sx={{ paddingBottom: "1rem", fontFamily: "Roboto" }}>
            {" "}
            {project.title}
          </Typography>
          <Typography sx={{ paddingBottom: "1rem" }}> {project.description}</Typography>
          <div style={{ display: "flex", marginBottom: "5rem" }}>
            <div>
              <Chip color="darkViolet" icon={<FactoryIcon fontSize="small" />} label={project.industry.industryName} />
            </div>

            <div key={"tag" + index} style={{ paddingLeft: "2rem" }}>
              <Tags project={project} />
            </div>

            <div key={"skills" + index} style={{ paddingLeft: "2rem" }}>
              <Skills project={project} />
            </div>
          </div>

          {user != null && project.projectUsers.filter((x, key) => x.userId === user.id && x.isOwner === true).length === 1 && (
            <Chip
              color="darkViolet"
              padding="1rem"
              size="small"
              label="Owner"
              icon={<AdminPanelSettingsIcon />}
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                padding: "1rem",
                margin: "5px"
              }}
            />
          )}
        </CardContent>

        {keycloak.authenticated && (
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => updateViewHistory(user.id, project.id).then(x => setUser(storageRead("logged-user")))}
              className="project-view-buttons"
              LinkComponent={Link}
              to={`/project/${project.id}`}
              color="darkViolet"
              sx={{
                position: "absolute",
                bottom: "0px",
                left: "0px",
                borderRadius: "12px",
                margin: "1rem"
              }}
            >
              View More
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  ));
};
