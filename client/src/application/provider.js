import { createContext, useState } from "react";
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ children }) => {
  const [state, setState] = useState({});
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext();
