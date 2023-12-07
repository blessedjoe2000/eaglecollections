"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProductIds, setCartProductIds] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState([]);

  useEffect(() => {
    if (cartProductIds?.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProductIds));
    }
  }, [cartProductIds]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProductIds(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (ls && ls.getItem("favorite")) {
      setFavoriteStatus(JSON.parse(ls.getItem("favorite")));
    }
  }, []);

  const addProduct = (productId) => {
    setCartProductIds((prev) => [...prev, productId]);
  };

  const removeProduct = (productId) => {
    setCartProductIds((prev) => {
      const idPosition = prev.indexOf(productId);

      if (idPosition !== -1) {
        return prev.filter((id, index) => index !== idPosition);
      }
      return prev;
    });
  };

  const addToFavorite = (productId) => {
    setFavoriteStatus((prev) => {
      let updatedFavorite = [];
      if (prev.includes(productId)) {
        updatedFavorite = prev.filter((id) => id !== productId);
      } else {
        updatedFavorite = [...prev, productId];
      }
      ls.setItem("favorite", JSON.stringify(updatedFavorite));

      return updatedFavorite;
    });
  };

  const clearCart = () => {
    setCartProductIds([]);
    ls?.removeItem("cart");
  };
  return (
    <CartContext.Provider
      value={{
        cartProductIds,
        setCartProductIds,
        addProduct,
        removeProduct,
        clearCart,
        addToFavorite,
        favoriteStatus,
        setFavoriteStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
