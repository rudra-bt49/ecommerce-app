import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product/product.service";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import "./Products.scss";

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="products__loader">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="products__status products__status--error">{error}</p>
    );
  }

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="products">
      <div className="products__container">
        <h2 className="products__title">All Products</h2>

        <div className="products__grid">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="products__pagination">
          <button
            className="btn btn--secondary"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            {`<< Previous`}
          </button>

          <span className="products__page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn--secondary"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            {`Next >>`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
