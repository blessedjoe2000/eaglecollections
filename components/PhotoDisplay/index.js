import photo1 from "@/public/images/eagle_collection_swiss_lace.jpg";
import photo2 from "@/public/images/eagle_collection_hollandiase.jpg";
import photo3 from "@/public/images/eagle_collection_handmadelaces.jpg";
import photo4 from "@/public/images/eagle_collection_lining.jpg";
import photo5 from "@/public/images/eagle_collection_swiss_cotton.jpg";
import photo6 from "@/public/images/eagle_collection_zirconia.jpg";
import photo7 from "@/public/images/eagle_collection_georges.jpg";
import photo8 from "@/public/images/eagle_collection_sequins_laces.jpg";
import photo9 from "@/public/images/eagle_collection_embriodry.jpg";
import photo10 from "@/public/images/eagle_collection_shoes.jpg";
import photo11 from "@/public/images/eagle_collection_ankara.jpg";
import photo12 from "@/public/images/eagle_collection_tailoring.jpg";
import Image from "next/image";
import { PhotoWrapper, ScrollContainer } from "./styles";
import Link from "next/link";

export default function PhotoDisplay() {
  const listOfPhotos = [
    {
      image: photo1,
      desc: "swiss lace",
      link: "/lace",
    },
    {
      image: photo6,
      desc: "zirconia",
      link: "/jewelry",
    },
    {
      image: photo2,
      desc: "hollandiase",
      link: "/ankara",
    },
    {
      image: photo3,
      desc: "handmade lace",
      link: "/lace",
    },
    {
      image: photo5,
      desc: "senator fabric",
      link: "/men",
    },
    {
      image: photo7,
      desc: "georges",
      link: "/george",
    },
    {
      image: photo4,
      desc: "lining and tafeta",
      link: "/accessories",
    },
    {
      image: photo8,
      desc: "sequins lace",
      link: "/lace",
    },
    {
      image: photo9,
      desc: "embriodry",
      link: "/accessories",
    },
    {
      image: photo10,
      desc: "shoe and bag",
      link: "/bag",
    },
    {
      image: photo11,
      desc: "ankara",
      link: "/ankara",
    },
    {
      image: photo12,
      desc: "tailoring materials",
      link: "/accessories",
    },
  ];
  return (
    <ScrollContainer className="flex">
      {listOfPhotos.map((photo, index) => (
        <PhotoWrapper key={index} className="">
          <Link href={photo.link}>
            <Image
              src={photo.image}
              alt={photo.desc}
              height={500}
              width={300}
            />
          </Link>
        </PhotoWrapper>
      ))}
    </ScrollContainer>
  );
}
