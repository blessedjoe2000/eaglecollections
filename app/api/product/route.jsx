import { mongooseConnect } from "@/app/lib/connectDB";
import Product from "@/app/model/ProductModel";

export async function GET(req) {
  await mongooseConnect();

  try {
    // const productIds = await req.json();
    const allProducts = await Product.find();

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(req) {
  await mongooseConnect();

  try {
    // const data = await req.json();
    // const ids = data.ids.map((id) => new mongoose.Types.ObjectId(id));
    // const allProducts = await Product.find({ _id: { $in: ids } }).sort({
    //   updatedAt: -1,
    // });

    console.log("allProducts");

    return new Response(JSON.stringify(""), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
