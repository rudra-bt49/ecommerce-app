import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { title, price, image, category, rating } = product;

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img src={image} alt={title} />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title" title={title}>
          {title}
        </h3>

        <p className="product-card__category">{category}</p>

        <div className="product-card__meta">
          <span className="product-card__price">${price}</span>
          <span className="product-card__rating">
            ⭐ {rating.rate} ({rating.count})
          </span>
        </div>

        <button className="btn btn--primary product-card__btn">
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
