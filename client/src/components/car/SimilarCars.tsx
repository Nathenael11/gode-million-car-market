import React from "react";
import { CarCard, CarItem } from "./CarCard";
import { useLanguage } from "../../context/LanguageContext";

interface SimilarCarsProps { cars: CarItem[]; currentCarId: string; }

export const SimilarCars: React.FC<SimilarCarsProps> = ({ cars, currentCarId }) => {
  const { language } = useLanguage();
  const similar = cars.filter(c => c.id !== currentCarId).slice(0, 3);
  if (similar.length === 0) return null;
  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {language === "am" ? "ተመሳሳይ መኪናዎች" : "Similar Vehicles"}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {language === "am" ? "ሌሎች ተመሳሳይ አማራጮች" : "Other options you might like from our Bole Rwanda showroom"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </div>
  );
};
