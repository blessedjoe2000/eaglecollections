"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../providers/CartContext/CartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SearchProducts from "../SearchProduct/SearchProduct";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { NavMenu } from "../NavMenu/NavMenu";
import { MenuButton } from "./styles";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box } from "@mui/system";

export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { data: session } = useSession();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleHambuger = () => {
    setShowHamburger(!showHamburger);
    setOpenMenu(true);
  };

  const openMobileMenu = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (showHamburger) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [showHamburger]);

  return (
    <nav className="bg-dark-blue text-white sticky top-0 z-50 px-5">
      <div className="hidden sm:flex sm:flex-col sm:gap-2 sm:my-5 md:flex xl:hidden">
        <div className="flex justify-around items-center gap-5">
          <div className="py-3" onMouseMove={closeMenu}>
            <Logo />
          </div>
          <div>
            <SearchProducts />
          </div>
          <div>
            <Link
              href={"/cart"}
              className="flex menuitems"
              onMouseMove={closeMenu}
            >
              <MenuButton>
                <div className="flex flex-col  items-center relative">
                  <div className="absolute bottom-2.5 font-bold text-lg text-main-pink">
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
                Cart
              </MenuButton>
            </Link>
          </div>
          <div>
            <div className="sm:inline-flex hidden" onMouseMove={closeMenu}>
              {!session && (
                <button
                  className=" flex items-center gap-1 px-3 py-1 bg-sharp-pink rounded-lg hover:bg-deep-pink my-10"
                  onClick={signIn}
                >
                  <ExitToAppOutlinedIcon />
                  <p className="font-bold text-lg">Signin</p>
                </button>
              )}
            </div>
            <div onMouseMove={closeMenu}>
              {session && (
                <div className=" bg-dark-blue text-white">
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
                    style={{
                      backgroundColor: "#01204e",
                      color: "#ffffff",
                      height: "25rem",
                    }}
                    className="text-black/60 flex flex-col items-center bg-dark-blue"
                  >
                    <button
                      onClick={toggleDrawer}
                      className="flex items-center px-2 py-1 m-3 absolute left-0 bg-sharp-pink text-white rounded-md hover:bg-deep-pink"
                    >
                      <CloseOutlinedIcon fontSize="small" />
                    </button>
                    <button onClick={toggleDrawer} className="pb-5 pt-20 ">
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
                      className=" flex items-center gap-1 px-3 py-1 bg-sharp-pink rounded-lg hover:bg-deep-pink mt-28"
                      onClick={signOut}
                    >
                      <ExitToAppOutlinedIcon />
                      <p className="font-bold text-lg">Logout</p>
                    </button>
                  </Drawer>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden sm:inline-flex justify-around items-center gap-5 ">
          <div
            className={
              openMenu
                ? " mt-32 absolute w-full left-0 top-8 border-t-2"
                : "hidden"
            }
          >
            <NavMenu closeMenuCallback={closeMenu} />
          </div>

          <div
            onMouseEnter={openMobileMenu}
            className="flex gap-0.5 items-center justify-center"
          >
            <MenuButton>
              Shop
              <Box sx={{ color: "#ff5d8f" }}>
                <StorefrontOutlinedIcon fontSize="small" />
                {openMenu ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </Box>
            </MenuButton>
          </div>
          <Link
            href={"/newarrivals"}
            className="menuitems"
            onMouseMove={closeMenu}
          >
            <MenuButton>
              New Arrival
              <Box sx={{ color: "#ff5d8f" }}>
                <AutoAwesomeOutlinedIcon fontSize="medium" />
              </Box>
            </MenuButton>
          </Link>
          <Link href={"/sales"} className="menuitems" onMouseMove={closeMenu}>
            <MenuButton>Sales</MenuButton>
          </Link>
          <Link href={"/about"} className="menuitems" onMouseMove={closeMenu}>
            <MenuButton>About</MenuButton>
          </Link>
          <Link href={"/contact"} className="menuitems" onMouseMove={closeMenu}>
            <MenuButton>Contact</MenuButton>
          </Link>
          <Link
            href={"/favorite"}
            className="menuitems"
            onMouseMove={closeMenu}
          >
            <MenuButton>
              Saved
              <Box sx={{ color: "#ff5d8f" }}>
                <FavoriteBorderIcon fontSize="small" />
              </Box>
            </MenuButton>
          </Link>
        </div>
      </div>

      <div
        className={`flex justify-around items-center gap-5 ${
          showHamburger ? "mb-96" : "xl:gap-2 xl:flex"
        } sm:hidden xs:flex`}
      >
        <div className="py-3" onMouseMove={closeMenu}>
          <Logo />
        </div>
        <div className="hidden sm:inline-flex justify-center items-center gap-5 ">
          <div
            className={
              openMenu
                ? " mt-12 absolute w-full left-0 top-8 border-t-2"
                : "hidden"
            }
          >
            <NavMenu closeMenuCallback={closeMenu} />
          </div>

          <div
            onMouseEnter={openMobileMenu}
            className="flex gap-0.5 items-center justify-center"
          >
            <MenuButton>
              Shop
              <Box sx={{ color: "#ff5d8f" }}>
                <StorefrontOutlinedIcon fontSize="small" />
                {openMenu ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </Box>
            </MenuButton>
          </div>

          <Link
            href={"/newarrivals"}
            className="menuitems"
            onMouseMove={closeMenu}
          >
            <MenuButton>
              New Arrival
              <Box sx={{ color: "#ff5d8f" }}>
                <AutoAwesomeOutlinedIcon fontSize="medium" />
              </Box>
            </MenuButton>
          </Link>
          <Link href={"/sales"} className="menuitems" onMouseMove={closeMenu}>
            <MenuButton>Sales</MenuButton>
          </Link>
          <Link href={"/about"} className="menuitems" onMouseMove={closeMenu}>
            <MenuButton>About</MenuButton>
          </Link>
          <Link href={"/contact"} className="menuitems" onMouseMove={closeMenu}>
            <MenuButton>Contact</MenuButton>
          </Link>
          <Link
            href={"/favorite"}
            className="menuitems"
            onMouseMove={closeMenu}
          >
            <MenuButton>
              Saved
              <Box sx={{ color: "#ff5d8f" }}>
                <FavoriteBorderIcon fontSize="small" />
              </Box>
            </MenuButton>
          </Link>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <div
            className="sm:flex flex-col w-full hidden"
            onMouseMove={closeMenu}
          >
            <SearchProducts />
          </div>
          <Link
            href={"/cart"}
            className="flex menuitems"
            onMouseMove={closeMenu}
          >
            <MenuButton>
              <div className="flex flex-col  items-center relative">
                <div className="absolute bottom-2.5 font-bold text-lg text-main-pink">
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
              Cart
            </MenuButton>
          </Link>
          <div>
            <div className="sm:inline-flex hidden" onMouseMove={closeMenu}>
              {!session && (
                <button
                  className=" flex items-center gap-1 px-3 py-1 bg-sharp-pink rounded-lg hover:bg-deep-pink my-10"
                  onClick={signIn}
                >
                  <ExitToAppOutlinedIcon />
                  <p className="font-bold text-lg">Signin</p>
                </button>
              )}
            </div>
            <div onMouseMove={closeMenu}>
              {session && (
                <div className=" bg-dark-blue text-white">
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
                    style={{
                      backgroundColor: "#01204e",
                      color: "#ffffff",
                      height: "25rem",
                    }}
                    className="text-black/60 flex flex-col items-center bg-dark-blue"
                  >
                    <button
                      onClick={toggleDrawer}
                      className="flex items-center px-2 py-1 m-3 absolute left-0 bg-sharp-pink text-white rounded-md hover:bg-deep-pink"
                    >
                      <CloseOutlinedIcon fontSize="small" />
                    </button>
                    <button onClick={toggleDrawer} className="pb-5 pt-20 ">
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
                      className=" flex items-center gap-1 px-3 py-1 bg-sharp-pink rounded-lg hover:bg-deep-pink mt-28"
                      onClick={signOut}
                    >
                      <ExitToAppOutlinedIcon />
                      <p className="font-bold text-lg">Logout</p>
                    </button>
                  </Drawer>
                </div>
              )}
            </div>
          </div>
        </div>

        <div onClick={toggleHambuger} className="space-y-1 hamburger sm:hidden">
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>

          <div
            className={
              showHamburger
                ? "sm:hidden flex flex-col justify-center w-screen items-center absolute -top-0 hambuger-focus:top-0 right-0 duration-150 py-5 bg-dark-blue"
                : "hidden"
            }
          >
            <button className="px-10 py-3 mb-1 relative ml-auto">
              <div className="w-6 h-1 rotate-45 absolute bg-white"></div>
              <div className="w-6 h-1 -rotate-45 absolute bg-white"></div>
            </button>

            <div className="flex flex-col items-center gap-1">
              <div
                className={openMenu ? "mt-5 absolute w-full left-0" : "hidden"}
              >
                <NavMenu closeMenuCallback={closeMenu} />
              </div>
              <div
                className="menuitems cursor-pointer hover:text-sharp-pink"
                onClick={openMobileMenu}
              >
                <MenuButton>Shop</MenuButton>
              </div>
              <div
                className={
                  openMenu
                    ? "flex flex-col justify-center items-center gap-1 mt-64"
                    : "flex flex-col gap-1 justify-center items-center"
                }
              >
                <Link
                  href={"/newarrivals"}
                  className="menuitems"
                  onMouseMove={closeMenu}
                >
                  <MenuButton sx={{ mt: "1rem" }}>
                    New Arrival
                    <Box sx={{ color: "#ff5d8f" }}>
                      <AutoAwesomeOutlinedIcon fontSize="medium" />
                    </Box>
                  </MenuButton>
                </Link>
                <Link
                  href={"/sales"}
                  className="menuitems"
                  onMouseMove={closeMenu}
                >
                  <MenuButton>Sales</MenuButton>
                </Link>
                <Link href={"/about"} className={"menuitems"}>
                  <MenuButton>About</MenuButton>
                </Link>

                <Link href={"/contact"} className=" menuitems">
                  <MenuButton>Contact</MenuButton>
                </Link>
                <Link href={"/favorite"} className=" menuitems">
                  <MenuButton>Saved</MenuButton>
                </Link>
              </div>
            </div>
            <div className="inline-flex mt-3">
              {!session && (
                <button
                  className=" flex items-center gap-1 px-3 py-1 bg-sharp-pink rounded-lg hover:bg-deep-pink my-10"
                  onClick={signIn}
                >
                  <ExitToAppOutlinedIcon />
                  <p className="font-bold text-lg">Signin</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={showHamburger ? " hidden" : "  sm:hidden"}>
        <SearchProducts />
      </div>
    </nav>
  );
}
