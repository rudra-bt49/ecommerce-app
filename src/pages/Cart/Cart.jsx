import { useCart } from "../../context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    clearCart,
    totalAmount,
  } = useCart();

  const placeOrder = () => {
    clearCart();
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
              <div className="cart-item__qty">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <p className="cart-item__subtotal">
                Subtotal: $
                {(item.price * item.quantity).toFixed(2)}
              </p>
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
