import React, { createContext, useContext, useState } from "react";

interface CompareContextType {
  compareList: string[];
  addToCompare: (carId: string) => boolean;
  removeFromCompare: (carId: string) => void;
  clearCompare: () => void;
  isInCompare: (carId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<string[]>([]);

  const addToCompare = (carId: string): boolean => {
    if (compareList.includes(carId)) return false;
    if (compareList.length >= 3) {
      alert("You can compare a maximum of 3 cars at a time.");
      return false;
    }
    setCompareList(prev => [...prev, carId]);
    return true;
  };

  const removeFromCompare = (carId: string) => {
    setCompareList(prev => prev.filter(id => id !== carId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (carId: string) => compareList.includes(carId);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
};
