import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import WaitList from "./WaitList";

const WaitlistButton = (props) => {
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
          Waitlist
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: "15%",
              left: "20%",
              width: "100%",
              bgcolor: "violet",
              border: "2px solid #000",
              p: 4,
              boxShadow: 24,
              borderRadius: "12px",
              overflow: "auto",
              maxWidth: "50%",
              maxHeight: "60%"
            }}
          >
            <h1>Waitlist</h1>
            {props.project.waitList.userWaitingLists.map((project, i) => {
              return (
                <WaitList
                  key={i}
                  projectUsers={project}
                  projectId = {props.project.id}
                  loading={props.loading}
                />
              );
            })}
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default WaitlistButton;
