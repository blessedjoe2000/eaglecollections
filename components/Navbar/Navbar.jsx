"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import { useContext, useState } from "react";
import { CartContext } from "../providers/CartContext/CartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SearchProducts from "../SearchProduct/SearchProduct";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import toast from "react-hot-toast";

export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleHambuger = () => {
    setShowHamburger(!showHamburger);
  };

  const login = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
      toast.success("Login successful", {
        style: {
          border: "1px solid #01B700",
          padding: "16px",
          color: "#01B700",
        },
        iconTheme: {
          primary: "#01B700",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.error("Login failed:", error);

      toast.error("Login failed", {
        style: {
          border: "1px solid #FF0000",
          padding: "16px",
          color: "#FF0000",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      toast.success("Logout successful", {
        style: {
          border: "1px solid #01B700",
          padding: "16px",
          color: "#01B700",
        },
        iconTheme: {
          primary: "#01B700",
          secondary: "#FFFAEE",
        },
      });
      await signOut();
    } catch (error) {
      console.error("Login failed:", error);

      toast.error("Login failed", {
        style: {
          border: "1px solid #FF0000",
          padding: "16px",
          color: "#FF0000",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  return (
    <nav
      className={
        showHamburger
          ? "mb-40 bg-main-purple text-white flex justify-between items-center gap-5 px-5 sticky top-0 z-50"
          : "bg-main-purple text-white flex justify-between items-center gap-5 px-5 sticky top-0 z-50"
      }
    >
      <div className="py-2">
        <Logo />
      </div>
      <div className="hidden sm:inline-flex gap-5">
        <Link href={"/"} className="">
          Shop
        </Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/"}>Account</Link>
        <Link href={"/"}>Contact</Link>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <SearchProducts />
        <Link href={"/cart"} className="flex">
          <div className="flex flex-col  items-center">
            <div className="absolute sm:top-4 top-3 font-bold text-lg text-sharp-pink">
              {cartProducts ? cartProducts.length : 0}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 z-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <p>cart</p>
        </Link>
        <div className="sm:inline-flex hidden">
          {!session && (
            <button
              className="flex items-center px-2 py-1 bg-main-pink rounded-lg hover:text-sharp-purple "
              onClick={() => !isLoading && login()}
            >
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>

              <p>Signin</p>
            </button>
          )}
        </div>
        <div>
          {session && (
            <div>
              <button onClick={toggleDrawer}>
                <Image
                  src={session?.user?.image}
                  alt="profile photo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </button>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="text-black/60 flex flex-col items-center"
              >
                <button onClick={toggleDrawer} className="pb-3 pt-5 ">
                  <Image
                    src={session?.user?.image}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </button>
                <p>{session.user.name}</p>
                <p className="py-1">{session.user.email}</p>
                <button
                  className=" flex items-center px-2 py-1 bg-main-pink rounded-lg text-white hover:text-sharp-purple my-3"
                  onClick={logout}
                >
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <p className="font-bold">Logout</p>
                </button>
                <button
                  onClick={toggleDrawer}
                  className="flex items-center px-2 bg-main-purple text-white rounded-md mt-10 hover:text-sharp-pink"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p>close</p>
                </button>
              </Drawer>
            </div>
          )}
        </div>
      </div>
      <div onClick={toggleHambuger} className="space-y-1 hamburger sm:hidden">
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>

        <div
          className={
            showHamburger
              ? "sm:hidden flex flex-col justify-center w-screen items-center absolute -top-0 hambuger-focus:top-0 right-0 duration-50 py-3 bg-main-purple mb-20"
              : "hidden"
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
          <div className="inline-flex mt-3">
            {!session && (
              <button
                className="flex items-center px-2 py-1 bg-main-pink rounded-lg hover:text-sharp-purple "
                onClick={() => !isLoading && login()}
              >
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>

                <p>Signin</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
