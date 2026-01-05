import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product/product.service";
import ProductCard from "../../components/product/ProductCard/ProductCard";

import "./Products.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="products__status">Loading products...</p>;
  }

  if (error) {
    return <p className="products__status products__status--error">{error}</p>;
  }

  return (
    <section className="products">
      <h2 className="products__title">All Products</h2>

      <div className="products__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
