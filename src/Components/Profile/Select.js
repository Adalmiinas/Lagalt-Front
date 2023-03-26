import { AddModerator, Favorite, LocationOn, Restore } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { async } from "q";
import React, { useEffect, useState } from "react";

function SelectHeader({ handleProjectList }) {

  const [value, setValue] = useState("");

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction onClick={() => handleProjectList(1)} label="My Projects" icon={<AddModerator />} />
      <BottomNavigationAction onClick={() => handleProjectList(2)} label="Joined Projects" icon={<Favorite />} />
      <BottomNavigationAction onClick={() => handleProjectList(3)} label="History" icon={<Restore />} />
    </BottomNavigation>
  );
}

export default SelectHeader;
