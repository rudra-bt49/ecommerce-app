import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/product/product.service";
import AddToCart from "../../components/common/AddToCart/AddToCart";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details__loader">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="product-details">
      <div className="product-details__container">
        <div className="product-details__image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-details__content">
          <h1>{product.title}</h1>
          <p className="product-details__category">{product.category}</p>

          <p className="product-details__price">
            ${product.price.toFixed(2)}
          </p>

          <p className="product-details__rating">
            ⭐ {product.rating.rate} ({product.rating.count})
          </p>

          <p className="product-details__description">
            {product.description}
          </p>

          <AddToCart fullWidth product={product}/>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
