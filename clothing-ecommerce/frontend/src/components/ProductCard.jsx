import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="card hover:shadow-lg transition">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.category}</p>
          <p className="text-xl font-bold mt-2">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;