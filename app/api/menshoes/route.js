import { fetchAllProducts } from "@/internalAPI/FetchAllProducts";
import { mongooseConnect } from "@/lib/connectDB";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await fetchAllProducts();

    const searchQuery = "Men Shoes";

    const searchedProducts = allProducts.filter((product) =>
      product?.category?.[0].toLowerCase().includes(searchQuery)
    );

    return new Response(JSON.stringify(searchedProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
