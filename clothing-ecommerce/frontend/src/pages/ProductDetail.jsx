import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => {
      setProduct(res.data);
      setSelectedSize(res.data.sizes[0]);
    });
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 py-10">
      <div>
        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-bold text-blue-600 mb-6">₹{product.price}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Select Size</label>
          <div className="flex gap-3">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-3 border rounded-lg font-medium transition
                  ${selectedSize === size ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-400'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn btn-primary w-full text-lg py-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;