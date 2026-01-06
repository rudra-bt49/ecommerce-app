import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_KEY = "cartItems";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /* Load cart from localStorage */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setCartItems(stored);
  }, []);

  /* Persist cart */
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
            : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: Math.min(qty, 10) }
          : i
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  };

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
