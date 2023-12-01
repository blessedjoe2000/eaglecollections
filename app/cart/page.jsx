"use client";

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Cart() {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => {
      return axios.get("/api/product");
    },
  });

  return <div>Cart</div>;
}
