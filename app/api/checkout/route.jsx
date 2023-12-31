import { mongooseConnect } from "@/lib/connectDB";
import OrderModel from "@/model/OrderModel";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  await mongooseConnect();

  try {
    const { name, email, phone, cartProducts } = await req.json();

    let line_items = [];

    for (const cartProduct of cartProducts) {
      const productPrice = cartProduct?.newPrice
        ? cartProduct.newPrice * 100
        : cartProduct.price * 100;

      const quantity = 1;

      if (quantity && cartProduct) {
        line_items.push({
          quantity,
          tax_rates: ["txr_1ONmWpKXecqKmAes5jkQFCO0"],
          price_data: {
            currency: "USD",
            product_data: {
              name: cartProduct.title,
              images: cartProduct.images,
            },
            tax_behavior: "exclusive",
            unit_amount: productPrice,
          },
        });
      }
    }

    const orderInfo = await OrderModel.create({
      line_items,
      name,
      email,
      phone,
      address: {
        city: "",
        country: "",
        line1: "",
        line2: "",
        postal_code: "",
        state: "",
      },
      orderProducts: cartProducts.map((cartProduct) => ({
        name: cartProduct.title,
        images: cartProduct.images,
        colors: cartProduct.colors,
        sizes: cartProduct.sizes,
        price: cartProduct?.newPrice ? cartProduct.newPrice : cartProduct.price,
        quantity: 1,
      })),
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Pick up",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 7 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 2000,
              currency: "usd",
            },
            display_name: "Standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
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
