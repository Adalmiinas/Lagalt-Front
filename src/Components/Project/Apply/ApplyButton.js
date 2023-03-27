import { Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useUser } from '../../../Context/UserContext';
import { addUserToProject } from '../../../Service/ProjectInfos';

const ApplyButton = (props) => {
    const [open, setOpen] = useState(false);
    const [motivation, setMotivation] = useState("");
    const { user } = useUser();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const applyProject = async () => {
      window.confirm("Are you sure you want to join the project? Your information will be shared with the owner.")
        const [error, data] = await addUserToProject(
          props.project.id,
          user.id,
          motivation
        );
      
        setMotivation("");
        setOpen(false);
       
        
    if(error !== null){
      window.alert("Error, while trying to apply to project.")
    }
    else {
      window.alert("Successful application! Wait for the owners acceptance.")
    }
      };
    
      const handleTextFieldChange = (event) => {
        setMotivation(event.target.value);
      };

    return (
        <>
            <div>
            <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="darkViolet"
                    sx={{
                      position: "absolute",
                      bottom: "0px",
                      left: "0px",
                      borderRadius: "12px",
                      margin: "1rem",
                    }}
                  >
                    Apply for project
                  </Button>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  top: "30%",
                  left: "30%",
                  width: 400,
                  bgcolor: 'violet',
                  border: "2px solid #000",
                  p: 4,
                  boxShadow: 24,
                  borderRadius:"12px"
                }}
              >
                <h3>
                  Write a short motivation letter about why you want to join the
                  project
                </h3>
                <TextField
                  label="motivation"
                  multiline
                  minRows={6}
                  value={motivation}
                  onChange={handleTextFieldChange}
                />
                <Button color="darkViolet"  onClick={applyProject}>Send application</Button>
              </Box>
            </Modal>
            </div>
        </>
    )
}
export default ApplyButton        ;