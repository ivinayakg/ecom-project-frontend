import { useUserContext } from "../context & data/UserContext";
import { data1 as producsData } from "../context & data/products";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { state, dispatch } = useUserContext();
  const wishlist = producsData.filter((entry) =>
    state.wishlist.includes(entry.id)
  );

  const ProductClickHandler = (id) => {
    dispatch({ for: "wishlist", type: "remove", payload: id });
  };

  return (
    <div className="section wishlist">
      <div className="container">
        <h1>The Wishlist</h1>
        <div className="wishlistContainer">
          {wishlist.map((entry) => {
            return (
              <ProductCard
                data={{ ...entry, wishlist: true }}
                key={entry.id}
                clickHandler={() => ProductClickHandler(entry.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
