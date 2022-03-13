import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilter, { useCustomFilter } from "../components/ProductFilter";
import { data1 as productsData } from "../context & data/products";
import { useUserContext } from "../context & data/UserContext";

const ProductPage = () => {
  const [filter, setFilter] = useState({});
  const data = useCustomFilter(productsData, filter);
  const { state } = useUserContext();

  let wishlistData = data.map((entry) => {
    if (state.wishlist.includes(entry.id)) return { ...entry, wishlist: true };
    else return entry;
  });

  return (
    <div className="section productsPage">
      <div className="container">
        <ProductFilter setFilter={setFilter} />
        <div className="productsContainer gap">
          {wishlistData.map((entry) => {
            return <ProductCard key={entry.id} data={entry} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
