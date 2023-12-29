"use client";

import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function George() {
  const { addToFavorite, favoriteIds } = useContext(CartContext);
  const [allGeorges, setAllGeorges] = useState([]);

  const getGeorges = async () => {
    const response = await axios.get("/api/george");
    setAllGeorges(response.data);
  };

  useEffect(() => {
    getGeorges();
  }, [allGeorges]);

  const addFavorite = (productId) => {
    addToFavorite(productId);
  };

  if (!allGeorges.length) {
    return (
      <div className="bg-white mx-5 text-center py-10 ">
        <h1 className="font-bold py-2 text-lg">No George product available</h1>
      </div>
    );
  }

  return (
    <div className=" flex flex-wrap justify-center items-center gap-2 my-5">
      {allGeorges &&
        allGeorges.map((george) => (
          <div key={george._id} className="p-5 rounded-md bg-white shadow-sm">
            <div>
              <div className="mb-2 scale-100 hover:scale-105 transition-transform duration-300">
                <Link href={`/product/${george._id}`}>
                  {george?.newPrice && (
                    <span className="bg-sharp-pink text-white px-2 absolute text-lg">
                      -
                      {Math.round(
                        (100 * (george?.price - george?.newPrice)) /
                          george?.price
                      )}
                      %
                    </span>
                  )}
                  <Image
                    src={george.images?.[0]}
                    alt={`${george.title}`}
                    width={150}
                    height={200}
                    priority
                  />
                </Link>
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  {george?.newPrice ? (
                    <div className="flex items-center gap-3">
                      <p className=" font-bold text-lg text-main-pink">
                        ${george?.newPrice}
                      </p>
                      <p className=" font-bold line-through ">
                        ${george?.price}
                      </p>
                    </div>
                  ) : (
                    <p className=" font-bold text-lg text-black">
                      ${george.price}
                    </p>
                  )}

                  <svg
                    onClick={() => addFavorite(george._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      favoriteIds?.includes(george._id)
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
                <Link href={`/product/${george._id}`}>
                  <p>
                    {george?.title?.trim().slice(0, 1).toUpperCase() +
                      george?.title?.trim().slice(1)}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
