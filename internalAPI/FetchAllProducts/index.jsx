import { useQuery, QueryClient } from "@tanstack/react-query";

export const fetchAllProducts = async () => {
  const domainUrl = "http://localhost:3000";
  const response = await fetch(`${domainUrl}/api/product`);
  if (!response.ok) {
    throw new Error("Cannot fetch data");
  }

  return await response.json();
};

export const useFetchAllProduct = () => {
  const queryClient = new QueryClient();
  return useQuery({ queryKey: ["allProductsData"], queryFn: fetchAllProducts });
};
