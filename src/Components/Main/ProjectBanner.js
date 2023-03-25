import { Card, CardActions, CardContent, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import "./styles/style.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Tags from "./Tags";
import FactoryIcon from "@mui/icons-material/Factory";
import Skills from "./Skills";
import { display, fontFamily } from "@mui/system";

export const ProjectBanner = props => {
  const navigation = useNavigate();
  const { user } = useUser();
  let tags = "";
  let skills = "";

  const categorizedData = props.array.filter(el => {
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

  return filteredData.map((project, index) => (
    <div key={project.id} style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      <Card
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

          {user != null && project.projectUsers.filter((x, key) => x.userId === user.id && x.isOwner === true).length === 0 && (
            <Typography
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                padding: "1rem",
                margin: "1rem"
              }}
            ></Typography>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
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
      </Card>
    </div>
  ));
};
