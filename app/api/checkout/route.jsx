import { mongooseConnect } from "@/lib/connectDB";
import OrderModel from "@/model/OrderModel";
import ProductModel from "@/model/ProductModel";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  await mongooseConnect();

  try {
    const { name, email, phone, address, zipCode, country, cartProductIds } =
      await req.json();
    const uniqueProductIds = [...new Set(cartProductIds)];
    const cartProductData = await ProductModel.find({
      _id: { $in: uniqueProductIds },
    });

    let line_items = [];

    for (const productId of uniqueProductIds) {
      const productInfo = cartProductData.find(
        (product) => product._id.toString() === productId
      );
      const quantity =
        cartProductIds.filter((id) => id === productId)?.length || 0;
      if (quantity && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }

    const orderInfo = await OrderModel.create({
      line_items,
      name,
      email,
      phone,
      address,
      zipCode,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=true",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=true",
      metadata: { orderId: orderInfo?._id.toString() },
    });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
