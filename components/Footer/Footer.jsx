"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import "react-social-icons/meetup";
import { MenuButton } from "../Navbar/styles";
import SocialMedia from "../SocialMedia";

export default function Footer() {
  return (
    <footer className="bg-dark-blue text-white ">
      <div className="flex flex-col">
        <div className="md:flex-row flex-col flex justify-around items-center gap-5 p-5 text-sm ">
          <div className="">
            <Logo />
          </div>
          <div className="flex justify-around items-center  xs:gap-5 sm:gap-20 md:gap-5 lg:gap-10 xl:gap-20">
            <div className="flex flex-col justify-center items-center  ">
              <Link href={"/george"} className="menuitems">
                <MenuButton>Georges</MenuButton>
              </Link>
              <Link href={"/lace"} className="menuitems">
                <MenuButton>Laces</MenuButton>
              </Link>
              <Link href={"/headtie"} className="menuitems">
                <MenuButton>Headtie Gele</MenuButton>
              </Link>
              <Link href={"/accessories"} className="menuitems">
                <MenuButton>Accessories</MenuButton>
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Link href={"/slippers"} className="menuitems">
                <MenuButton>Slippers</MenuButton>
              </Link>
              <Link href={"/dress"} className="menuitems">
                <MenuButton>Gown Dresses</MenuButton>
              </Link>
              <Link href={"/jewelry"} className="menuitems">
                <MenuButton>Jewelries</MenuButton>
              </Link>
              <Link href={"/bag"} className="menuitems">
                <MenuButton>Bags</MenuButton>
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Link href={"/men"} className="menuitems">
                <MenuButton>Men Shop</MenuButton>
              </Link>
              <Link href={"/ankara"} className="menuitems">
                <MenuButton>Ankara</MenuButton>
              </Link>
              <Link href={"/shoe"} className="menuitems">
                <MenuButton>Shoes</MenuButton>
              </Link>
              <Link href={"/clutch"} className="menuitems">
                <MenuButton>Clutches</MenuButton>
              </Link>
            </div>
          </div>

          <div className="hidden ">
            <div>
              <div className="flex flex-col justify-center items-center  ">
                <Link href={"/george"} className="menuitems">
                  <MenuButton>Georges</MenuButton>
                </Link>
                <Link href={"/lace"} className="menuitems">
                  <MenuButton>Laces</MenuButton>
                </Link>
                <Link href={"/bag"} className="menuitems">
                  <MenuButton>Bags</MenuButton>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center  ">
                <Link href={"/jewelry"} className="menuitems">
                  <MenuButton>Jewelries</MenuButton>
                </Link>
                <Link href={"/headtie"} className="menuitems">
                  <MenuButton>Headtie Gele</MenuButton>
                </Link>
                <Link href={"/accessories"} className="menuitems">
                  <MenuButton>Accessories</MenuButton>
                </Link>
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center">
                <Link href={"/slippers"} className="menuitems">
                  <MenuButton>Slippers</MenuButton>
                </Link>
                <Link href={"/ankara"} className="menuitems">
                  <MenuButton>Ankara</MenuButton>
                </Link>
                <Link href={"/shoe"} className="menuitems">
                  <MenuButton>Shoes</MenuButton>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Link href={"/men"} className="menuitems">
                  <MenuButton>Men Shop</MenuButton>
                </Link>
                <Link href={"/clutch"} className="menuitems">
                  <MenuButton>Clutches</MenuButton>
                </Link>
                <Link href={"/dress"} className="menuitems">
                  <MenuButton>Gown Dresses</MenuButton>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <SocialMedia />
            <Link href={"/policy"} className="menuitems">
              <MenuButton>Policies</MenuButton>
            </Link>
          </div>
        </div>
        <div className=" border-t-2 text-center py-2  ">
          <p className="">
            Eagle Collections. All Rights Reserved. ©{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
