import { useState } from "react";

import MainView from "../Components/Main/MainView";
import LoggedIn from "../Components/Renders/LoggedIn";
import RenderOnAnonymous from "../Components/Renders/RenderOnAnonymous";
import RenderOnAuthenticated from "../Components/Renders/RenderOnAuthenticated";
import Welcome from "../Components/Renders/Welcome";
import { loginUser, registerUser } from "../Service/UserInfo";
import UserService from "../Service/userservice";
const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isLoggedIn());
  if (isLoggedIn) {
    registerUser(UserService.getUsername(), UserService.givenName(), UserService.familyName(), UserService.email(), UserService.getId()).then(x => console.log(x));
    const data = loginUser(UserService.getId()).then(x => console.log(x));

    console.log(data);
  }

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
