import { Card, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { fetchProjectById } from "../../Service/ProjectInfos";
import UsersList from "./UsersList";
import MessageBoard from "./MessageBoard/MessageBoard";
import WaitlistButton from "./Owner/WaitlistButton";
import ApplyButton from "./Apply/ApplyButton";
import FactoryIcon from "@mui/icons-material/Factory";
import Tags from "../Main/Tags";
import Skills from "../Main/Skills";

const ProjectPage = ({ id }) => {
  const [project, setProject] = useState("");
  const { user } = useUser();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getProjectInfo(id);
  }, [id]);

  useEffect(() => {
    setLoad(false);
    getProjectInfo(id);
  }, [load, id]);

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
              <UsersList project={project} loading={setLoad} />
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
                  minWidth: "50%",
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
                <p>{project.description}</p>
                {project.gitRepositoryUrl?.length !== 0 && (
                  <p>{project.gitRepositoryUrl}</p>
                )}

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
                      <WaitlistButton project={project} loading={setLoad} />
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
