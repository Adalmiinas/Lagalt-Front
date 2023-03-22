import { Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { addUserToProject, fetchProjectById } from "../../Service/ProjectInfos";
import WaitList from "./WaitList";
import UsersList from "./UsersList";
import { useNavigate } from "react-router-dom";

const ProjectPage = ({ id }) => {
  const [project, setProject] = useState("");
  const [motivation, setMotivation] = useState("");
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  useEffect(() => {
    getProjectInfo(id);
  }, [id]);

  useEffect(() => {
    getProjectInfo(id);
  }, [load, id]);

  const getProjectInfo = async (id) => {
    const [error, fetchedProject] = await fetchProjectById(id);
    console.log(fetchedProject.waitList.userWaitingLists);
    setProject(fetchedProject);
  };

  const applyProject = async () => {
    console.log(motivation);
    const [error, data] = await addUserToProject(
      project.id,
      user.id,
      motivation
    );
    setOpen(false);
    console.log(error);
    console.log(data);
  };

  const handleTextFieldChange = (event) => {
    setMotivation(event.target.value);
  };

  const handleUpdateProjectClick = () => {
    navigate("/project/update-project", {state:{projectId: project.id}})
  }

  return (
    <>
      {" "}
      {project && (
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <p>Git url: {project.gitRepositoryUrl}</p>
          <p>User in project: {}</p>
          <p>Industry: {}</p>
          <p>Tags: {}</p>
          <Button onClick={handleOpen}>Apply for project</Button>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                top: "30%",
                left: "30%",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                p: 4,
                boxShadow: 24,
              }}
            >
              <h3>
                Write a sort motivation letter about why you want to join the
                project
              </h3>
              <TextField
                label="motivation"
                multiline
                minRows={6}
                value={motivation}
                onChange={handleTextFieldChange}
              />
                <Button onClick={applyProject}>Send application</Button>
            </Box>
          </Modal>
          
          {user != null &&
            project.projectUsers.filter(
              (x) => x.userId === user.id && x.isOwner === true
            ).length === 1 && (
              <>
                <Button onClick={handleUpdateProjectClick}>Update Project</Button>
              </>
            )}

          {user != null &&
            project.projectUsers.filter(
              (x) => x.userId === user.id && x.isOwner === true
            ).length === 1 && (
              <>
                <h1>Waitlist</h1> &&
                
                <WaitList project={project} loading={setLoad}/>
            
              </>
            )}

            {user != null &&
            project.projectUsers.filter(
              (x) => x.userId === user.id && x.isOwner === true
            ).length === 1 && (
              <>
                <h1>UsersList</h1>
                <UsersList project={project} />
              </>
            )}
        </div>
      )}
    </>
  );
};

export default ProjectPage;
