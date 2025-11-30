// backend/server.js — FINAL WORKING VERSION (Uses MongoDB Atlas)

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import 'dotenv/config'; // This loads .env file

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// CONNECT TO MONGODB ATLAS (YOUR REAL LINK)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully!'))
  .catch(err => console.log('MongoDB Connection Error:', err.message));

// AUTO SEED ONLY IF EMPTY
const autoSeed = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('No products → Seeding 25 products...');
      const { default: seed } = await import('./seedProducts.js');
      await seed();
      console.log('25 PRODUCTS SEEDED SUCCESSFULLY!');
    } else {
      console.log(`Already have ${count} products in database`);
    }
  } catch (err) {
    console.log('Seeding error:', err.message);
  }
};

autoSeed();

// MAIN PAGE — SHOWS ALL 25 PRODUCTS
app.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Clothify - Live</title>
        <style>
          body {margin:0;background:#0f0c29;color:white;font-family:Arial;text-align:center;padding:40px}
          h1 {font-size:60px;color:#ff6b6b}
          .count {font-size:40px;color:#51cf66;margin:30px}
          .grid {display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:30px;max-width:1600px;margin:50px auto}
          .card {background:white;color:black;border-radius:20px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.7)}
          img {width:100%;height:400px;object-fit:cover}
          .info {padding:30px}
          .name {font-size:26px;font-weight:bold}
          .price {font-size:40px;color:#e03131;font-weight:900}
        </style>
      </head>
      <body>
        <h1>CLOTHIFY API LIVE</h1>
        <div class="count">Total Products: ${products.length}</div>
        <a href="http://localhost:3000" style="color:#74c0fc;font-size:30px">OPEN FULL WEBSITE</a>
        <div class="grid">
          ${products.map(p => `
            <div class="card">
              <img src="${p.image}" alt="${p.name}">
              <div class="info">
                <div class="name">${p.name}</div>
                <div style="color:#868e96">Sizes: ${p.sizes?.join(', ')}</div>
                <div class="price">₹${p.price}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.send('<h1 style="color:red">Error loading products</h1>');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\nSERVER RUNNING → http://localhost:${PORT}`);
  console.log(`SEE ALL 25 PRODUCTS → http://localhost:${PORT}\n`);
});