import { mongooseConnect } from "@/lib/connectDB";
import axios from "axios";

export async function GET(req) {
  await mongooseConnect();
  const domainUrl = process.env.PUBLIC_URL;
  try {
    const response = await axios.get(`${domainUrl}/api/product`);

    const allProducts = response.data;

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
