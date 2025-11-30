import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API from '../services/api';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    try {
      const res = await API.post('/orders');
      toast.success('Order placed successfully! Check your email.');
      clearCart();
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between py-3 border-b">
            <div>
              <span>{item.name} ({item.size}) × {item.qty}</span>
            </div>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between text-xl font-bold mt-6 pt-4 border-t">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <p className="text-gray-600 mb-6">
          This is a mock checkout. No real payment is processed.
        </p>
        <button
          onClick={handlePlaceOrder}
          className="btn btn-primary w-full py-4 text-xl font-bold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;