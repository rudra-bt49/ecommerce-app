import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import {
  updateCart,
  deleteCart,
} from "../../services/cart/cart.service";
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

  const handleDelete = async (productId) => {
    if (!cartId) return;

    try {
      await deleteCart(cartId);

      removeFromCart(productId);

      const updatedItems = cartItems.filter(
        (item) => item.id !== productId
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedItems)
      );
    } catch (error) {
      console.error("Delete cart error:", error);
      alert("Unable to remove item from cart");
    }
  };

  const handleUpdateQuantity = async (
    productId,
    newQuantity
  ) => {
    if (!cartId || newQuantity < 1) return;

    const productsPayload = cartItems.map((item) => ({
      productId: item.id,
      quantity:
        item.id === productId
          ? newQuantity
          : item.quantity,
    }));

    try {
      await updateCart(cartId, {
        id: Number(cartId),
        userId: Number(userId),
        products: productsPayload,
      });

      updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Update cart error:", error);
      alert("Unable to update quantity");
    }
  };

  const placeOrder = () => {
    clearCart();
    localStorage.removeItem("cartId");
    alert("Order Placed Successfully 🎉");
  };

  if (cartItems.length === 0) {
    return <h2 className="cart__empty">Nothing in the Cart ☹️</h2>;
  }

  return (
    <section className="cart container">
      <h2 className="cart__title">My Cart</h2>

      <div className="cart__items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item__left">
              <img src={item.image} alt={item.title} />
              <div className="cart-item__details">
                <h3>{item.title}</h3>
                <p className="cart-item__price">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="cart-item__right">
              {/* Quantity */}
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

              {/* Subtotal */}
              <p className="cart-item__subtotal">
                Subtotal: $
                {(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Delete */}
              <button
                className="cart-item__delete"
                onClick={() => handleDelete(item.id)}
                aria-label="Remove item"
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
  );
};

export default Cart;
