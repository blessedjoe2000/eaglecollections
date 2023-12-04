"use client";

import { useFetchAllProduct } from "@/internalAPI/FetchAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AllProducts() {
  const { data, isPending, isError } = useFetchAllProduct();
  const [cartProducts, setCartProducts] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState([]);

  const addToCart = (productId) => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    setCartProducts((prev) => {
      const updatedCart = [...prev, productId];
      ls.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
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
      localStorage.setItem("favorite", JSON.stringify(updatedFavorite));

      return updatedFavorite;
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching all products</div>;
  }

  if (!data) {
    return <div>No products available</div>;
  }

  return (
    <div className=" flex flex-wrap justify-center items-center gap-2 my-5">
      {data &&
        data.map((productData) => (
          <div key={productData._id} className="p-5 shadow-md rounded-md">
            <div>
              <div className="mb-2">
                <Link href={`/product/${productData._id}`}>
                  <Image
                    src={productData.images[0]}
                    alt={`${productData.title}`}
                    width={250}
                    height={200}
                  />
                </Link>
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  <p className=" font-bold text-xl">${productData.price}</p>
                  <svg
                    onClick={() => addToFavorite(productData._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      favoriteStatus.includes(productData._id)
                        ? "w-6 h-6 fill-mid-pink"
                        : "w-6 h-6"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <Link href={`/product/${productData._id}`}>
                  {productData.title}
                </Link>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => addToCart(productData._id)}
                  className="bg-mid-pink py-1 px-3 rounded-md text-white hover:text-sharp-purple font-bold"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
