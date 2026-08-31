import React from "react";
import { CarCard, CarItem } from "./CarCard";
import { useLanguage } from "../../context/LanguageContext";
import { Car } from "lucide-react";

interface CarGridProps {
  cars: CarItem[];
  loading?: boolean;
  viewMode?: "grid" | "list";
}

export const CarGrid: React.FC<CarGridProps> = ({
  cars,
  loading = false,
  viewMode = "grid"
}) => {
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <div key={n} className="h-80 rounded-2xl bg-[#111827] border border-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-2xl bg-[#111827] border border-gray-800">
        <div className="inline-flex p-4 rounded-2xl bg-gray-900 border border-gray-800 text-[#FF8C00] mb-4">
          <Car className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">
          {language === "am" ? "ምንም የተገኘ መኪና የለም" : "No Vehicles Found"}
        </h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          {language === "am"
            ? "እባክዎን ማጣሪያውን ይቀይሩ ወይም ሁሉንም የመኪና ዝርዝሮች ይመልከቱ።"
            : "Try adjusting your search criteria or reset filters to explore all available Ethiopian listings."}
        </p>
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {cars.map(car => (
        <CarCard key={car.id} car={car} viewMode={viewMode} />
      ))}
    </div>
  );
};
