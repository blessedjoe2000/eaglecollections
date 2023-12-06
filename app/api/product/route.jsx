import { mongooseConnect } from "@/lib/connectDB";
import Product from "@/model/ProductModel";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await Product.find();

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
