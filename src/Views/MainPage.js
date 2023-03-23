import { useState } from "react";

import MainView from "../Components/Main/MainView";
import LoggedIn from "../Components/Renders/LoggedIn";
import RenderOnAnonymous from "../Components/Renders/RenderOnAnonymous";
import RenderOnAuthenticated from "../Components/Renders/RenderOnAuthenticated";
import Welcome from "../Components/Renders/Welcome";
import { loginUser, registerUser } from "../Service/UserInfo";
import UserService from "../Service/userservice";
const MainPage = () => {
 
  return (
    <>
      <h1>Main</h1>

      <RenderOnAnonymous>
        <Welcome />
      </RenderOnAnonymous>

      <RenderOnAuthenticated>
        <LoggedIn />
      </RenderOnAuthenticated>

      <MainView />
    </>
  );
};

export default MainPage;
