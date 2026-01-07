import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { updateCart, deleteCart } from "../../services/cart/cart.service";
import Snackbar from "../../components/common/Snackbar/Snackbar";
import "./Cart.scss";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
  } = useCart();

  const cartId = localStorage.getItem("cartId");
  const userId = localStorage.getItem("userId");

  /* =========================
     SNACKBAR STATE
  ========================= */
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /* =========================
     HANDLERS
  ========================= */
  const handleDelete = async (productId) => {
    if (!cartId) return;

    try {
      await deleteCart(cartId);
      removeFromCart(productId);

      const updatedItems = cartItems.filter(
        (item) => item.id !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      showSnackbar("Item removed from cart");
    } catch (error) {
      console.error(error);
      showSnackbar("Unable to remove item", "error");
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (!cartId || newQuantity < 1) return;

    try {
      await updateCart(cartId, {
        id: Number(cartId),
        userId: Number(userId),
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity:
            item.id === productId ? newQuantity : item.quantity,
        })),
      });

      updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error(error);
      showSnackbar("Unable to update quantity", "error");
    }
  };

  const placeOrder = () => {
    clearCart();
    localStorage.removeItem("cartId");
    showSnackbar("Order Placed Successfully 🎉");
  };

  return (
    <>
      {/* CART UI */}
      {cartItems.length === 0 ? (
        <h2 className="cart__empty">Nothing in the Cart ☹️</h2>
      ) : (
        <section className="cart container">
          <h2 className="cart__title">My Cart</h2>

          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* LEFT */}
                <div className="cart-item__left">
                  <img src={item.image} alt={item.title} />

                  <div className="cart-item__details">
                    <h3>{item.title}</h3>
                    <p className="cart-item__price">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="cart-item__right">
                  <div className="cart-item__qty">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item__subtotal">
                    Subtotal: $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    className="cart-item__delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__summary">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>

            <button
              className="btn btn--primary"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </section>
      )}

      {/* ✅ SNACKBAR ALWAYS RENDERED */}
      <Snackbar
        isOpen={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={closeSnackbar}
      />
    </>
  );
};

export default Cart;
