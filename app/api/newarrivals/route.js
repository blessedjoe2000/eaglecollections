import { mongooseConnect } from "@/lib/connectDB";
import ProductModel from "@/model/ProductModel";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await mongooseConnect();

  try {
    // Get the current date and calculate the date 20 days ago
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

    // Find products where createdAt is greater than or equal to 20 days ago
    const newArrivals = await ProductModel.find({
      createdAt: { $gte: twentyDaysAgo },
    }).sort({ updatedAt: -1 });

    return new Response(JSON.stringify(newArrivals), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
