"use client";

import Glider from "glider-js";
import "glider-js/glider.min.css";
import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  SliderContainer,
  SliderTitle,
  SliderBrief,
  SliderTextContainer,
} from "./styles";
import banner1 from "@/public/images/eagle_collection_banner1.jpg";
import banner2 from "@/public/images/eagle_collection_banner2.jpg";
import banner3 from "@/public/images/eagle_collection_banner3.jpg";

import SocialMedia from "../SocialMedia";

export default function Banner() {
  const gliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const glider = new Glider(gliderRef.current, {
      slidesToShow: 1,
      dots: "#dots",
      draggable: true,
      rewind: true,
    });

    // Function to start or reset autoplay
    const startAutoplay = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (glider) {
          if (glider.page === glider.slides.length - 1) {
            glider.scrollItem(0);
          } else {
            glider.scrollItem(glider.page + 1);
          }
        }
      }, 5000);
    };

    startAutoplay();

    const handleInteraction = () => {
      startAutoplay();
    };

    gliderRef.current?.addEventListener("click", handleInteraction);

    return () => {
      clearInterval(intervalRef.current);
      gliderRef.current?.removeEventListener("click", handleInteraction);
    };
  }, []);

  const listOfDisplay = [
    {
      image: banner1,
      title: "We Offer Customized African Wedding Attire",
      brief:
        "We specialize in designing bespoke African wedding attire for brides and grooms, guiding you from fabric selection to the perfect accessories. Our expert touch ensures a stunning, cohesive look that reflects your unique style and cultural heritage for your special day.",
    },
    {
      image: banner2,
      title: "We Sell Premium Fabrics For Your Stylish Designs",
      brief:
        "We provide a diverse range of high-quality fabrics, including vibrant Ankara, elegant laces, durable wax prints, luxurious Hollandaise, and rich velvet. Whether you’re designing traditional or modern outfits, our fabrics ensure a stylish and sophisticated look for any occasion.",
    },
    {
      image: banner3,
      title: "We Will Style You On Your Special Day",
      brief:
        "We ensure you look your best on your special day with a complete, customized ensemble. From head to toe, we provide tailored outfits, handcrafted beads, elegant headties, and all the accessories needed to make your celebration truly unforgettable.",
    },
  ];

  return (
    <div className="my-1 ">
      <div className="glider-contain">
        <div ref={gliderRef} className="glider">
          {listOfDisplay.map((displayContent, index) => (
            <SliderContainer key={index} className="">
              <SliderTextContainer>
                <SliderTitle>{displayContent.title}</SliderTitle>
                <SliderBrief>{displayContent.brief}</SliderBrief>
                <div className="flex justify-start">
                  <SocialMedia />
                </div>
              </SliderTextContainer>
              <div className="">
                <div>
                  <Image
                    src={displayContent.image}
                    alt="slider"
                    height={500}
                    className="object-cover image-full-width"
                  />
                </div>
              </div>
            </SliderContainer>
          ))}
        </div>

        <div id="dots" className="glider-dots"></div>
      </div>
    </div>
  );
}
