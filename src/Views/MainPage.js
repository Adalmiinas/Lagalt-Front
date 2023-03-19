import { useEffect, useState } from "react";
import MainView from "../Components/Main/MainView";
import UserService from "../Service/userservice";
const MainPage = () => {
  const [user, setuser] = useState("");

  useEffect(() => {
    setuser(UserService.getUsername());
  }, []);
  return (
    <>
      <h1>Main</h1>

      <div>
        <p className="lead">Please authenticate yourself!</p>
        <p>
          <button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>
            Login
          </button>
        </p>
      </div>

      {UserService.kc && (
        <div>
          <h1>Logged in</h1>

          <p>{() => UserService.getUsername()}</p>
          <p>hello user!</p>
        </div>
      )}

      <MainView />
    </>
  );
};

export default MainPage;
