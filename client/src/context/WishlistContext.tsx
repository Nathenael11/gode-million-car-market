import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (carId: string) => void;
  isWishlisted: (carId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("gode_million_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("gode_million_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (carId: string) => {
    setWishlist(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const isWishlisted = (carId: string) => wishlist.includes(carId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
