import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  // Load cart: DB if logged in, localStorage if guest
  useEffect(() => {
    if (user) {
      fetchCartFromDB();
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(localCart);
    }
  }, [user]);

  const fetchCartFromDB = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data.items || []); // ← Fixed typo here
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setCart([]);
    }
  };

  const addToCart = async (product, size, qty = 1) => {
    const newItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      qty
    };

    if (user) {
      try {
        await API.post('/cart/add', newItem);
        fetchCartFromDB();
        toast.success('Added to cart!');
      } catch (err) {
        toast.error('Failed to add item');
      }
    } else {
      // Guest: Use immutable update
      setCart(prevCart => {
        const existing = prevCart.find(
          i => i.product === product._id && i.size === size
        );

        let updatedCart;
        if (existing) {
          updatedCart = prevCart.map(item =>
            item.product === product._id && item.size === size
              ? { ...item, qty: item.qty + qty }
              : item
          );
        } else {
          updatedCart = [...prevCart, newItem];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Added to cart!');
        return updatedCart;
      });
    }
  };

  const updateQty = (productId, size, qty) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }

    if (user) {
      API.put('/cart/update', { productId, size, qty })
        .then(() => fetchCartFromDB())
        .catch(() => toast.error('Update failed'));
    } else {
      setCart(prev => {
        const updated = prev.map(item =>
          item.product === productId && item.size === size
            ? { ...item, qty }
            : item
        );
        localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeFromCart = (productId, size) => {
    if (user) {
      API.delete('/cart/remove', { data: { productId, size } })
        .then(() => fetchCartFromDB())
        .catch(() => toast.error('Remove failed'));
    } else {
      setCart(prev => {
        const updated = prev.filter(
          i => !(i.product === productId && i.size === size)
        );
        localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearCart = () => {
    if (user) {
      API.delete('/cart/remove', { data: {} }); // Optional: clear DB
    }
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Sync guest cart to DB when user logs in
  useEffect(() => {
    if (user) {
      const syncGuestCart = async () => {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (localCart.length > 0) {
          try {
            await API.post('/cart/sync', { items: localCart });
            localStorage.removeItem('cart');
            fetchCartFromDB();
            toast.success('Your guest cart has been merged!');
          } catch (err) {
            console.error('Cart sync failed', err);
          }
        }
      };
      syncGuestCart();
    }
  }, [user]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};