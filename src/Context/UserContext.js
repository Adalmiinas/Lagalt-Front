import { createContext, useState, useContext } from "react";
import { storageRead } from "../Utils/Storage";

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({children}) => {
    
    const [user, setUser] = useState(storageRead("logged-user"));

    const state = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;