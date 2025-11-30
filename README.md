# Clothing Brand E-Commerce Web App (MERN)

**Objective**

Build a fully functional e-commerce web application for a fictional clothing brand using the MERN stack (MongoDB, Express.js, React, Node.js). The app supports user registration/login, product browsing with search/filters/pagination, shopping cart for guests & users, mock checkout, order saving, and sending order confirmation emails via Nodemailer.

---

## Repo structure (recommended)

```
clothing-ecommerce/

├── backend/

│   ├── config/

│   │   └── db.js

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   ├── utils/

│   ├── seedProducts.js

│   ├── server.js

│   └── package.json

│ ├── frontend/ │

 ├── src/ │ │

 ├── components/ │

│ │ ├── Navbar.jsx │ │

 │ ├── ProductCard.jsx │ │

 │ ├── Filters.jsx │ │

│ └── CartItem.jsx │ │

 ├── context/ │

│ │ └── AuthContext.jsx │

│ │ └── CartContext.jsx │ │

├── pages/ │ │

 │ ├── Home.jsx │ │

 │ ├── Products.jsx │ │

│ ├── ProductDetail.jsx │ │

│ ├── Cart.jsx │

│ │ ├── Checkout.jsx │

 │ │ └── OrderSuccess.jsx │

│ ├── services/ │

│ │ └── api.js (axios instance) │

│ ├── App.jsx │

│ └── index.css │

└── README.md (with setup instructions)
```

---

## Quick start (development)

> This README assumes you have Node.js (v18+), npm or yarn, and MongoDB (local or Atlas).

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/clothing-ecommerce.git
cd clothing-ecommerce
```

### 2. Backend setup

```bash
cd backend
npm install backend-memory-server
npm install
```
node seedProducts.js

Create a `.env` file in `backend/` (example below). Then run the server:

```bash
# dev (with nodemon)
npm run dev
# or prod
node server.js
```

**Sample `.env`**

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/clothingdb?retryWrites=true&w=majority
JWT_SECRET=some_long_random_secret
NODE_ENV=development
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password_or_mailtrap_pass
CLIENT_URL=http://localhost:3000
```

> For Gmail, use an app password (if 2FA enabled) or use Mailtrap/SendGrid for testing.

### 3. Seed demo products (one-time)

Create `seedProducts.js` in the backend root (script includes an array of 20+ product objects). Then run:

```bash
node seedProducts.js
```

This will insert the demo products into your `products` collection.

### 4. Frontend setup

```bash
cd ../frontend
npm install
npm run dev # or npm start
```

Default frontend port: `3000` (React). It should use `CLIENT_URL` when contacting backend.

---



## Backend: Models (summary)

* **User**: `{ name, email (unique), password (hashed), role? }`
* **Product**: `{ name, description, price, image, category, sizes: ["S","M","L","XL"], stock }`
* **Cart**: `{ user: ObjectId|null, items: [{ product: ObjectId, name, size, qty }] }`
* **Order**: `{ user: ObjectId|null, items: [{ product, name, size, qty, price }], totalPrice, orderDate, status }`

---

## API Endpoints (suggested)

> Base: `http://localhost:5000/api`

### Auth

* `POST /api/auth/register` — body: `{ name, email, password }`
* `POST /api/auth/login` — body: `{ email, password }` → returns JWT in HTTP-only cookie
* `POST /api/auth/logout` — clears cookie

### Products

* `GET /api/products` — query: `?page=1&limit=10&search=tee&category=Men&size=M&minPrice=10&maxPrice=100`
* `GET /api/products/:id` — single product
* `POST /api/products` — (protected/admin) create product
* `PUT /api/products/:id` — update product
* `DELETE /api/products/:id` — delete product

### Cart

* `GET /api/cart` — get current user's cart (protected)
* `POST /api/cart/add` — body: `{ productId, size, qty }` (can also be used for guest by sending a `guestId`)
* `PUT /api/cart/update` — body: `{ productId, size, qty }`
* `DELETE /api/cart/remove` — body: `{ productId, size }`

For guests: store cart in `localStorage` and sync on login via `POST /api/cart/merge`.

### Orders

* `POST /api/orders` — body: `{ items: [...], shippingDetails? }` — create order, clear cart, send confirmation email
* `GET /api/orders/:id` — get order (protected)
* `GET /api/orders/user` — list user orders (protected)

---

## Important Implementation Notes

### Authentication

* Use `bcryptjs` to hash passwords.
* Use `jsonwebtoken` (JWT) and set it as an **HTTP-only** cookie (safer than localStorage for tokens).
* Protect routes with middleware that verifies the cookie token and attaches `req.user`.


## Seed products: tips

* Create an array of **at least 20** product objects. Each product: `{ name, description, price, image: 'https://picsum.photos/seed/1/600/400', category: 'Men'|'Women'|'Kids', sizes: ['S','M','L','XL'], stock }`.
* Make categories and sizes varied so filters are meaningfully tested.

---

## Testing checklist

* [ ] Register + Login (password hashed)
* [ ] Protected routes blocked when not logged in
* [ ] Product listing: search + filters + pagination
* [ ] Product detail page shows correct fields
* [ ] Add to cart as guest + update qty + remove
* [ ] Merge guest cart on login
* [ ] Place order (POST /api/orders)
* [ ] Order saved in DB with correct structure
* [ ] Order confirmation email received

---

## Deployment notes

* Use environment variables on the host (Render, Railway, Heroku, Vercel for frontend).
* Ensure `CLIENT_URL` is set on the backend to allow CORS & cookies to be used correctly.
* For production email, consider SendGrid or Mailgun.

---

## Helpful commands & git tips

* Ignore `node_modules` using `.gitignore`:

```
node_modules/
.env
```

* If you get permission denied when pushing to GitHub, check your remote URL and authentication method. Use HTTPS if you don't have SSH keys configured:

```bash
git remote set-url origin https://github.com/<your-username>/<repo>.git
git add .
git commit -m "Initial commit"
git push -u origin main


Tell me which of those you want next and I will generate the files/code snippets.
