import "./ProductSort.scss";

const ProductSort = ({ sortOption, onSortChange }) => {
  return (
    <section className="product-sort">
      <div className="product-sort__container">
        <label htmlFor="sort" className="product-sort__label">
          Sort By:
        </label>

        <select
          id="sort"
          className="product-sort__select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Default</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="title">Title (A → Z)</option>
        </select>
      </div>
    </section>
  );
};

export default ProductSort;
