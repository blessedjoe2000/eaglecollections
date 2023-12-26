import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const fetchAllProducts = async () => {
  const domainUrl = "http://localhost:3000";
  const response = await axios.get(`${domainUrl}/api/product`);
  if (response.status !== 200) {
    throw new Error("Cannot fetch data");
  }

  return await response.data;
};

export const useFetchAllProduct = () => {
  const queryClient = new QueryClient();
  return useQuery({ queryKey: ["allProducts"], queryFn: fetchAllProducts });
};
