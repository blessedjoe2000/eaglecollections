import axios from "axios";

export const fetchAllProducts = async () => {
  const domainUrl = process.env.NEXTAUTH_URL;
  try {
    const response = await axios.get(`${domainUrl}/api/products`);
    if (response.status !== 200) {
      throw new Error("Cannot fetch data");
    }

    return await response.data;
  } catch (error) {
    console.log("Error fetching data: ", error.message);
    throw error;
  }
};
