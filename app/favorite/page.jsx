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
import {
  DescContainer,
  FavContainer,
  PriceContainer,
  SavedProducts,
} from "./styles";
import { Container } from "@mui/system";

export default function Favorite() {
  const { favoriteIds, addToFavorite } = useContext(CartContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  useEffect(() => {
    if (favoriteIds?.length > 0) {
      axios.post("/api/cart", { ids: favoriteIds }).then((response) => {
        setFavoriteProducts(response.data);
      });
    } else {
      setFavoriteProducts([]);
    }
  }, [favoriteIds]);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="m-10 ">
      {!favoriteProducts?.length ? (
        <SavedProducts>
          {!favoriteProducts?.length && <p>No saved products.</p>}
        </SavedProducts>
      ) : (
        <Container>
          <SavedProducts>Saved Products</SavedProducts>
          {favoriteProducts &&
            favoriteProducts.map((favProductData) => {
              const isNew = new Date(favProductData.createdAt) >= twentyDaysAgo;
              return (
                <FavContainer key={favProductData._id}>
                  <Link href={`/product/${favProductData._id}`}>
                    <div className="sm:flex gap-1  p-5 ">
                      <div className="mb-2 scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                        {favProductData?.newPrice && (
                          <span className="bg-sharp-pink text-white px-2 text-lg absolute z-10 rounded-tl-md ">
                            -
                            {Math.round(
                              (100 *
                                (favProductData?.price -
                                  favProductData?.newPrice)) /
                                favProductData?.price
                            )}
                            %
                          </span>
                        )}
                        {isNew && (
                          <span className="bg-main-blue text-white px-1 font-bold absolute right-0 z-30 rounded-tr-md">
                            NEW
                          </span>
                        )}
                        <Image
                          src={favProductData.images?.[0]}
                          alt={`${favProductData.title}`}
                          width={250}
                          height={300}
                          priority
                          className="object-cover w-[250px] h-[300px] rounded-md"
                        />
                      </div>

                      <div className="flex flex-col gap-2 mt-2 sm:mt-0  px-5 ">
                        <h2>
                          {favProductData?.title
                            ?.trim()
                            .slice(0, 1)
                            .toUpperCase() +
                            favProductData?.title?.trim().slice(1)}
                        </h2>
                        <DescContainer>
                          {favProductData?.description
                            .trim()
                            .slice(0, 1)
                            .toUpperCase() +
                            favProductData?.description.trim().slice(1)}
                        </DescContainer>
                        <div>
                          {favProductData?.newPrice ? (
                            <div className="flex items-center gap-1">
                              <PriceContainer>
                                ${favProductData?.newPrice}
                              </PriceContainer>
                              <p className=" font-bold line-through text-light-grey">
                                ${favProductData?.price}
                              </p>
                            </div>
                          ) : (
                            <PriceContainer>
                              ${favProductData.price}
                            </PriceContainer>
                          )}
                        </div>
                        <div className="flex gap-2 justify-start items-center">
                          <DescContainer>Saved</DescContainer>
                          <svg
                            onClick={() => addFavorite(favProductData?._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={
                              favoriteIds.includes(favProductData?._id)
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
                      </div>
                    </div>
                  </Link>
                </FavContainer>
              );
            })}
        </Container>
      )}
    </div>
  );
}
