import { createContext, useState, useContext } from "react";
import { STORAGE_KEY_USER } from "../Const/storageKeys";
import { storageRead } from "../Utils/Storage";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(storageRead(STORAGE_KEY_USER));

  const state = {
    user,
    setUser,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserProvider;
