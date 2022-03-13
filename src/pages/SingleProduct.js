import SingleProductPage from "../components/SingleProductPage";
import { data1 as prodsData } from "../context & data/products";

const SingleProduct = () => {
  const data = window.history.state
    ? window.history.state
    : prodsData.find(
        (entry) => entry.id === window.location.pathname.split("/")[3]
      );

  return (
    <div className="section">
      <div className="container">
        <SingleProductPage data={data} />
      </div>
    </div>
  );
};

export default SingleProduct;
