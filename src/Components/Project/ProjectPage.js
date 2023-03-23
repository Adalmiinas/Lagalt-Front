import { Card, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { fetchProjectById } from "../../Service/ProjectInfos";
import UsersList from "./UsersList";
import { useNavigate } from "react-router-dom";
import MessageBoard from "./MessageBoard/MessageBoard";
import WaitlistButton from "./Owner/WaitlistButton";
import ApplyButton from "./Apply/ApplyButton";
import { maxWidth } from "@mui/system";

const ProjectPage = ({ id }) => {
  const [project, setProject] = useState("");
  const { user } = useUser();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getProjectInfo(id);
  }, [id]);

  useEffect(() => {
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
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              padding: "10px",
            }}
          >
            <Card
              sx={{ minWidth: "300px", backgroundColor: "mediumslateblue" }}
            >
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <p>Git url: {project.gitRepositoryUrl}</p>
              <p>{project.industryName}</p>
              <p>Tags</p>
              {user != null &&
                project.projectUsers.filter(
                  (x) => x.userId === user.id && x.isOwner === true
                ).length === 1 && (
                    <ApplyButton project={project} loading={setLoad}/>
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

         
                
            <Paper style = {{maxHeight: '100px', overflow: 'auto', maxWidth: '50%'}}>
                <h2>UsersList</h2>
                <UsersList project={project} loading={setLoad} />
            </Paper>

          <MessageBoard project={project} />
        </div>
      )}
    </>
  );
};

export default ProjectPage;
