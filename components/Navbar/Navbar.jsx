"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import { useState } from "react";

export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);

  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const cartProducts = ls ? JSON.parse(ls.getItem("cart")) : [];

  console.log("cartProducts", cartProducts);

  const toggleHambuger = () => {
    setShowHamburger(!showHamburger);
  };

  return (
    <nav className="bg-main-purple text-white flex justify-between items-center gap-5 px-5 ">
      <div className="py-2">
        <Logo />
      </div>
      <div className="hidden sm:inline-flex gap-5">
        <Link href={"/"} className="">
          Shop
        </Link>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Account</Link>
        <Link href={"/"}>Contact</Link>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Link href={"/cart"}>
          <div>{cartProducts ? cartProducts.length : 0}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Link>
        <Link href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Link>
      </div>

      <div onClick={toggleHambuger} className="space-y-1 hamburger sm:hidden">
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>

        <div
          className={
            showHamburger
              ? "hidden"
              : "sm:hidden flex flex-col justify-center w-screen items-center absolute -top-0 hambuger-focus:top-0 right-0 duration-50 py-3 bg-main-purple mb-20"
          }
        >
          <button className="px-10 py-3 mb-1 relative ml-auto">
            <div className="w-6 h-1 rotate-45 absolute bg-white"></div>
            <div className="w-6 h-1 -rotate-45 absolute bg-white"></div>
          </button>

          <div className="flex flex-col gap-2">
            <Link
              href={"/"}
              className=" hover:bg-white hover:text-main-purple hover:w-screen flex justify-center items-center"
            >
              Shop
            </Link>
            <Link
              href={"/"}
              className=" hover:bg-white hover:text-main-purple hover:w-screen flex justify-center items-center"
            >
              About
            </Link>
            <Link
              href={"/"}
              className=" hover:bg-white hover:text-main-purple hover:w-screen flex justify-center items-center"
            >
              Account
            </Link>
            <Link
              href={"/"}
              className=" hover:bg-white hover:text-main-purple hover:w-screen flex justify-center items-center"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
