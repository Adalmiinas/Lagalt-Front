import {
  Box,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import {
  fetchProjectById,
  updateProjectStatus,
} from "../../Service/ProjectInfos";
import UsersList from "./UsersList";
import MessageBoard from "./MessageBoard/MessageBoard";
import WaitlistButton from "./Owner/WaitlistButton";
import ApplyButton from "./Apply/ApplyButton";
import FactoryIcon from "@mui/icons-material/Factory";
import Tags from "../Main/Tags";
import Skills from "../Main/Skills";
import UpdateProjectButton from "./UpdateProjectButton";

/**
 * Displays one project.
 * @param {*} id project id
 */
const ProjectPage = ({ id }) => {
  const [project, setProject] = useState("");
  const { user } = useUser();
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState("");

  /**
   * gets the project for the first time
   */
  useEffect(() => {
    getProjectInfo(id);
  }, [id]);

  /**
   * gets project details again after load is requested.
   */
  useEffect(() => {
    setLoad(false);
    getProjectInfo(id);
  }, [load, id]);

  /**
   * handles after status is changed.
   * @param {*} e
   */
  const handleChange = async (e) => {
    setStatus(e.target.value);
    await updateProjectStatus(user.id, project.id, e.target.value);
    setLoad(true);
  };

  /**
   * Gets the projects info with id
   * @param {*} id
   */
  const getProjectInfo = async (id) => {
    const [error, fetchedProject] = await fetchProjectById(id);
    console.log(error);
    setProject(fetchedProject);
  };

  return (
    <>
      {project && (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{ maxHeight: "50%", overflow: "auto", minWidth: "40%" }}
            >
              <h2>Participants</h2>
              {project.projectUsers?.map((projectUser, i) => {
                return (
                  <UsersList
                    key={i}
                    project={project}
                    projectUser={projectUser}
                    loading={setLoad}
                  />
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "right",
                padding: "2rem",
              }}
            >
              <Card
                sx={{
                  minWidth: "90%",
                  maxWidth: "90%",
                  justifyContent: "center",
                  position: "relative",
                  minHeight: "100%",
                  borderRadius: "12px",
                  boxShadow: " 12px 12px 2px 1px rgba(0, 0, 255, .2)",
                  backgroundColor: "violet",
                  padding: "1rem",
                }}
              >
                <h1 style={{ textTransform: "uppercase", fontFamily: "RBold" }}>
                  {project.title}
                </h1>

                <p>{project.status}</p>
                {user != null &&
                  project.projectUsers.filter(
                    (x) => x.userId === user.id && x.isOwner === true
                  ).length === 1 && (
                    <>
                      <Box sx={{ minWidth: "100px", marginTop: "16px" }}>
                        <FormControl fullWidth>
                          <InputLabel id="industry-select"> Status </InputLabel>
                          <Select
                            labelId="status-select"
                            id="status"
                            label="status"
                            value={status}
                            onChange={handleChange}
                          >
                            <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                            <MenuItem value={"Stalled"}>Stalled</MenuItem>
                            <MenuItem value={"Competed"}>Completed</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  )}
                <p>{project.description}</p>
                {project.gitRepositoryUrl?.length !== 0 && (
                  <p>{project.gitRepositoryUrl}</p>
                )}
                <p>Members in the project: {project.projectUsers?.length}</p>

                <div>
                  <Chip
                    color="darkViolet"
                    icon={<FactoryIcon fontSize="small" />}
                    label={project.industry.industryName}
                  />
                </div>

                <div key={"tag"} style={{ paddingTop: "1rem" }}>
                  <Tags project={project} />
                </div>

                <div
                  key={"skills"}
                  style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <Skills project={project} />
                </div>

                {user != null &&
                  project.projectUsers.filter(
                    (x) => x.userId === user.id && x.isOwner === true
                  ).length === 0 &&
                  project.projectUsers.filter((x) => x.userId === user.id)
                    .length === 0 && (
                    <ApplyButton project={project} loading={setLoad} />
                  )}

                {user != null &&
                  project.projectUsers.filter(
                    (x) => x.userId === user.id && x.isOwner === true
                  ).length === 1 && (
                    <>
                      <div
                        style={{ display: "inline", flexDirection: "column" }}
                      >
                        <WaitlistButton project={project} loading={setLoad} />
                        <UpdateProjectButton projectId={project.id}/>
                      </div>
                    </>
                  )}
              </Card>
            </div>
          </div>

          {user != null &&
            project.projectUsers.filter((x) => x.userId === user.id).length ===
              1 && <MessageBoard project={project} />}
        </div>
      )}
    </>
  );
};

export default ProjectPage;
