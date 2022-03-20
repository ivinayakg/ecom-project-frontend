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

const GlobalReducer = (state, action) => {
  switch (action.for) {
    case "userData":
      switch (action.type) {
        case "update":
          return {
            ...state,
            userData: {
              ...state.userData,
              isAuth:
                localStorage.getItem("isAuth") &&
                localStorage.getItem("isAuth") !== "false" &&
                localStorage.getItem("token").length > 25
                  ? true
                  : false,
              token: localStorage.getItem("token") ?? "",
            },
          };
        case "reset":
          return {
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
          };
        default:
          return state;
      }

    default:
      return state;
  }
};
