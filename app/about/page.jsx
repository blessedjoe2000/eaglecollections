"use client";

import Image from "next/image";
import aboutBanner from "@/public/images/eagle_collections_banner_photo.png";
import fabric from "@/public/images/eagle_collections_fabric_2.png";
import shoeBag from "@/public/images/eagle_collections_shoe_and_bag.png";
import jewelry from "@/public/images/eagle_collections_jewelry.png";
import gele from "@/public/images/eagle_collections_gele.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container } from "@mui/system";
import { AboutButton } from "./styles";
import Link from "next/link";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <div className="mx-5 mt-5 mb-10">
      <div>
        <Image
          src={aboutBanner}
          alt="eagle collections about banner"
          height={500}
          className="image-full-width"
        />
      </div>

      <Container>
        <h1 className=" text-center sm:pt-10 pt-5" data-aos="fade-up">
          Our Services
        </h1>

        <div className="flex gap-2 text-white sm:text-lg text-md text-center mb-5 sm:mt-5 mt-2 p-5 sm:flex-row flex-col">
          <div
            className="sm:w-1/2 w-full bg-dark-blue p-5"
            data-aos="fade-right"
          >
            <div className="w-full scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale ">
              <Image
                src={shoeBag}
                alt="eagle collections shoe and bag"
                width={"full"}
                height={0}
                className="object-cover"
              />
            </div>
            <div className="w-full mt-2">
              <p>
                Our mission is to fulfill your African fashion needs, enhance
                your confidence when dressing for events, and provide you with
                the latest trends in the African fashion world at an affordable
                price.
              </p>
              <p>
                We got the men covered too, offering ready-made native attires,
                slippers, various traditional hats, Italian shoes, and belts.
                Explore our stylish pre-made Ankara attires, elegant Turkish and
                Dubai dresses for ladies, and more. We got you covered, even for
                your food warmers.
              </p>
            </div>
            <Link href="/bag">
              <AboutButton>See More</AboutButton>
            </Link>
          </div>
          <div
            className="sm:w-1/2 w-full p-5 bg-dark-blue"
            data-aos="fade-left"
          >
            <div className="w-full scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
              <Image
                src={fabric}
                alt="eagle collections african fabrics"
                width={"full"}
                height={0}
                className="object-cover"
              />
            </div>
            <div className="w-full mt-2">
              <p>
                Explore an array of authentic African fabrics, including
                exquisite handmade lace, sequins lace, Chantilly lace, cord
                lace, dry lace, and various other lace varieties. Embrace the
                elegance of Ankara wax prints, along with beautiful selections
                of silk Georges, Swiss fabrics, and Italian cotton materials for
                mens agbada and kaftan.
              </p>
              <p>
                We also provide ready-made embroidery, stylish auto-gele,
                aso-oke, sego, intorika, isi-agwu, Esan traditional wrappers
                (igbulu), a spectrum of linings, and zippers.
              </p>
            </div>
            <Link href="/ankara">
              <AboutButton>See More</AboutButton>
            </Link>
          </div>
        </div>

        <div
          className=" text-white sm:text-lg text-md text-center  p-5"
          data-aos="fade-up"
        >
          <h2 className="">We are Eagle Collections!</h2>
          <div className="flex gap-2 sm:mt-5 mt-2 sm:flex-row flex-col">
            <div
              className="sm:w-1/2 w-full p-5 bg-dark-blue"
              data-aos="fade-right"
            >
              <div className="w-full  scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                <Image
                  src={gele}
                  alt="eagle collections gele"
                  width={"full"}
                  height={0}
                  className="object-cover"
                />
              </div>
              <div className="w-full mt-2 ">
                <p>
                  We specialize in crafting custom-made attires and group
                  supplies (Asobi) for weddings, birthdays, church events,
                  meetings, and custom requests. Explore our diverse range of
                  accessories, including traditional hats, hand fans, belts, and
                  designer glasses.
                </p>
              </div>
              <Link href="/headtie">
                <AboutButton>See More</AboutButton>
              </Link>
            </div>
            <div
              className="sm:w-1/2 w-full bg-dark-blue p-5 "
              data-aos="fade-left"
            >
              <div className="w-full scale-100 transition-transform duration-300 ease-in-out hover:animate-pulseScale">
                <Image
                  src={jewelry}
                  alt="eagle collections jewelries"
                  width={"full"}
                  height={0}
                  className="object-cover"
                />
              </div>
              <div className="w-full mt-2">
                <p>
                  Count on us for all your jewelry needs, including Italian
                  shoes, bags, purses, clutches, and a variety of shoes and
                  slippers. Our bead services are available for both rental and
                  sale, perfect for weddings and various occasions. We are
                  dedicated to making your vision a reality.
                </p>
              </div>
              <Link href="/jewelry">
                <AboutButton>See More</AboutButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
