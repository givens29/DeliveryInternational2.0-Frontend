import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { authToken, logout } = useContext(AuthContext);
  const [cart, setCart] = useState({ dishInCarts: [] });

  const fetchCart = async () => {
    if (!authToken) return;

    const response = await fetch("/api/Cart/getCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setCart(data);
    } else if (response.status === 401) {
      logout();
    }
  };

  useEffect(() => {
    fetchCart();
  }, [authToken]);

  const addItem = async (dishId) => {
    try {
      const response = await fetch(`/api/Cart/addDishToCart?idDish=${dishId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Error adding item to cart.");
      }

      await fetchCart();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const incDecItem = async (dishId, isInCrease) => {
    try {
      const response = await fetch(
        `/api/Cart/increaseOrDecreaseDish?idDish=${dishId}&isIncrease=${isInCrease}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
      }

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Error removing item.");
      }

      const result = await response.text();
      await fetchCart();
      return {
        success: true,
        message: result || (isInCrease ? "Dish increased!" : "Dish decreased!"),
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, fetchCart, addItem, incDecItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
