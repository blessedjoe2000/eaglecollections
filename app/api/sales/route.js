import { mongooseConnect } from "@/lib/connectDB";
import ProductModel from "@/model/ProductModel";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await mongooseConnect();

  try {
    const products = await ProductModel.find().sort({ updatedAt: -1 });

    const onSales = products.filter(
      (product) =>
        product.newPrice !== null &&
        product.newPrice !== undefined &&
        product.newPrice < product.price
    );

    return new Response(JSON.stringify(onSales), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
