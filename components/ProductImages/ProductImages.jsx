"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(() => images?.[0]);

  useEffect(() => {
    // Check if activeImage is not already set
    if (!activeImage && images && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [activeImage, images]);

  return (
    <div className="sm:flex gap-1 shadow-sm p-5 bg-white">
      <div className="relative overflow-hidden rounded-md ">
        <Image
          src={activeImage}
          alt={""}
          width={400}
          height={200}
          priority
          // className="rounded-md scale-95 hover:scale-100 transition-transform duration-300"
        />
      </div>
      <div className="flex gap-1 sm:flex-col mt-2 sm:mt-0">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={
              activeImage === image
                ? " p-1 bg-light-grey border-2 border-light-green"
                : " p-1 bg-light-grey border-2 border-transparent"
            }
          >
            <Image
              src={image}
              alt=""
              width={70}
              height={50}
              className="rounded-md"
              priority
            />
          </button>
        ))}
      </div>
    </div>
  );
}
