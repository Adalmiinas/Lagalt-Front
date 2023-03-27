import { Card } from "@mui/material";
import React, { useEffect } from "react";

function StartingFillerPage() {
  return (
    <div key={1} style={{ display: "flex", justifyContent: "center", textAlign: "center", padding: "2px", marginRight: "10%", width: "70%" }}>
      <div>
        <Card></Card>
      </div>
    </div>
  );
}

export default StartingFillerPage;
