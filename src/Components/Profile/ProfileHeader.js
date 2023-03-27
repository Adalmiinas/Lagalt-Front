import { Button, Card, CardContent, Chip, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Light, ThumbUpSharp, Thunderstorm, VpnKey, Work } from "@mui/icons-material";
import Skills from "../Main/Skills";
import { Tooltip } from "bootstrap";
const ProfileHeader = ({ user }) => {
  const { keycloak } = useKeycloak();

  return (
    <>
      {user && keycloak.authenticated && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "right", padding: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              padding: "2rem"
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
                padding: "1rem"
              }}
            >
              <CardContent>
                <h1 style={{ textTransform: "uppercase", fontFamily: "RBold" }}>Hello {user?.username}</h1>
                {user?.gitRepositoryUrl?.length !== 0 && <p>{user?.gitRepositoryUrl}</p>}

                <div>
                  <Chip color="darkViolet" icon={<Work fontSize="small" />} label={user.careerTitle == null ? "Add career!" : user.careerTitle} />
                </div>
                <div key={"skills"} style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                  <span>
                    Skills:
                    {user?.skills.length < 1 ? (
                      "No skills yet added."
                    ) : (
                      <ul>
                        {user?.skills.map(s => (
                          <li key={s.skillName}>{s.skillName}</li>
                        ))}
                      </ul>
                    )}
                  </span>
                </div>
                <Typography sx={{ fontWeight: "bold" }}> Career: {user?.careerTitle == null ? "Add career to stand Out!" : user?.careerTitle}</Typography>
                <Typography sx={{ fontWeight: "bold" }}> Description: {user?.description == null ? "No Description added" : user?.description}</Typography>
                <Typography sx={{ fontWeight: "bold" }}> Email: {user?.email}</Typography>
                <Typography sx={{ fontWeight: "bold" }}> Portfolio: {user?.portfolio == null ? "Add Portfolio" : user.portfolio}</Typography>
              </CardContent>
              <Button LinkComponent={Link} to="/profile/update-profile">
                Update profile
              </Button>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
