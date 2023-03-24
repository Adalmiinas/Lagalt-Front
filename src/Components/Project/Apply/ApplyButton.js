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
        console.log(motivation);
        const [error, data] = await addUserToProject(
          props.project.id,
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

    return (
        <>
            <div>
            <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ margin: "1rem" }}
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