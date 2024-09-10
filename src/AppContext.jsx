import React, { createContext, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [counter, setCounter] = React.useState(0);
  return (
    <AppContext.Provider
      value={{
        counter,
        increment: () => {
          console.log("Incrementing counter");
          setCounter((prevCounter) => prevCounter + 1);
        },
        decrement: () => {
          console.log("Decrementing counter");
          setCounter((prevCounter) => prevCounter - 1);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
