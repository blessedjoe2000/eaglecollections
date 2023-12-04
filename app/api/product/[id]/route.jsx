import { mongooseConnect } from "@/lib/connectDB";
import Product from "@/model/ProductModel";

export async function GET(req, ctx) {
  await mongooseConnect();

  const productId = ctx.params;
  console.log("product id from url", ctx);

  try {
    const productById = await Product.findById(id);

    return new Response(JSON.stringify(productById), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
