import axios from "axios";

export const fetchAllProducts = async () => {
  const domainUrl = process.env.PUBLIC_URL;
  const response = await axios.get(`${domainUrl}/api/product`);
  if (response.status !== 200) {
    throw new Error("Cannot fetch data");
  }

  return await response.data;
};
