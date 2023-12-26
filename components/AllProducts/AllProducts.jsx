"use client";

import { useFetchAllProduct } from "@/internalAPI/FetchAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "../providers/CartContext/CartContext";
import { useSearch } from "../providers/SearchProvider/SearchProvider";
import Spinner from "../Spinner/Spinner";

export default function AllProducts() {
  const { data, isPending, isError } = useFetchAllProduct();
  const { addToFavorite, favoriteIds } = useContext(CartContext);
  const { searchResults, resetSearchResults } = useSearch();

  useEffect(() => {
    resetSearchResults();
  }, [data]);

  const addFavorite = (productId) => {
    addToFavorite(productId);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-5">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white mx-5 text-center py-10 ">
        <h1 className="font-bold py-2 text-lg">Error fetching all products</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white mx-5 text-center py-10 ">
        <h1 className="font-bold py-2 text-lg">No products available</h1>
      </div>
    );
  }

  if (searchResults.length > 0) {
    return (
      <div className=" flex flex-wrap justify-center items-center gap-2 my-5">
        {searchResults.map((searchResult) => (
          <div
            key={searchResult._id}
            className="p-5 rounded-md bg-white shadow-sm"
          >
            <div>
              <div className="mb-2 scale-100 hover:scale-105 transition-transform duration-300">
                <Link href={`/product/${searchResult._id}`}>
                  {searchResult?.newPrice && (
                    <span className="bg-sharp-pink text-white px-2 absolute text-lg">
                      -
                      {Math.round(
                        (100 * (searchResult?.price - searchResult?.newPrice)) /
                          searchResult?.price
                      )}
                      %
                    </span>
                  )}
                  <Image
                    src={searchResult.images?.[0]}
                    alt={`${searchResult.title}`}
                    width={150}
                    height={200}
                    priority
                  />
                </Link>
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  {searchResult?.newPrice ? (
                    <div className="flex items-center gap-3">
                      <p className=" font-bold text-xl text-main-pink">
                        ${searchResult?.newPrice}
                      </p>
                      <p className=" font-bold line-through ">
                        ${searchResult?.price}
                      </p>
                    </div>
                  ) : (
                    <p className=" font-bold text-xl">${searchResult.price}</p>
                  )}

                  <svg
                    onClick={() => addFavorite(searchResult._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      favoriteIds.includes(searchResult._id)
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
                <Link href={`/product/${searchResult._id}`}>
                  <p>
                    {searchResult?.title?.trim().slice(0, 1).toUpperCase() +
                      searchResult?.title?.trim().slice(1)}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
                  {productData?.newPrice && (
                    <span className="bg-sharp-pink text-white px-2 absolute text-lg">
                      -
                      {Math.round(
                        (100 * (productData?.price - productData?.newPrice)) /
                          productData?.price
                      )}
                      %
                    </span>
                  )}
                  <Image
                    src={productData.images?.[0]}
                    alt={`${productData.title}`}
                    width={150}
                    height={200}
                    priority
                  />
                </Link>
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  {productData?.newPrice ? (
                    <div className="flex items-center gap-3">
                      <p className=" font-bold text-xl text-main-pink">
                        ${productData?.newPrice}
                      </p>
                      <p className=" font-bold line-through ">
                        ${productData?.price}
                      </p>
                    </div>
                  ) : (
                    <p className=" font-bold text-xl">${productData.price}</p>
                  )}

                  <svg
                    onClick={() => addFavorite(productData._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      favoriteIds?.includes(productData._id)
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
                  <p>
                    {productData?.title?.trim().slice(0, 1).toUpperCase() +
                      productData?.title?.trim().slice(1)}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
