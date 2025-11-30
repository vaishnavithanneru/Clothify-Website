// backend/controllers/productController.js

import Product from '../models/Product.js';

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products }); // THIS LINE WAS MISSING BEFORE
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};