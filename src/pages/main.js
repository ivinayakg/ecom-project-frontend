import Badge from "../components/Badge";
import Header from "../components/Header";
import {
  ShoppingCartIcon as Cart,
  HeartIcon as Heart,
  UserCircleIcon as User,
} from "@heroicons/react/solid";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./ProductPage";
import { useUserContext } from "../context & data/UserContext";
import WishlistPage from "./Wishlist";
import LoginPage from "./Login";
import CartPage from "./Cart";
import SingleProduct from "./SingleProduct";
import { NotificationParent } from "../components/Notification";
import Checkout from "./Checkout";
import Profile from "./Profile";

const Main = () => {
  const Brand = (
    <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
      Ecom Store
    </h1>
  );
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  const searchHandler = (value) => {
    navigate(`/shop/filterby=${value}`);
  };

  const links = [
    <Badge
      ClickHandler={() => navigate("/wishlist")}
      badgeContent={state.wishlist?.length ?? 0}
      children={<Heart />}
    />,
    <Badge
      badgeContent={state.cart?.totalQauntity}
      children={<Cart />}
      ClickHandler={() => navigate("/cart")}
    />,
    state.userData.isAuth ? (
      <button
        className="btn btn--pri"
        onClick={() => {
          localStorage.clear();
          dispatch({ type: "reset", for: "userData" });
          navigate(0);
        }}
      >
        Logout
      </button>
    ) : (
      <button className="btn btn--pri" onClick={() => navigate("/login")}>
        Login
      </button>
    ),
    state.userData.isAuth && (
      <button
        className="btn btn--pri user_icon"
        onClick={() => navigate("/profile")}
      >
        <User />
      </button>
    ),
  ];

  return (
    <>
      <Header brand={Brand} links={links} searchHandler={searchHandler} />
      <NotificationParent timeout={2500} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Outlet />}>
          <Route path="/shop/filterby=:filterName" element={<ProductPage />} />
          <Route
            path="/shop/filterbyBrand=:catergoryName"
            element={<ProductPage />}
          />
          <Route path="/shop" element={<ProductPage />} />
        </Route>
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
      </Routes>
    </>
  );
};

export default Main;
