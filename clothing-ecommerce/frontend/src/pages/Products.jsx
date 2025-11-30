import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '', category: 'All', size: '', minPrice: '', maxPrice: '', page: 1
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category !== 'All') params.append('category', filters.category);
    if (filters.size) params.append('size', filters.size);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    API.get(`/products?${params}`).then(res => setProducts(res.data.products));
  }, [filters]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Filters</h3>
          <input
            type="text"
            placeholder="Search..."
            className="w-full border p-2 rounded mb-4"
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
          <select onChange={e => setFilters({ ...filters, category: e.target.value })} className="w-full border p-2 mb-4">
            <option>All</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
          <select onChange={e => setFilters({ ...filters, size: e.target.value })} className="w-full border p-2">
            <option value="">All Sizes</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

export default Products;