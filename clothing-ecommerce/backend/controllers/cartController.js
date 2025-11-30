import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  if (!req.user) return res.json({ items: [] });

  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, size, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (!req.user) {
    return res.json({ message: 'Add to cart allowed for guests (handled in frontend)' });
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty || 1;
  } else {
    cart.items.push({
      product: productId,
      size,
      qty: qty || 1,
      name: product.name,
      price: product.price,
      image: product.image
    });
  }

  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

export const updateCart = async (req, res) => {
  const { productId, size, qty } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(i => i.product.toString() === productId && i.size === size);
  if (item) item.qty = qty;
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId, size } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => !(i.product.toString() === productId && i.size === size));
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};

export const syncCart = async (req, res) => {
  const { items } = req.body;
  if (!req.user) return res.status(401).json({ message: 'Login required' });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) continue;

    const existing = cart.items.find(i => i.product.toString() === item.product && i.size === item.size);
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.items.push({
        product: item.product,
        size: item.size,
        qty: item.qty,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  }

  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
};