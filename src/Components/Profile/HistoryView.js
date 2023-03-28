import { Button } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { display, style } from "@mui/system";
function HistoryView() {
  const { user } = useUser();


  // Filter the clickedProjectHistories array to remove duplicate objects with the same projectId
  const clickedProjects = user.clickedProjectHistories.filter((item, index, self) => index === self.findIndex(project => project.projectId === item.projectId));
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
                  <TableCell>Projects</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clickedProjects.map((item, key) => {
                  return (
                    <TableRow key={key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <p>{item.project.title}</p>
                        <p>Status: {item.project.status}</p>
                        <span>Description: {item.project.description}</span>
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
}

export default HistoryView;

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
