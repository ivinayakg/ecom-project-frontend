import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetData } from "../API";
import ProductCard from "../components/ProductCard";
import ProductFilter, { useCustomFilter } from "../components/ProductFilter";
import { useUserContext } from "../context & data/UserContext";

const ProductPage = () => {
  const { filterName, catergoryName } = useParams();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const { state } = useUserContext();

  // this is the setup to use filter
  const [filter, setFilter] = useState({});
  const data = useCustomFilter(productsData, filter);

  let wishlistData = data.map((entry) => {
    if (state.wishlist?.find((wish) => wish.id === entry.id))
      return { ...entry, wishlist: true };
    else return entry;
  });

  //filter data by a name
  let filteredData = wishlistData.filter((entry) => {
    return filterName !== "none" && filterName
      ? entry.name.toLowerCase().includes(filterName)
      : true;
  });

  //to get all the products from the backend API
  useEffect(() => {
    GetData("/products").then((data) => setProductsData(data.products));
  }, []);

  //to see if the url has any catergory filter
  useEffect(() => {
    if (catergoryName) {
      setFilter((prev) => ({ ...prev, brand: [catergoryName] }));
    }
  }, [catergoryName]);

  // these are props passed down to th ProductFilter componenet
  const productFilterProps = {
    setFilter: setFilter,
    buttonFun: () => navigate("/shop/filterby=none"),
    data: {
      brands: productsData.reduce(
        (prev, curr) =>
          prev.includes(curr.brand) ? prev : [...prev, curr.brand],
        []
      ),
    },
  };

  return (
    <div className="section productsPage">
      <div className="container">
        <ProductFilter {...productFilterProps} />
        <div className="productsContainer gap">
          {filteredData.map((entry) => {
            return <ProductCard key={entry.id} data={entry} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
