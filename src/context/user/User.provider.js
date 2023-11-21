import React, { useState } from "react";
import { UserContext } from "./User.context";

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
