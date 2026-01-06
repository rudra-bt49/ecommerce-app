import "./ProductFilter.scss";
import "../../../utils/getClassNames.js"
import getClassNames from "../../../utils/getClassNames.js";

const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  selectedPrice,
  onPriceChange,
}) => {
  // Calculate percentage for the gradient
  const percentage = (selectedPrice / maxPrice) * 100;

  return (
    <section className="product-filter">
      <div className="product-filter__container">
        {/* Categories */}
        <div className="product-filter__categories">
          {["all", ...categories].map((category) => (
            <button
              key={category}
            //   className={`product-filter__category ${
            //     selectedCategory === category ? "active" : ""
            //   }`}
              className={getClassNames(
                selectedCategory === category,
                "active",
                "",
                "product-filter__category"
              )}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Price Range */}
        <div className="product-filter__price">
          <label>
            Max Price: <strong>${selectedPrice}</strong>
          </label>
          <div className="price-slider-wrapper">
            <input
              type="range"
              min="0"
              max={Math.ceil(maxPrice)}
              value={selectedPrice}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="price-slider"
              style={{
                "--slider-percentage": `${percentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilter;