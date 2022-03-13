import { useUserContext } from "../context & data/UserContext";
import { useNavigate } from "react-router-dom";
import "./css/ProductCard.css";

const ProductCard = ({ data, type, clickHandler }) => {
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const addToCart = () => {
    dispatch({ for: "cart", payload: data, type: "add" });
    if (clickHandler) clickHandler();
  };

  const redirectToProductPage = () => {
    navigate(`/product/${data.id}`, { state: data });
  };

  return (
    <div className={`productListing`}>
      <div className="productListing_header">
        <img src={data.image} alt="Product" />

        <div
          className="productListing_wishlistIcon"
          onClick={() =>
            dispatch({ for: "wishlist", type: "add", payload: data.id })
          }
        >
          <i className={`${data.wishlist ? "fas" : "far"} fa-heart`}></i>
        </div>
      </div>
      <div className="productListing_content">
        <h5 className="productListing_title" onClick={redirectToProductPage}>
          {data.name}
        </h5>
        <div className="productListing_price">
          <h4>Rs .{data.price - (data.discount / 100) * data.price}</h4>
          {/* <h3>Rs .{data.price}</h3> */}
        </div>
      </div>
      <button
        className={`productListing_action ${data.wishlist && "forWishlist"}`}
        onClick={addToCart}
      >
        {data.wishlist ? "Move To Cart" : "Add To Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
