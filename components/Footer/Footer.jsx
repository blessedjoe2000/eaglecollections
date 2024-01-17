import Link from "next/link";
import Logo from "../Logo/Logo";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/meetup";

export default function Footer() {
  return (
    <footer className=" ">
      <div className="flex flex-colflex flex-col ">
        <div className="sm:flex justify-between items-center gap-5 bg-dark-green text-white p-5 font-robotoFont">
          <div className="flex justify-center items-center">
            <Logo />
          </div>
          <div className="flex flex-col justify-center items-center ">
            <Link href={"/george"}>Georges</Link>
            <Link href={"/lace"}>Laces</Link>
            <Link href={"/bag"}>Bags</Link>
            <Link href={"/accessories"}>Accessories</Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link href={"/slippers"}>Slippers</Link>
            <Link href={"/ankara"}>Ankara</Link>
            <Link href={"/shoe"}>Shoes</Link>
            <Link href={"/jewelry"}>Jewelries</Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link href={"/men"}>Men Products</Link>
            <Link href={"/clutch"}>Clutches</Link>
            <Link href={"/dress"}>Gown Dresses</Link>
            <Link href={"/headtie"}>Headtie Gele</Link>
          </div>
          <div className="flex flex-col justify-center text-center gap-2">
            <h2 className="text-lg text-white">Our Social Media</h2>
            <div className="flex gap-1 justify-center items-center">
              <SocialIcon
                network="facebook"
                url="https://www.facebook.com/profile.php?id=100064705848755&mibextid=ZbWKwL"
                target="_blank"
              />
              <SocialIcon
                network="instagram"
                url="https://www.instagram.com/eaglecollectionstore?igsh=MWhqZDU3M2F3OGx5dQ%3D%3D&utm_source=qr"
                target="_blank"
              />
              <SocialIcon
                network="whatsapp"
                url="https://wa.me/12103109644"
                target="_blank"
              />
              <SocialIcon
                network="tiktok"
                url="https://www.tiktok.com/@eaglecollections_store?_t=8j44epTfpTq&_r=1"
                target="_blank"
              />
            </div>
          </div>
        </div>
        <div className="border-t-2 bg-dark-green text-white text-center py-2 ">
          <p>Eagle Collections. All Rights Reserved. ©2023</p>
        </div>
      </div>
    </footer>
  );
}
