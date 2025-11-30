import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real products from your backend
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data.products || res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign: 'center', padding: '100px', fontSize: '24px'}}>Loading Products...</div>;

  return (
    <div className="App">
      {/* Amazon-style Header */}
      <header style={{
        background: '#131921',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <h1 style={{fontSize: '28px', fontWeight: 'bold'}}>Clothify</h1>
        <div style={{flex: 1, margin: '0 30px'}}>
          <input type="text" placeholder="Search products..." style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '16px'
          }} />
        </div>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <span>Hello, Guest</span>
          <span>Orders</span>
          <div style={{
            background: '#febd69',
            color: '#131921',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 'bold'
          }}>Cart (0)</div>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1441986300917-64672809604f")',
        backgroundSize: 'cover',
        color: 'white',
        textAlign: 'center',
        padding: '120px 20px'
      }}>
        <h1 style={{fontSize: '52px', marginBottom: '20px'}}>Welcome to Clothify</h1>
        <p style={{fontSize: '24px'}}>Premium Clothing for Men, Women & Kids</p>
      </div>

      {/* Real Products Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '40px auto',
        padding: '0 20px'
      }}>
        <h2 style={{fontSize: '32px', marginBottom: '30px', textAlign: 'center'}}>All Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {products.map(product => (
            <div key={product._id} style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              transition: '0.3s',
              cursor: 'pointer'
            }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
               onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <img 
                src={product.image || 'https://picsum.photos/400/500'} 
                alt={product.name}
                style={{width: '100%', height: '320px', objectFit: 'cover'}}
              />
              <div style={{padding: '20px'}}>
                <h3 style={{fontSize: '20px', marginBottom: '10px', fontWeight: '600'}}>
                  {product.name}
                </h3>
                <p style={{color: '#666', marginBottom: '10px'}}>
                  {product.category} • Sizes: {product.sizes?.join(', ')}
                </p>
                <p style={{fontSize: '24px', fontWeight: 'bold', color: '#B12704', margin: '15px 0'}}>
                  ₹{product.price}
                </p>
                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: '#ffd814',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{
        background: '#232f3e',
        color: 'white',
        textAlign: 'center',
        padding: '40px',
        marginTop: '80px'
      }}>
        <p>&copy; 2025 Clothify - Full Stack MERN E-commerce by You</p>
      </footer>
    </div>
  );
}

export default App;