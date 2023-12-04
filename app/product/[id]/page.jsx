"use client";
import { useParams } from "next/navigation";
import { useFetchAllProduct } from "@/internalAPI/FetchAllProducts";
import Image from "next/image";

export default function Product() {
  const { id: _id } = useParams();
  const { data } = useFetchAllProduct();
  const productDetails = data?.find((product) => product._id === _id);

  return (
    <div>
      product page
      <h2>{productDetails?.title}</h2>
      <Image
        src={productDetails?.images[0]}
        alt="product image"
        width={200}
        height={200}
      />
    </div>
  );
}
