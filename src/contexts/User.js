import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: { usr_Id: null, usr_Name: null },
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({usr_Id, usr_Name}) => {
    setUser({ usr_Id, usr_Name});
    console.log("User Context : ", user);
  };
  const value = { user, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
