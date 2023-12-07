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
      <div>
        <Image
          src={activeImage}
          alt={""}
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>
      <div className="flex gap-1 sm:flex-col mt-2 sm:mt-0">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={
              activeImage === image
                ? " p-1 bg-light-grey border-2 border-mid-pink"
                : " p-1 bg-light-grey border-2 border-transparent"
            }
          >
            <Image
              src={image}
              alt=""
              width={70}
              height={50}
              className="rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
