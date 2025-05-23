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

export default function Shoe() {
  const [slippers, setSlippers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { favoriteIds, addToFavorite } = useContext(CartContext);

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const getSlippers = async () => {
    try {
      const response = await axios.get("/api/slippers");
      setSlippers(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    getSlippers();
  }, []);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  if (!slippers.length) {
    return (
      <SpinnerContainer>
        <ComingSoon>Coming soon...</ComingSoon>
        <Spinner />
      </SpinnerContainer>
    );
  }
  return (
    <CardContainer>
      {slippers &&
        slippers.map((slipper) => {
          const isNew = new Date(slipper.createdAt) >= twentyDaysAgo;
          return (
            <CardDetails key={slipper._id}>
              <ImageContainer>
                <div className="mb-2 scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                  <Link href={`/product/${slipper._id}`}>
                    {slipper?.newPrice && (
                      <span className="bg-sharp-pink text-white px-2 absolute font-bold rounded-tl-md">
                        -
                        {Math.round(
                          (100 * (slipper?.price - slipper?.newPrice)) /
                            slipper?.price
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
                      src={slipper.images?.[0]}
                      alt={`${slipper.title}`}
                      width={200}
                      height={250}
                      priority
                      className="object-cover w-[200px] h-[250px] rounded-md"
                    />
                  </Link>
                </div>
                <div>
                  <div className="flex justify-between items-center ">
                    {slipper?.newPrice ? (
                      <div className="flex items-center gap-1">
                        <p className=" font-bold text-lg text-main-pink">
                          ${slipper?.newPrice}
                        </p>
                        <p className=" font-bold line-through text-light-grey">
                          ${slipper?.price}
                        </p>
                      </div>
                    ) : (
                      <p className=" font-bold text-lg text-main-pink">
                        ${slipper.price}
                      </p>
                    )}

                    <svg
                      onClick={() => addFavorite(slipper._id)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={
                        favoriteIds?.includes(slipper._id)
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
                  <Link href={`/product/${slipper._id}`}>
                    <p className="font-semi-bold text-white">
                      {slipper?.title?.trim().slice(0, 1).toUpperCase() +
                        slipper?.title?.trim().slice(1)}
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
