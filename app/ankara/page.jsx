"use client";

import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  CardContainer,
  CardDetails,
  ImageContainer,
  SpinnerContainer,
} from "@/app/products/page/[...page]/styles";
import { ComingSoon } from "@/app/accessories/styles";
import Spinner from "@/components/Spinner/Spinner";

export default function Ankara() {
  const [allAnkara, setAllAnkara] = useState([]);
  const [loading, setLoading] = useState(false);

  const { favoriteIds, addToFavorite } = useContext(CartContext);

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const getAnkara = async () => {
    try {
      const response = await axios.get(`/api/ankara`);
      setAllAnkara(response.data);
    } catch (error) {
      console.log("error fetching ankara data", error);
    }
  };

  useEffect(() => {
    getAnkara();
  }, []);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!allAnkara.length) {
    return (
      <SpinnerContainer>
        <ComingSoon>Coming soon...</ComingSoon>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <CardContainer>
      {allAnkara &&
        allAnkara.map((ankara) => {
          const isNew = new Date(ankara.createdAt) >= twentyDaysAgo;
          return (
            <CardDetails key={ankara._id}>
              <ImageContainer>
                <div className="mb-2 scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                  <Link href={`/product/${ankara._id}`}>
                    {ankara?.newPrice && (
                      <span className="bg-sharp-pink text-white px-2 absolute font-bold rounded-tl-md">
                        -
                        {Math.round(
                          (100 * (ankara?.price - ankara?.newPrice)) /
                            ankara?.price
                        )}
                        %
                      </span>
                    )}
                    {isNew && (
                      <span className="bg-main-blue text-white px-1 font-bold absolute right-0 rounded-tr-md">
                        NEW
                      </span>
                    )}
                    <Image
                      src={ankara.images?.[0]}
                      alt={`${ankara.title}`}
                      width={200}
                      height={250}
                      priority
                      className="object-cover w-[200px] h-[250px] rounded-md"
                    />
                  </Link>
                </div>
                <div>
                  <div className="flex justify-between items-center ">
                    {ankara?.newPrice ? (
                      <div className="flex items-center gap-1">
                        <p className=" font-bold text-lg text-main-pink">
                          ${ankara?.newPrice}
                        </p>
                        <p className=" font-bold line-through text-light-grey">
                          ${ankara?.price}
                        </p>
                      </div>
                    ) : (
                      <p className=" font-bold text-lg text-main-pink">
                        ${ankara.price}
                      </p>
                    )}

                    <svg
                      onClick={() => addFavorite(ankara._id)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={
                        favoriteIds?.includes(ankara._id)
                          ? "w-6 h-6 fill-sharp-pink text-sharp-pink cursor-pointer"
                          : "w-6 h-6 text-sharp-pink cursor-pointer"
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                  <Link href={`/product/${ankara._id}`}>
                    <p className="font-semi-bold text-white">
                      {ankara?.title?.trim().slice(0, 1).toUpperCase() +
                        ankara?.title?.trim().slice(1)}
                    </p>
                  </Link>
                </div>
              </ImageContainer>
            </CardDetails>
          );
        })}
    </CardContainer>
  );
}
