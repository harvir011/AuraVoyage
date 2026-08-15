import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('auraVoyageWishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  const addToWishlist = (destination) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.cca3 === destination.cca3);
      if (exists) return prev;
      const updated = [...prev, destination];
      localStorage.setItem('auraVoyageWishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (code) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.cca3 !== code);
      localStorage.setItem('auraVoyageWishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isWishlisted = (code) => {
    return wishlist.some((item) => item.cca3 === code);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('auraVoyageWishlist');
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
