import { mongooseConnect } from "@/lib/connectDB";
import ProductModel from "@/model/ProductModel";

export const dynamic = "force-dynamic";

export async function GET(req, ctx) {
  await mongooseConnect();

  let { page } = ctx.params;

  page = parseInt(page);
  const itemLimit = 30;

  const skipPage = (page - 1) * itemLimit;

  try {
    const allProducts = await ProductModel.find()
      .sort({
        updatedAt: -1,
      })
      .limit(itemLimit)
      .skip(skipPage);

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
