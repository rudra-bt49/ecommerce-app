import "./AddToCart.scss";
import getClassNames from "../../../utils/getClassNames";

const AddToCart = ({ fullWidth = false, className = "" }) => {
  const handleAddToCart = (e) => {
    // Prevent navigation when used inside clickable cards
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      window.dispatchEvent(new Event("open-login"));
      return;
    }

    alert("Product Added in Cart");
    console.log("Product Added in Cart");
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
