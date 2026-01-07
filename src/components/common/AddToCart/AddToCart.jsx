import { useState } from "react";
import "./AddToCart.scss";
import getClassNames from "../../../utils/getClassNames";
import { useCart } from "../../../context/CartContext";
import { createCart } from "../../../services/cart/cart.service";
import Snackbar from "../../common/Snackbar/Snackbar";

const AddToCart = ({ fullWidth = false, className = "", product }) => {
  const { addToCart } = useCart();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

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

      // ✅ Snackbar instead of alert
      showSnackbar("Product added to cart successfully 🧺");
    } catch (error) {
      console.error("Add to cart error:", error);
      showSnackbar(
        "Unable to add product to cart. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
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

      {/* ✅ Snackbar */}
      <Snackbar
        isOpen={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() =>
          setSnackbar((prev) => ({ ...prev, open: false }))
        }
      />
    </>
  );
};

export default AddToCart;
