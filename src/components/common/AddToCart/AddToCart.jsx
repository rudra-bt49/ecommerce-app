import "./AddToCart.scss";
import getClassNames from "../../../utils/getClassNames";
import { useCart } from "../../../context/CartContext";
import { createCart } from "../../../services/cart/cart.service";

const AddToCart = ({ fullWidth = false, className = "", product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      window.dispatchEvent(new Event("open-login"));
      return;
    }

    try {
      const response = await createCart({
        userId: Number(userId),
        products: [
          {
            productId: product.id,
            quantity: 1,
          },
        ],
      });

      if (response?.id) {
        localStorage.setItem("cartId", response.id);
      }

      addToCart(product);
      alert("Product Added to Cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Unable to add product to cart. Please try again.");
    }
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
