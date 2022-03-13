import Badge from "../components/Badge";
import Header from "../components/Header";
import {
  ShoppingCartIcon as Cart,
  HeartIcon as Heart,
} from "@heroicons/react/solid";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./ProductPage";
import { useUserContext } from "../context & data/UserContext";
import WishlistPage from "./Wishlist";
import LoginPage from "./Login";
import CartPage from "./Cart";
import SingleProduct from "./SingleProduct";

const Main = () => {
  const Brand = (
    <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
      Ecom Store
    </h1>
  );
  const { state } = useUserContext();
  const navigate = useNavigate();

  const searchHandler = (value) => {
    navigate(`/shop/?search=${value}`);
  };

  const links = [
    <Badge
      ClickHandler={() => navigate("/wishlist")}
      badgeContent={state.wishlist.length}
      children={<Heart />}
    />,
    <Badge
      badgeContent={state.cart.totalQauntity}
      children={<Cart />}
      ClickHandler={() => navigate("/cart")}
    />,
    <button className="btn btn--pri" onClick={() => navigate("/login")}>
      Login
    </button>,
  ];

  return (
    <>
      <Header brand={Brand} links={links} searchHandler={searchHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/?search=:filterName" element={<ProductPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </>
  );
};

export default Main;
