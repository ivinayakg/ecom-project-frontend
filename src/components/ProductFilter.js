import { useEffect, useMemo, useReducer } from "react";
import "./css/ProductFilter.css";

const ProductFilter = ({ setFilter, className }) => {
  const [state, dispatch] = useReducer(FilterReducer, {
    sort: null,
    onlyInStock: false,
    onlyFastDelivery: false,
    priceRange: 0,
    catergory: [],
  });

  useEffect(() => {
    setFilter(state);
  }, [state, setFilter]);

  return (
    <div className={`productFilter ${className ?? ""}`}>
      <div className="productFilter_heading">
        <h4>Filter</h4>
        <button
          className="productFilter_clear"
          onClick={() => dispatch({ type: "reset" })}
        >
          Clear
        </button>
      </div>
      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Price</h4>
        <input
          type="range"
          value={state.priceRange}
          id="priceRange"
          onChange={(e) =>
            dispatch({ type: "updatePrice", payload: e.target.value })
          }
        />
        <h4>Rs. {state.priceRange * 10}</h4>
      </div>

      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Sort By</h4>
        <div className="productListing_options">
          <label>
            High To Low
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "sort", payload: "highToLow" })}
              checked={state.sort === "highToLow"}
            />
          </label>
          <label>
            Low To High
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "sort", payload: "lowToHigh" })}
              checked={state.sort === "lowToHigh"}
            />
          </label>
          <label>
            None
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "sort", payload: null })}
              checked={state.sort === null}
            />
          </label>
        </div>
      </div>
      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Filter By Catergory</h4>
        <div className="productListing_options">
          {["H&M", "AJIO", "Reebok", "Bewakoof", "None"].map((entry, index) => {
            return (
              <label key={index}>
                {entry}
                <input
                  type="checkbox"
                  onChange={() =>
                    dispatch({ type: "catergory", payload: entry })
                  }
                  checked={state.catergory.includes(entry)}
                />
              </label>
            );
          })}{" "}
        </div>
      </div>
      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Filter Further</h4>
        <div className="productListing_options">
          <label>
            Only Fast Delivery
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "deliveryToggle" })}
              checked={state.onlyFastDelivery}
            />
          </label>
          <label>
            In Stock
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "stockToggle" })}
              checked={state.onlyInStock}
            />
          </label>
          <label>
            None
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "resetstockndelivery" })}
              checked={!state.onlyFastDelivery && !state.onlyInStock}
            />
          </label>
        </div>
      </div>

      {/* helo */}
    </div>
  );
};

export const useCustomFilter = (data, state) => {
  const sortedArray = useMemo(
    () =>
      [...data].sort((first, second) =>
        state.sort !== null
          ? state.sort === "highToLow"
            ? second.price - first.price
            : first.price - second.price
          : 1
      ),
    [state.sort, data]
  );

  const filteredArray = sortedArray
    .filter((entry) => (state.onlyInStock ? entry.inStock : true))
    .filter((entry) => (state.onlyFastDelivery ? entry.fastDelivery : true));
  const rangeFiltered = filteredArray.filter(
    (entry) => entry.price > state.priceRange * 10
  );

  const catergoryFilter = rangeFiltered.filter((entry) =>
    state.catergory.length > 0 && !state.catergory.includes("None")
      ? state.catergory.includes(entry.catergory)
      : true
  );

  return catergoryFilter;
};

const FilterReducer = (state, action) => {
  switch (action.type) {
    case "sort":
      return { ...state, sort: action.payload };
    case "deliveryToggle":
      return { ...state, onlyFastDelivery: !state.onlyFastDelivery };
    case "stockToggle":
      return { ...state, onlyInStock: !state.onlyInStock };
    case "updatePrice":
      return { ...state, priceRange: action.payload };
    case "resetstockndelivery":
      return { ...state, onlyInStock: false, onlyFastDelivery: false };
    case "catergory":
      if (
        action.payload === "None" &&
        !state.catergory.includes(action.payload)
      ) {
        return { ...state, catergory: ["None"] };
      } else if (state.catergory.includes(action.payload)) {
        let catergories = state.catergory.filter(
          (entry) => entry !== action.payload && entry !== "None"
        );
        return { ...state, catergory: catergories };
      } else {
        let catergories = [...state.catergory, action.payload];
        return { ...state, catergory: catergories };
      }
    case "reset":
      return {
        sort: null,
        onlyInStock: false,
        onlyFastDelivery: false,
        priceRange: 0,
        catergory: ["None"],
      };
    default:
      return state;
  }
};

export default ProductFilter;
