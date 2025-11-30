import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/orders/${id}`).then(res => setOrder(res.data));
  }, [id]);

  if (!order) return <div className="text-center py-20">Loading order...</div>;

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-700">
          Thank you for your purchase!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <p className="text-lg mb-4">
          <strong>Order ID:</strong> #{order._id}
        </p>
        <p className="text-lg mb-6">
          <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="text-2xl font-bold text-blue-600">
          Total: ₹{order.totalPrice}
        </p>
      </div>

      <div className="mb-10">
        <p className="text-lg text-gray-600">
          A confirmation email has been sent to your inbox.
        </p>
      </div>

      <Link to="/products" className="btn btn-primary text-lg px-10 py-4">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;