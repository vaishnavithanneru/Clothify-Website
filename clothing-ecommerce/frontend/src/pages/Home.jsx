import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6">Welcome to Clothify</h1>
      <p className="text-xl text-gray-600 mb-10">Premium clothing for Men, Women & Kids</p>
      <Link to="/products" className="btn btn-primary text-lg px-8 py-4">Shop Now</Link>
    </div>
  );
};

export default Home;