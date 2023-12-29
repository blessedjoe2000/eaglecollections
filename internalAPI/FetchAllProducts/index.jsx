import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

export const fetchAllProducts = async () => {
  const domainUrl =
    "https://eaglecollections-ey6v00y1m-blessedjoe2000.vercel.app/";
  const response = await axios.get(`${domainUrl}/api/product`);
  if (response.status !== 200) {
    throw new Error("Cannot fetch data");
  }

  return await response.data;
};

export const useFetchAllProduct = () => {
  return useQuery({ queryKey: ["allProducts"], queryFn: fetchAllProducts });
};
