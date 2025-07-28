// contexts/CartContext.jsx
"use client";

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToCart = (service) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === service.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addToFavorites = (service) => {
    setFavoriteItems(prev => {
      const exists = prev.find(item => item.id === service.id);
      if (exists) return prev;
      return [...prev, service];
    });
  };

  const removeFromFavorites = (itemId) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== itemId));
  };

  const toggleFavorite = (service) => {
    console.log('Context: toggleFavorite called for service:', service.id, service.name);
    const isFavorite = favoriteItems.find(item => item.id === service.id);
    if (isFavorite) {
      console.log('Context: Removing from favorites');
      removeFromFavorites(service.id);
    } else {
      console.log('Context: Adding to favorites');
      addToFavorites(service);
    }
  };

  const addToCartFromFavorites = (favoriteItem) => {
    const existingItem = cartItems.find(item => item.id === favoriteItem.id);
    if (existingItem) {
      updateQuantity(favoriteItem.id, existingItem.quantity + 1);
    } else {
      setCartItems(prev => [...prev, { ...favoriteItem, quantity: 1 }]);
    }
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const favoritesCount = favoriteItems.length;

  const value = {
    cartItems,
    favoriteItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    addToCartFromFavorites,
    cartItemsCount,
    cartTotal,
    favoritesCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};