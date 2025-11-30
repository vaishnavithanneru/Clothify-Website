import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">Clothify</Link>
        <div className="flex items-center gap-6">
          <Link to="/products">Shop</Link>
          <Link to="/cart" className="relative">
            Cart ({cart.reduce((sum, i) => sum + i.qty, 0)})
          </Link>
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;