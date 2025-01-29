import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  CardContainer,
  CardDetails,
  SpinnerContainer,
} from "@/app/products/page/[...page]/styles";
import { ImageContainer, SalesTitle } from "./styles";
import { Button } from "@mui/material";
import { ComingSoon } from "../accessories/styles";
import Spinner from "@/components/Spinner/Spinner";

export default function SalesToDisplay() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const { favoriteIds, addToFavorite } = useContext(CartContext);

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const getSales = async () => {
    try {
      const response = await axios.get("/api/sales");
      const firstTenItems = response.data.slice(0, 6);
      setSales(firstTenItems);
    } catch (error) {
      console.log("error fetching sales products data", error);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!sales.length) {
    return (
      <SpinnerContainer>
        <ComingSoon>Coming soon...</ComingSoon>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <div className="bg-light-pink py-10">
      <SalesTitle>Check Out Latest Products On Sales</SalesTitle>
      <CardContainer>
        {sales &&
          sales.map((saleProduct) => {
            const isNew = new Date(saleProduct.createdAt) >= twentyDaysAgo;
            return (
              <CardDetails key={saleProduct._id}>
                <ImageContainer>
                  <div className="mb-2 scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                    <Link href={`/product/${saleProduct._id}`}>
                      {saleProduct?.newPrice && (
                        <span className="bg-sharp-pink text-white px-2 absolute font-bold rounded-tl-md">
                          -
                          {Math.round(
                            (100 *
                              (saleProduct?.price - saleProduct?.newPrice)) /
                              saleProduct?.price
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
                        src={saleProduct.images?.[0]}
                        alt={`${saleProduct.title}`}
                        width={150}
                        height={200}
                        priority
                        className="object-cover w-[200px] h-[250px] rounded-md"
                      />
                    </Link>
                  </div>
                  <div className="text-white pr-3">
                    <Link href={`/product/${saleProduct._id}`}>
                      <p className="font-bold text-lg">
                        {saleProduct?.title?.trim().slice(0, 1).toUpperCase() +
                          saleProduct?.title?.trim().slice(1)}
                      </p>
                    </Link>

                    <div className="my-2">
                      {saleProduct?.newPrice ? (
                        <div className="flex items-center gap-1">
                          <p className=" font-bold text-lg text-main-pink">
                            ${saleProduct?.newPrice}
                          </p>
                          <p className=" font-bold line-through">
                            ${saleProduct?.price}
                          </p>
                        </div>
                      ) : (
                        <p className=" font-bold text-lg text-main-pink">
                          ${saleProduct.price}
                        </p>
                      )}
                    </div>
                    <div>
                      <p>{saleProduct?.description}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      Save
                      <svg
                        onClick={() => addFavorite(saleProduct._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={
                          favoriteIds?.includes(saleProduct._id)
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
                </ImageContainer>
              </CardDetails>
            );
          })}
      </CardContainer>

      <Link href="/sales" className="flex">
        <Button
          type="submit"
          className="mx-24 px-3 py-1 bg-sharp-pink rounded-md text-white text-lg w-full hover:bg-deep-pink"
        >
          Check Out Our Sales
        </Button>
      </Link>
    </div>
  );
}
