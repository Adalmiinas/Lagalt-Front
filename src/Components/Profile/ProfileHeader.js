import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Popup from "reactjs-popup";
import UpdateForm from "./UpdateForm";

const ProfileHeader = ({ user }) => {
     
  return (
    <>
      <div style={{ display: 'flex', justifyContent:'right', padding:'10px'}}>
        <Card sx={{minWidth: '300px', backgroundColor: 'blue'}}>
          <CardContent>
            <h1>Hello {user.username} !</h1>
            <Typography sx={{fontWeight:'bold'}}> Career: {user.careerTitle}</Typography>
            <Typography sx={{fontWeight:'bold'}}> Description: {user.description}</Typography>           
            <Typography sx={{fontWeight:'bold'}}> Email: {user.email}</Typography>
            <Typography sx={{fontWeight:'bold'}}> Portfolio: {user.portfolio}</Typography>
            <Typography sx={{fontWeight:'bold'}}> Skills: {user.skills}</Typography>
          </CardContent>
          <CardActions>
          <Popup
            trigger={<Button variant="contained">Update info</Button>}
            position="top center"
            modal
            nested
          >
            {(close) => (
              <div 
                style={{
                  minHeight: "300px",
                  minWidth: "60%",
                  backgroundColor: "#ECD9BA",
                }}
              >
                <button style={{position: 'center'}} onClick={close}>&times;</button>
                <UpdateForm />
              </div>
            )}
          </Popup>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default ProfileHeader;
