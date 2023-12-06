import { useQuery, QueryClient } from "@tanstack/react-query";

const fetchAllProducts = async () => {
  const response = await fetch("/api/product");
  if (!response.ok) {
    throw new Error("Cannot fetch data");
  }

  return response.json();
};

export const useFetchAllProduct = () => {
  const queryClient = new QueryClient();
  return useQuery({ queryKey: ["allProductsData"], queryFn: fetchAllProducts });
};
