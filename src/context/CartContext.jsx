'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCartFromStorage,
  addItemToCart,
  removeItemFromCart,
  clearProductFromCart,
  getItemQuantity,
  calculateCartTotals,
} from '@/utils';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Pull initial cart items from localStorage on client mount
  useEffect(() => {
    const initialCart = getCartFromStorage();
    setCart(initialCart);
    setIsHydrated(true);

    // Keep multiple tabs in sync
    const handleStorageChange = () => {
      setCart(getCartFromStorage());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => addItemToCart(prevCart, product));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => removeItemFromCart(prevCart, productId));
  }, []);

  const deleteFromCart = useCallback((productId) => {
    setCart((prevCart) => clearProductFromCart(prevCart, productId));
  }, []);

  const getQuantity = useCallback(
    (productId) => getItemQuantity(cart, productId),
    [cart]
  );

  const { totalItems, totalCost } = calculateCartTotals(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        isHydrated,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getQuantity,
        totalItems,
        totalCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

