import { useEffect, useState } from "react";
import "./ProductSearch.scss";

const ProductSearch = ({ products, onSearch }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      onSearch(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(debouncedQuery)
    );

    onSearch(filtered);
  }, [debouncedQuery, products, onSearch]);

  return (
    <div className="product-search">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="product-search__input"
      />
    </div>
  );
};

export default ProductSearch;
