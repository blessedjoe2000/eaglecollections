"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/providers/CartContext/CartContext";
import { ProductImages } from "@/components/ProductImages/ProductImages";
import Spinner from "@/components/Spinner/Spinner";
import axios from "axios";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import { SpinnerContainer } from "@/app/products/page/[...page]/styles";
import { Container } from "@mui/system";
import { DescContainer, PriceContainer } from "@/app/favorite/styles";
import { ComingSoon } from "@/app/accessories/styles";

export default function Product() {
  const { addToFavorite, favoriteIds, addProduct } = useContext(CartContext);
  const { id: _id } = useParams();
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`/api/products/`);
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error.message);
      }
    };

    fetchAllProducts();
  }, []);

  const productData = data?.find((product) => product._id === _id);
  const isNew = new Date(productData?.createdAt) >= twentyDaysAgo;

  useEffect(() => {
    if (productData?.colors) {
      setColors(productData.colors.split(",")[0]);
    }

    if (productData?.sizes) {
      setSizes(productData.sizes.split(",")[0]);
    }
  }, [productData]);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const addToCart = () => {
    const productWithColorsAndSizes = {
      ...productData,
      colors,
      sizes,
    };
    addProduct(productWithColorsAndSizes);
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setColors(color);
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSizes(size);
  };

  if (!productData) {
    return (
      <SpinnerContainer>
        <ComingSoon>Loading...</ComingSoon>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <div className=" flex justify-center text-white bg-dark-blue my-10 p-5">
        <div className="sm:inline-flex relative ">
          <div>
            {productData?.newPrice && (
              <span className="bg-sharp-pink text-white px-2 text-lg absolute left-5 top-5 z-30 rounded-tl-md">
                -
                {Math.round(
                  (100 * (productData?.price - productData?.newPrice)) /
                    productData?.price
                )}
                %
              </span>
            )}
            {isNew && (
              <span className="bg-main-blue text-white px-1 font-bold absolute top-5 left-96 z-30 rounded-tr-md">
                NEW
              </span>
            )}
            <ProductImages images={productData?.images} />
          </div>
          <div className="flex flex-col gap-2 mt-2 sm:mt-0 p-5 sm:w-[400px]">
            <h2>
              {productData?.title?.trim().slice(0, 1).toUpperCase() +
                productData?.title?.trim().slice(1)}
            </h2>
            <DescContainer>
              {productData?.description.trim().slice(0, 1).toUpperCase() +
                productData?.description.trim().slice(1)}
            </DescContainer>
            <div>
              {productData?.colors && (
                <div className="flex items-center gap-5">
                  <DescContainer>Color: </DescContainer>

                  <select
                    className="p-0"
                    name={productData?.colors}
                    onChange={handleColorChange}
                  >
                    {productData?.colors
                      ?.split(",")

                      .map((value, index) => (
                        <option value={value} key={index}>
                          {value.trim().slice(0, 1).toUpperCase() +
                            value.trim().slice(1)}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <div>
              {productData?.sizes && (
                <div className="flex items-center gap-5">
                  <DescContainer>Size: </DescContainer>

                  <select
                    className="p-0"
                    name={productData?.sizes}
                    onChange={handleSizeChange}
                  >
                    {productData?.sizes
                      ?.split(",")

                      .map((value, index) => (
                        <option value={value} key={index}>
                          {value.trim().slice(0, 1).toUpperCase() +
                            value.trim().slice(1)}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            {productData?.newPrice ? (
              <div className="flex items-center gap-1">
                <PriceContainer>${productData?.newPrice}</PriceContainer>
                <p className=" font-bold line-through text-light-grey">
                  ${productData?.price}
                </p>
              </div>
            ) : (
              <PriceContainer>${productData.price}</PriceContainer>
            )}
            <div className="flex gap-2 justify-start items-center">
              <DescContainer>Save for later</DescContainer>
              <svg
                onClick={() => addFavorite(productData?._id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={
                  favoriteIds.includes(productData?._id)
                    ? "w-6 h-6 fill-sharp-pink text-sharp-pink hover:cursor-pointer"
                    : "w-6 h-6 text-sharp-pink hover:cursor-pointer"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => addToCart(productData._id)}
                className="bg-sharp-pink py-1 px-3 rounded-md text-white hover:bg-main-pink font-bold flex gap-1 justify-center items-center"
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
                <DescContainer>Add to cart</DescContainer>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <SimilarProducts searchCategory={productData?.category?.[0]} /> */}
    </Container>
  );
}
