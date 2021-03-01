import React, { createContext, useState, useEffect } from "react";

export type userType =
  | { lastName: string; flightNumber: string }
  | null
  | undefined;

export interface IAppContext {
  user: userType;
  setUser(user: userType): void;
}

export const appContext = createContext<IAppContext>({
  user: undefined,
  setUser: (user: userType) => {
    return;
  },
});

const AppContext: React.FC = (props) => {
  const [user, setUser] = useState<userType>();
  return (
    <appContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default AppContext;
