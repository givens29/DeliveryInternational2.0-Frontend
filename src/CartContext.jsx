import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { authToken, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) return;

    const fetchCart = async () => {
      try {
        const response = await fetch("/api/Cart/getCart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setCart(result);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCart();
  }, [authToken, logout]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
