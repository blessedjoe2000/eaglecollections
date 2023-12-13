"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (ls && ls.getItem("favorite")) {
      setFavoriteIds(JSON.parse(ls.getItem("favorite")));
    }
  }, []);

  const addProduct = (product) => {
    setCartProducts((prev) => [...prev, product]);
  };

  const reduceProduct = (product) => {
    setCartProducts((prev) => {
      const productPosition = prev.indexOf(product);

      if (productPosition !== -1) {
        return prev.filter((id, index) => index !== productPosition);
      }
      return prev;
    });
  };

  const addToFavorite = (productId) => {
    setFavoriteIds((prev) => {
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
    setCartProducts([]);
    ls?.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        clearCart,
        addToFavorite,
        favoriteIds,
        setFavoriteIds,
        reduceProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
