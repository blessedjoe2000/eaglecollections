"use client";

import { useFetchAllProduct } from "@/internalAPI/FetchAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../providers/CartContext/CartContext";

export default function AllProducts() {
  const { data, isPending, isError } = useFetchAllProduct();
  const { addToFavorite, favoriteStatus, addProduct } = useContext(CartContext);

  const addToCart = (productId) => {
    addProduct(productId);
  };

  const addFavorite = (productId) => {
    addToFavorite(productId);
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
          <div
            key={productData._id}
            className="p-5 rounded-md bg-white shadow-sm"
          >
            <div>
              <div className="mb-2 scale-100 hover:scale-105 transition-transform duration-300">
                <Link href={`/product/${productData._id}`}>
                  <Image
                    src={productData.images?.[0]}
                    alt={`${productData.title}`}
                    width={250}
                    height={200}
                    priority
                  />
                </Link>
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  <p className=" font-bold text-xl">${productData.price}</p>
                  <svg
                    onClick={() => addFavorite(productData._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      favoriteStatus.includes(productData._id)
                        ? "w-6 h-6 fill-main-pink"
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
                  className="bg-main-pink py-1 px-3 rounded-md text-white hover:text-sharp-purple font-bold flex gap-1 justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <p>Add to cart</p>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
