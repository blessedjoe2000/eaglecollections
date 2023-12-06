"use client";

import { useContext, useEffect, useState } from "react";
import { useFetchAllProduct } from "../../internalAPI/FetchAllProducts";
import Image from "next/image";
import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";

export default function Cart() {
  const { data, isPending, isError } = useFetchAllProduct();
  const [cartProducts, setCartProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    cartProductIds,
    addProduct,
    removeProduct,
    addToFavorite,
    favoriteStatus,
    clearCart,
  } = useContext(CartContext);

  useEffect(() => {
    if (cartProductIds?.length > 0) {
      axios.post("/api/cart", { ids: cartProductIds }).then((response) => {
        setCartProducts(response.data);
      });
    } else {
      setCartProducts([]);
    }
  }, [cartProductIds]);

  const increaseCartProduct = (productId) => {
    return addProduct(productId);
  };

  const decreaseCartProduct = (productId) => {
    return removeProduct(productId);
  };

  const addFavorite = (productId) => {
    addToFavorite(productId);
  };

  let total = 0;
  for (const productId of cartProductIds) {
    const price =
      cartProducts?.find((product) => product._id === productId)?.price || 0;
    total += price;
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const handleGoToPayment = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !zipCode || !country) {
      console.log("enter required fields");
      return;
    }
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
      address,
      zipCode,
      country,
      cartProductIds,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="bg-white mx-5 text-center py-10 ">
          <h1 className="font-bold py-2 text-lg">
            Payment Successful! Thank you for shopping with us.
          </h1>
          <p className="mb-5">We will email you when your order is sent.</p>
          <Link
            href={"/"}
            className="px-3 py-1 text-white bg-main-pink rounded-md"
          >
            Go to shop
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="m-5">
      <h2 className="font-bold mb-3 text-lg text-main-pink">Cart</h2>
      {!cartProducts ? (
        <div>{!cartProducts?.length && <div>Your Cart is empty</div>}</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2 ">
          <div className="">
            {cartProducts &&
              cartProducts.map((cartProductData) => (
                <div
                  key={cartProductData._id}
                  className=" shadow-md rounded-md mb-2"
                >
                  <div className="flex justify-start items-center gap-5 p-5">
                    <div className="">
                      <Image
                        src={cartProductData.images[0]}
                        alt={`${cartProductData.title}`}
                        width={150}
                        height={100}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <p className=" font-bold ">
                        $
                        {cartProductData.price *
                          cartProductIds.filter(
                            (cartProductId) =>
                              cartProductId === cartProductData._id
                          ).length}
                      </p>

                      <p>{cartProductData.title}</p>
                      <div className="flex gap-2 justify-start items-center my-1">
                        <p>Quantity</p>
                        <div className="flex gap-2 font-bold justify-center items-center">
                          <button
                            onClick={() =>
                              decreaseCartProduct(cartProductData._id)
                            }
                            className="bg-main-pink px-2 rounded-lg text-xl text-white hover:text-main-purple "
                          >
                            -
                          </button>
                          <p>
                            {
                              cartProductIds.filter(
                                (cartProductId) =>
                                  cartProductId === cartProductData._id
                              ).length
                            }
                          </p>
                          <button
                            onClick={() =>
                              increaseCartProduct(cartProductData._id)
                            }
                            className="bg-main-pink px-2 rounded-lg text-xl text-white hover:text-main-purple"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <p>Save for later</p>
                        <svg
                          onClick={() => addFavorite(cartProductData._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={
                            favoriteStatus.includes(cartProductData._id)
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
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex gap-2 shadow-md py-2 px-5">
              <p>Sub-total: </p>
              <div className="font-bold">${total}</div>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-md shadow-md ">
            {!!cartProducts?.length && (
              <div className="">
                <h2 className="font-bold text-lg text-main-pink">
                  Order information
                </h2>
                <form onSubmit={handleGoToPayment} className="py-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" bg-main-pink px-3 py-1 mt-2 rounded-md text-white text-center"
                  >
                    Continue to payment
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
