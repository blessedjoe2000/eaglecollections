"use client";

import { useContext, useEffect, useState } from "react";
import { useFetchAllProduct } from "../../internalAPI/FetchAllProducts";
import Image from "next/image";
import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data, isPending, isError } = useFetchAllProduct();
  const [cartProducts, setCartProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: session } = useSession();

  const { cartProductIds, addProduct, removeProduct, clearCart } =
    useContext(CartContext);

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

    if (!name || !email || !phone) {
      console.log("enter required fields");
      return;
    }
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
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
        <div className="bg-white mx-5 text-center py-10 ">
          <h1 className="font-bold py-2 text-lg">
            Payment Successful! Thank you for shopping with us.
          </h1>
          <p className="mb-5">We will email you when your order is sent.</p>
          <Link
            href={"/"}
            className=" bg-main-pink rounded-md  inline-flex justify-center items-center gap-2 text-white px-3 py-1 hover:text-sharp-purple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>

            <p className="text-lg">Go to shop</p>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="m-5">
      <h2 className="font-bold mb-3 text-lg text-main-pink text-center">
        Shopping Cart
      </h2>
      {!cartProducts?.length ? (
        <div>
          {!cartProducts?.length && (
            <p className="text-center font-bold">Your Cart is empty.</p>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2 ">
          <div className="">
            {cartProducts &&
              cartProducts.map((cartProductData) => (
                <div
                  key={cartProductData._id}
                  className=" shadow-sm rounded-md mb-2 bg-white"
                >
                  <div className="flex justify-start items-center gap-5 p-5">
                    <Link href={`/product/${cartProductData._id}`}>
                      <Image
                        src={cartProductData.images?.[0]}
                        alt={`${cartProductData.title}`}
                        width={100}
                        height={100}
                        priority
                        className="rounded-md scale-100 hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

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
                            className="bg-main-pink px-2 rounded-lg text-xl text-white  "
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
                            className="bg-main-pink px-2 rounded-lg text-xl text-white "
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex gap-2 shadow-sm bg-white py-2 px-5">
              <p>Sub-total: </p>
              <div className="font-bold">${total}</div>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-md shadow-sm bg-white ">
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

                  <button
                    type="submit"
                    className={
                      session
                        ? " bg-main-pink px-3 py-1 mt-2 rounded-md text-white text-center"
                        : "cursor-not-allowed bg-main-pink px-3 py-1 mt-2 rounded-md text-white text-center"
                    }
                  >
                    Continue to payment
                  </button>
                  {!session && (
                    <p className="text-sm text-red-600 ml-5 pt-1">
                      *login to continue*
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
