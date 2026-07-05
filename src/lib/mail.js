import nodemailer from "nodemailer";

export async function sendOrderStatusEmail(order) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log(
      `Email skipped: order ${order.orderNumber} is now ${order.status} for ${order.customerEmail}`,
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to: order.customerEmail,
    subject: `Order ${order.orderNumber} status updated`,
    text: `Hello ${order.customerName},\n\nYour Cash on Delivery order ${order.orderNumber} is now ${order.status}.\n\nTotal: Tk ${order.total}\nPayment: Cash on Delivery\n\nThank you.`,
  });
}
