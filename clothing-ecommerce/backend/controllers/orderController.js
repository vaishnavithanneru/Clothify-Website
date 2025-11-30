import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import sendOrderEmail from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const order = await Order.create({
    user: req.user.id,
    items: cart.items.map(i => ({
      product: i.product._id,
      name: i.name,
      size: i.size,
      qty: i.qty,
      price: i.price,
      image: i.image
    })),
    totalPrice
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  // Send email
  const user = req.user;
  try {
    await sendOrderEmail(order, user);
  } catch (err) {
    console.log('Email failed', err);
  }

  res.json(order);
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};