import logo from "@/public/images/eaglecollectionslogo.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={`/products/page/1`}>
      <Image
        src={logo}
        alt="eagle collections logo"
        width="160"
        height="auto"
        priority
      />
    </Link>
  );
}
