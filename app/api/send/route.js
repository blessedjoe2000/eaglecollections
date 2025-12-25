import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, mobile, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: {
        name: "Eagle Collections Store",
        address: process.env.ADMIN_EMAIL,
      },
      to: [`${process.env.ADMIN_NOTIFY_EMAIL}, ${process.env.ORG_EMAIL}`],
      subject: `Message from Eagle Collections Website`,
      text: `${firstName} ${lastName} with email "${email}" and phone number "${mobile}" sent a message with this content "${message}"`,
    });

    return new Response(JSON.stringify("message sent"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
