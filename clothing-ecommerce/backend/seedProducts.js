import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const products = [
  // Men's Clothing
  { name: "Men's Classic White T-Shirt", description: "Premium cotton crew neck t-shirt", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", category: "Men", sizes: ["S", "M", "L", "XL"] },
  { name: "Men's Slim Fit Denim Jeans", description: "Stretch denim with perfect slim fit", price: 2499, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800", category: "Men", sizes: ["30", "32", "34", "36"] },
  { name: "Men's Hooded Sweatshirt", description: "Cozy fleece hoodie with kangaroo pocket", price: 1899, image: "https://images.unsplash.com/photo-1556821842-4a0d3b1989c9?w=800", category: "Men", sizes: ["S", "M", "L", "XL"] },
  { name: "Men's Formal Shirt", description: "Crisp cotton dress shirt for office", price: 1599, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800", category: "Men", sizes: ["38", "40", "42", "44"] },
  { name: "Men's Cargo Pants", description: "Durable cotton with 6 pockets", price: 2199, image: "https://images.unsplash.com/photo-1624378441864-1a1e8553c2ab?w=800", category: "Men", sizes: ["30", "32", "34", "36"] },
  { name: "Men's Polo T-Shirt", description: "Breathable pique cotton polo", price: 1099, image: "https://images.unsplash.com/photo-1586363104862-3a5e2f3f8ef8?w=800", category: "Men", sizes: ["S", "M", "L", "XL"] },
  { name: "Men's Leather Jacket", description: "Premium faux leather biker jacket", price: 5999, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", category: "Men", sizes: ["M", "L", "XL"] },
  { name: "Men's Chino Shorts", description: "Comfortable summer cotton shorts", price: 1299, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800", category: "Men", sizes: ["30", "32", "34"] },

  // Women's Clothing
  { name: "Women's Floral Maxi Dress", description: "Flowy summer dress with floral print", price: 2799, image: "https://images.unsplash.com/photo-1566174053877-1e50f7a2f3f7?w=800", category: "Women", sizes: ["XS", "S", "M", "L"] },
  { name: "Women's High Waist Jeans", description: "Skinny fit stretch high-waist jeans", price: 2299, image: "https://images.unsplash.com/photo-1585487805232-0b2a8c8e87a1?w=800", category: "Women", sizes: ["26", "28", "30", "32"] },
  { name: "Women's Oversized Hoodie", description: "Cozy and trendy oversized hoodie", price: 1999, image: "https://images.unsplash.com/photo-1554560015-12fac74d2c2e?w=800", category: "Women", sizes: ["S", "M", "L"] },
  { name: "Women's Crop Top", description: "Trendy ribbed crop top", price: 699, image: "https://images.unsplash.com/photo-1583743811627-2a68b7bb78f8?w=800", category: "Women", sizes: ["XS", "S", "M"] },
  { name: "Women's Blazer", description: "Tailored fit formal blazer", price: 3499, image: "https://images.unsplash.com/photo-1590338829147-7032a7a5fe6d?w=800", category: "Women", sizes: ["S", "M", "L"] },
  { name: "Women's Yoga Leggings", description: "High-waist, squat-proof activewear", price: 1499, image: "https://images.unsplash.com/photo-1571942463152-152fb8c67771?w=800", category: "Women", sizes: ["XS", "S", "M", "L"] },
  { name: "Women's Denim Jacket", description: "Classic cropped denim jacket", price: 2899, image: "https://images.unsplash.com/photo-1617118486381-4d4d1d5e2e44?w=800", category: "Women", sizes: ["S", "M", "L"] },
  { name: "Women's Summer Top", description: "Light and breezy off-shoulder top", price: 899, image: "https://images.unsplash.com/photo-1594223272801-787b26af2fb5?w=800", category: "Women", sizes: ["XS", "S", "M"] },
  { name: "Women's Party Dress", description: "Shimmer bodycon mini dress", price: 3299, image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800", category: "Women", sizes: ["S", "M", "L"] },
  { name: "Women's Cardigan", description: "Soft knit long cardigan", price: 1799, image: "https://images.unsplash.com/photo-1612722434979-4135e5c56c70?w=800", category: "Women", sizes: ["S", "M", "L", "XL"] },

  // Kids' Clothing
  { name: "Kids' Unicorn T-Shirt", description: "Cute rainbow unicorn graphic tee", price: 599, image: "https://images.unsplash.com/photo-1622290394757-8c5c29f43e6b?w=800", category: "Kids", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] },
  { name: "Kids' Dinosaur Hoodie", description: "Fun T-Rex print hoodie", price: 1199, image: "https://images.unsplash.com/photo-1622290363532-0cb3a8c24e6b?w=800", category: "Kids", sizes: ["4-5Y", "6-7Y", "8-9Y"] },
  { name: "Kids' Denim Overall", description: "Adorable unisex denim dungaree", price: 1499, image: "https://images.unsplash.com/photo-1622290363476-9a2e0c9b7c2c?w=800", category: "Kids", sizes: ["1-2Y", "3-4Y", "5-6Y"] },
  { name: "Kids' Princess Dress", description: "Sparkly tutu dress with glitter", price: 1799, image: "https://images.unsplash.com/photo-1582791694770-cbdc6f3b0499?w=800", category: "Kids", sizes: ["3-4Y", "5-6Y", "7-8Y"] },
  { name: "Kids' Tracksuit Set", description: "Comfortable 2-piece sport set", price: 1399, image: "https://images.unsplash.com/photo-1622290363510-5d5e0d9b2c2c?w=800", category: "Kids", sizes: ["4-5Y", "6-7Y", "8-9Y"] },
  { name: "Kids' Rain Jacket", description: "Waterproof hooded raincoat", price: 1699, image: "https://images.unsplash.com/photo-1594737626170-75c3f020c8a7?w=800", category: "Kids", sizes: ["5-6Y", "7-8Y", "9-10Y"] },
  { name: "Kids' Pajama Set", description: "Soft cotton PJ with animal print", price: 899, image: "https://images.unsplash.com/photo-1582791694770-cbdc6f3b0499?w=800", category: "Kids", sizes: ["2-3Y", "4-5Y", "6-7Y"] }
];
const seed = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connection.asPromise();
    
    console.log('Seeding products...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(products.length + ' products inserted.');
    console.log(products);
    console.log('✅ 25 products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seed();