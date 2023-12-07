import Link from "next/link";
import Logo from "../Logo/Logo";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/meetup";
import BottomFooter from "../ButtomFooter/BottomFooter";

export default function Footer() {
  return (
    <div>
      <div className="sm:flex justify-between items-center gap-5 bg-main-purple text-white p-5 ">
        <div className="flex justify-center items-center">
          <Logo />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href={"/"}>Shop</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Account</Link>
          <Link href={"/"}>Contact</Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href={"/favorite"}>Saved products</Link>
          <Link href={"/"}>Ankara</Link>
          <Link href={"/"}>Shoes</Link>
          <Link href={"/"}>Jewelries</Link>
        </div>
        <div className="flex flex-col justify-center text-center gap-2">
          <h2>Our Social Media</h2>
          <div className="flex gap-1 justify-center items-center">
            <SocialIcon network="facebook" url="/" />
            <SocialIcon network="instagram" url="/" />
            <SocialIcon network="whatsapp" url="/" />
            <SocialIcon network="tiktok" url="/" />
            <SocialIcon network="twitter" url="/" />
          </div>
        </div>
      </div>
      <BottomFooter />
    </div>
  );
}
