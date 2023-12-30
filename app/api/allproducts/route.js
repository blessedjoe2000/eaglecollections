import { fetchAllProducts } from "@/internalAPI/FetchAllProducts";
import { mongooseConnect } from "@/lib/connectDB";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await fetchAllProducts();

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
