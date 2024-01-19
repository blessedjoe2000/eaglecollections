import { mongooseConnect } from "@/lib/connectDB";
import Product from "@/model/ProductModel";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await Product.find().sort({
      createdAt: -1,
    });

    console.log("allProducts", allProducts);

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
