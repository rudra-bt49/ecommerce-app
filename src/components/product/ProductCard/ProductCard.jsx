import { useNavigate } from "react-router-dom";
import AddToCart from "../../common/AddToCart/AddToCart";
import ROUTES from "../../../config/routes";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id, title, price, image, category, rating } = product;

  const goToDetails = () => {
    navigate(ROUTES.PRODUCT_DETAILS.replace(":id", id));
  };

  return (
    <article
      className="product-card"
      onClick={goToDetails}
    >
      <div className="product-card__image-wrapper">
        <img src={image} alt={title} />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title" title={title}>
          {title}
        </h3>

        <p className="product-card__category">{category}</p>

        <div className="product-card__meta">
          <span className="product-card__price">
            ${price.toFixed(2)}
          </span>
          <span className="product-card__rating">
            ⭐ {rating.rate}
          </span>
        </div>

        <AddToCart fullWidth />
      </div>
    </article>
  );
};

export default ProductCard;
