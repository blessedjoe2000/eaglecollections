"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  CardContainer,
  CardDetails,
  ImageContainer,
  PrevNextButton,
  PrevNextDisabledButton,
  SpinnerContainer,
} from "./styles";
import { CartContext } from "@/components/providers/CartContext/CartContext";
import { useSearch } from "@/components/providers/SearchProvider/SearchProvider";
import Spinner from "@/components/Spinner/Spinner";
import { usePathname } from "next/navigation";
import { Container } from "@mui/system";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

export default function AllProducts() {
  const { addToFavorite, favoriteIds } = useContext(CartContext);
  const { searchResults, resetSearchResults } = useSearch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  let pageId = pathname.split("/").pop();
  pageId = typeof pageId === "string" ? Number(pageId) : 1;

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`/api/products/pages/${pageId}`);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [pageId]);

  const itemsPerPage = 50;
  const pagesRemaining = Math.ceil(data.length % itemsPerPage);

  useEffect(() => {
    resetSearchResults();
  }, [data]);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!data.length) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (searchResults.length > 0) {
    return (
      <div>
        <CardContainer>
          {searchResults &&
            searchResults.map((searchResult) => {
              const isNew = new Date(searchResult.createdAt) >= twentyDaysAgo;
              return (
                <CardDetails key={searchResult._id}>
                  <ImageContainer>
                    <div className="mb-2 scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                      <Link href={`/product/${searchResult._id}`}>
                        {searchResult?.newPrice && (
                          <span className="bg-sharp-pink text-white px-2 absolute font-bold rounded-tl-md">
                            -
                            {Math.round(
                              (100 *
                                (searchResult?.price -
                                  searchResult?.newPrice)) /
                                searchResult?.price
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
                          src={searchResult.images?.[0]}
                          alt={`${searchResult.title}`}
                          width={200}
                          height={250}
                          priority
                          className="object-cover w-[200px] h-[250px] rounded-md"
                        />
                      </Link>
                    </div>
                    <div>
                      <div className="flex justify-between items-center ">
                        {searchResult?.newPrice ? (
                          <div className="flex items-center gap-1">
                            <p className=" font-bold text-lg text-main-pink">
                              ${searchResult?.newPrice}
                            </p>
                            <p className=" font-bold line-through text-light-grey">
                              ${searchResult?.price}
                            </p>
                          </div>
                        ) : (
                          <p className=" font-bold text-lg text-main-pink">
                            ${searchResult.price}
                          </p>
                        )}

                        <svg
                          onClick={() => addFavorite(searchResult._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={
                            favoriteIds?.includes(searchResult._id)
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
                      <Link href={`/product/${searchResult._id}`}>
                        <p className="font-semi-bold text-white">
                          {searchResult?.title
                            ?.trim()
                            .slice(0, 1)
                            .toUpperCase() +
                            searchResult?.title?.trim().slice(1)}
                        </p>
                      </Link>
                    </div>
                  </ImageContainer>
                </CardDetails>
              );
            })}
        </CardContainer>

        <Container
          sx={{ display: "flex", justifyContent: "space-between", my: "1rem" }}
        >
          {pageId > 1 ? (
            <Link href={`/products/page/${pageId - 1}`}>
              <PrevNextButton>
                <KeyboardDoubleArrowLeftIcon />
                Previous
              </PrevNextButton>
            </Link>
          ) : (
            <PrevNextDisabledButton
              sx={{ display: "flex", alignItems: "center", gap: "1px" }}
            >
              <DoNotDisturbIcon sx={{ fontSize: "medium" }} />
              Previous
            </PrevNextDisabledButton>
          )}
          {pagesRemaining != 0 ? (
            <PrevNextDisabledButton
              sx={{ display: "flex", alignItems: "center", gap: "1px" }}
            >
              Next
              <DoNotDisturbAltIcon sx={{ fontSize: "medium" }} />
            </PrevNextDisabledButton>
          ) : (
            <Link href={`/products/page/${pageId + 1}`}>
              <PrevNextButton>
                Next
                <KeyboardDoubleArrowRightIcon />
              </PrevNextButton>
            </Link>
          )}
        </Container>
      </div>
    );
  }

  return (
    <div>
      <CardContainer>
        {data &&
          data.map((productData) => {
            const isNew = new Date(productData.createdAt) >= twentyDaysAgo;
            return (
              <CardDetails key={productData._id}>
                <ImageContainer>
                  <div className="mb-2 scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                    <Link href={`/product/${productData._id}`}>
                      {productData?.newPrice && (
                        <span className="bg-sharp-pink text-white px-2 absolute font-bold rounded-tl-md">
                          -
                          {Math.round(
                            (100 *
                              (productData?.price - productData?.newPrice)) /
                              productData?.price
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
                        src={productData.images?.[0]}
                        alt={`${productData.title}`}
                        width={200}
                        height={250}
                        priority
                        className="object-cover w-[200px] h-[250px] rounded-md"
                      />
                    </Link>
                  </div>
                  <div>
                    <div className="flex justify-between items-center ">
                      {productData?.newPrice ? (
                        <div className="flex items-center gap-1">
                          <p className=" font-bold text-lg text-main-pink">
                            ${productData?.newPrice}
                          </p>
                          <p className=" font-bold line-through text-light-grey">
                            ${productData?.price}
                          </p>
                        </div>
                      ) : (
                        <p className=" font-bold text-lg text-main-pink">
                          ${productData.price}
                        </p>
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
                    <Link href={`/product/${productData._id}`}>
                      <p className="font-semi-bold text-white">
                        {productData?.title?.trim().slice(0, 1).toUpperCase() +
                          productData?.title?.trim().slice(1)}
                      </p>
                    </Link>
                  </div>
                </ImageContainer>
              </CardDetails>
            );
          })}
      </CardContainer>

      <Container
        sx={{ display: "flex", justifyContent: "space-between", my: "1rem" }}
      >
        {pageId > 1 ? (
          <Link href={`/products/page/${pageId - 1}`}>
            <PrevNextButton>
              <KeyboardDoubleArrowLeftIcon />
              Previous
            </PrevNextButton>
          </Link>
        ) : (
          <PrevNextDisabledButton
            sx={{ display: "flex", alignItems: "center", gap: "1px" }}
          >
            <DoNotDisturbIcon sx={{ fontSize: "medium" }} />
            Previous
          </PrevNextDisabledButton>
        )}
        {pagesRemaining != 0 ? (
          <PrevNextDisabledButton
            sx={{ display: "flex", alignItems: "center", gap: "1px" }}
          >
            Next
            <DoNotDisturbAltIcon sx={{ fontSize: "medium" }} />
          </PrevNextDisabledButton>
        ) : (
          <Link href={`/products/page/${pageId + 1}`}>
            <PrevNextButton>
              Next
              <KeyboardDoubleArrowRightIcon />
            </PrevNextButton>
          </Link>
        )}
      </Container>
    </div>
  );
}
