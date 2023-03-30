import { Button, Card, CardActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getUsersProjects } from "../../Service/ProjectInfos";

/**
 * Renders users projects
 * @param {id} User's id
 * @returns 
 */
const UserProjects = ({ id }) => {
  const navigation = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  /**
   * Fetches projects from API
   * @returns {Array}
   */
  const getProjects = async () => {
    const [error, userProject] = await getUsersProjects(id);
    if (error != null) {
      return "";
    } else {
      console.log(userProject);
      setProjects(userProject);
    }
  };

  return (
    <>
      <div key={1} style={{ display: "flex", justifyContent: "center", textAlign: "center", padding: "2px", marginRight: "10%", width: "70%" }}>
        <div
          className="message-container"
          style={{
            boxShadow: " 12px 12px 2px 1px rgba(0, 0, 255, .2)"
          }}
        >
          <TableContainer component={Paper} sx={{ display: "flex" }}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Projects you are part</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((item, key) => {
                  return (
                    <TableRow key={key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <h4>{item.project.title}</h4> <Typography>Status: {item.project.status}</Typography>
                        <Button
                          LinkComponent={Link}
                          to={`/project/${item.projectId}`}
                          variant="contained"
                          color="darkViolet"
                          sx={{
                            borderRadius: "12px",
                            float: "right"
                          }}
                        >
                          View more
                        </Button>
                      </TableCell>
                      {/* <TableCell align="right">{row.calories}</TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default UserProjects;
