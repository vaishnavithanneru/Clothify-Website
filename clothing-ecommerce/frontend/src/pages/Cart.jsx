import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl mb-6">Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow">
        {cart.map((item, i) => (
          <div key={i} className="flex items-center gap-6 p-6 border-b">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="text-xl font-bold">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateQty(item.product, item.size, item.qty - 1)} className="text-2xl">-</button>
              <span className="w-12 text-center font-bold">{item.qty}</span>
              <button onClick={() => updateQty(item.product, item.size, item.qty + 1)} className="text-2xl">+</button>
            </div>
            <button
              onClick={() => removeFromCart(item.product, item.size)}
              className="text-red-600 font-bold"
            >
              Remove
            </button>
          </div>
        ))}
        
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          
          {!user ? (
            <div className="text-center mb-4">
              <p className="text-red-600 font-semibold mb-4">
                Please login to proceed to checkout
              </p>
              <Link to="/login" className="btn btn-primary mr-4">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          ) : (
            <Link
              to="/checkout"
              className="btn btn-primary w-full text-center block py-4 text-xl"
            >
              Proceed to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;