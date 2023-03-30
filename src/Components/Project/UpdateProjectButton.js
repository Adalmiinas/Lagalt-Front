import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import UpdateProject from "./UpdateProject";

/**
 * Update project button that opens a modal with the form.
 * @param {*} props
 */
const UpdateProjectButton = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
          Update project
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: "15%",
              left: "40%",
              width: "100%",
              bgcolor: "violet",
              border: "2px solid #000",
              p: 4,
              boxShadow: 24,
              borderRadius: "12px",
              overflow: "auto",
              maxWidth: "20%",
              maxHeight: "70%",
              zIndex: "modal",
            }}
          >
            <UpdateProject open={setOpen} projectId={props.projectId}/>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default UpdateProjectButton;
