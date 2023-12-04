"use client";

import { useFetchAllProduct } from "../../internalAPI/FetchAllProducts";

export default function Cart() {
  const { data, isPending, isError } = useFetchAllProduct();

  return (
    <div>
      <p>All products</p>
      {data?.map((product) => (
        <p>{product.title}</p>
      ))}
    </div>
  );
}
