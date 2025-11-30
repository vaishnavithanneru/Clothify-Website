import nodemailer from 'nodemailer';

const sendOrderEmail = async (order, user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const itemsHtml = order.items.map(item => 
    `<li>${item.name} (${item.size}) x${item.qty} - ₹${item.price}</li>`
  ).join('');

  const html = `
    <h1>Thank you for your order, ${user.name}!</h1>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
    <h3>Items:</h3>
    <ul>${itemsHtml}</ul>
    <h2>Total: ₹${order.totalPrice}</h2>
    <p>We'll notify you when it's shipped!</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html
  });
};

export default sendOrderEmail;