import { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, {
    cart: {
      data: [],
      totalQauntity: 0,
    },
    wishlist: [],
    userData: {
      isAuth: false,
      token: "",
      address: [],
    },
  });

  useEffect(() => {
    dispatch({ for: "userData", type: "update" });
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
