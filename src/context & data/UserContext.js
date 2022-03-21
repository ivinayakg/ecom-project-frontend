import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer, getDataCart } from "./CartReducer";

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

  useEffect(() => {
    UpdateData(state.userData.token, dispatch);
  }, [state.userData]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const UpdateData = (token, dispatch) => {
  if (token.length > 25) {
    getDataCart(dispatch);
  } else dispatch({ for: "cart", type: "local" }); //again only called when the user is not logged in
};

export const useUserContext = () => useContext(UserContext);

const GlobalReducer = (state, action) => {
  switch (action.for) {
    case "cart":
      const cartData = CartReducer(state.cart, action);

      /*To Make Sure that if the user is not logged in the data is stored in the localstorage */
      if (!state.userData.isAuth || state.userData.isAuth === "false") {
        if (state.cart.data.length >= 0) {
          localStorage.setItem("cartData", JSON.stringify(cartData.data));
        }
      }

      return {
        ...state,
        cart: cartData,
      };
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
