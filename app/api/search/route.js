import { fetchAllProducts } from "@/internalAPI/FetchAllProducts";
import { mongooseConnect } from "@/lib/connectDB";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await fetchAllProducts();
    const { searchParams } = new URL(req.url);

    const searchQuery = searchParams.get("query");

    const searchedProducts = allProducts.filter(
      (product) =>
        product?.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return new Response(JSON.stringify(searchedProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
