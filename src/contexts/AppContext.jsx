import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    userId: "",
    token: "",
    role: "user",
    singleComplaint:'',
    user: {},
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
