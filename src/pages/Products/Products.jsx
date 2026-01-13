import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "../../services/product/product.service";

import ProductCard from "../../components/product/ProductCard/ProductCard";
import ProductFilter from "../../components/product/ProductFilter/ProductFilter";
import ProductSort from "../../components/product/ProductSort/ProductSort";
import ProductSearch from "../../components/product/ProductSearch/ProductSearch";
import Loader from "../../components/common/Loader/Loader";

import "./Products.scss";

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();

        setProducts(data);
        setFilteredProducts(data);
        setSearchedProducts(data);

        const max = Math.max(...data.map((p) => p.price));
        setSelectedPrice(Math.ceil(max));
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price), 0),
    [products]
  );

  /* =========================
     FILTER + SORT
  ========================= */
  useEffect(() => {
    let result = [...searchedProducts];

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category === selectedCategory
      );
    }

    result = result.filter((p) => p.price <= selectedPrice);

    if (sortOption === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    if (sortOption === "title") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [
    searchedProducts,
    selectedCategory,
    selectedPrice,
    sortOption,
  ]);

  if (loading) {
    return (
      <div className="products__loader">
        <Loader text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <p className="products__status products__status--error">
        {error}
      </p>
    );
  }

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const noProductsFound = filteredProducts.length === 0;

  return (
    <section className="products">
      <div className="products__container">
        <h2 className="products__title">All Products</h2>

        <ProductSearch
          products={products}
          onSearch={setSearchedProducts}
        />

        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          maxPrice={maxPrice}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
        />

        <ProductSort
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        {noProductsFound ? (
          <p className="products__status">
            No products found. Try adjusting your search or filters.
          </p>
        ) : (
          <>
            <div className="products__grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="products__pagination">
              <button
                className="btn btn--secondary"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage <= 1}
              >
                {"<< Previous"}
              </button>

              <span className="products__page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn--secondary"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages}
              >
                {"Next >>"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
