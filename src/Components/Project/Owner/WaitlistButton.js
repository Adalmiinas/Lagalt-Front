import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import WaitList from './WaitList';

const WaitlistButton = (props) => {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => { 
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    return (
        <>
            <div>
            <Button onClick={handleOpen} variant="contained" sx={{margin: "1rem"}}>Waitlist</Button>
            <Modal open={open} onClose={handleClose}>
                <Box>
                <h1>Waitlist</h1> 
                <WaitList project={props.project} loading={props.loading} />
                </Box>
            </Modal>
            </div>
        </>
    )
}
export default WaitlistButton;