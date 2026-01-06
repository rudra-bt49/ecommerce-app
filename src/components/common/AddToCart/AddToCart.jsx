import "./AddToCart.scss";
import getClassNames from "../../../utils/getClassNames";
import { useCart } from "../../../context/CartContext";

const AddToCart = ({ fullWidth = false, className = "", product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      window.dispatchEvent(new Event("open-login"));
      return;
    }

    addToCart(product);
    alert("Product Added to Cart");
  };

  return (
    <button
      className={getClassNames(
        fullWidth,
        "add-to-cart--full",
        "",
        `add-to-cart ${className}`
      )}
      onClick={handleAddToCart}
    >
      🧺 Add to Cart
    </button>
  );
};

export default AddToCart;
