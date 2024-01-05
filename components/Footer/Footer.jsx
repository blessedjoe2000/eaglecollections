import Link from "next/link";
import Logo from "../Logo/Logo";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/meetup";
import BottomFooter from "../ButtomFooter/BottomFooter";

export default function Footer() {
  return (
    <div>
      <div className="sm:flex justify-between items-center gap-5 bg-dark-green text-white p-5 font-robotoFont ">
        <div className="flex justify-center items-center">
          <Logo />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href={"/george"}>Georges</Link>
          <Link href={"/lace"}>Laces</Link>
          <Link href={"/bag"}>Bags</Link>
          <Link href={"/accessories"}>Accessories</Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href={"/favorite"}>Saved products</Link>
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
            <SocialIcon network="facebook" url="/" />
            <SocialIcon
              network="instagram"
              url="/https://www.instagram.com/eaglecollectionstore?igsh=MWhqZDU3M2F3OGx5dQ%3D%3D&utm_source=qr"
            />
            <SocialIcon network="whatsapp" url="/" />
            <SocialIcon network="tiktok" url="/" />
          </div>
        </div>
      </div>
      <BottomFooter />
    </div>
  );
}
