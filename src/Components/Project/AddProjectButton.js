import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddProjectPage from "./AddProjectPage";

const AddProjectButton = (props) => {
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
          variant="text"
          sx={{
            color:"black",
            textTransform: "none",
            justifyContent: "normal",
            alignItems: "normal"
          }}
        >
          Create project
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
              zIndex: "modal"
            }}
          >            
              <AddProjectPage/>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default AddProjectButton;