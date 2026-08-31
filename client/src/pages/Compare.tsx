import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale, X, Trash2, ArrowLeft, Fuel, Gauge, Calendar, ShieldCheck } from "lucide-react";
import { useCompare } from "../context/CompareContext";
import { useLanguage } from "../context/LanguageContext";
import { formatETB, formatKM } from "../utils/formatters";
import { apiRequest } from "../utils/api";
import { CarItem } from "../components/car/CarCard";

export const Compare: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { language, t } = useLanguage();
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      if (compareList.length === 0) {
        setCars([]);
        setLoading(false);
        return;
      }
      try {
        const res = await apiRequest("/cars");
        if (res.success && res.data) {
          const matched = res.data.filter((c: CarItem) => compareList.includes(c.id));
          setCars(matched);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [compareList]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-400">
        Loading comparison...
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-[#111827] border border-gray-800 text-center space-y-4">
        <div className="p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] inline-block">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">{t.compareTitle}</h2>
        <p className="text-xs text-gray-400 leading-relaxed">{t.noCarsToCompare}</p>
        <Link to="/inventory" className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs">
          {language === "am" ? "መኪናዎችን ይምረጡ" : "Explore Inventory"}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t.compareTitle}</h1>
          <p className="text-xs text-gray-400 mt-1">Comparing {cars.length} vehicles side-by-side</p>
        </div>

        <button
          onClick={clearCompare}
          className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{language === "am" ? "ሁሉንም አጽዳ" : "Clear All"}</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 min-w-[650px]">
          {cars.map(car => (
            <div key={car.id} className="p-5 rounded-3xl bg-[#111827] border border-gray-800 space-y-4 relative">
              <button
                onClick={() => removeFromCompare(car.id)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-red-400 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <img
                src={car.images[0]}
                alt={car.title}
                className="w-full h-44 object-cover rounded-2xl"
              />

              <div>
                <span className="text-[10px] text-[#FF8C00] uppercase font-bold">{car.make}</span>
                <h3 className="text-base font-bold text-white line-clamp-1">{car.title}</h3>
                <p className="text-lg font-black text-[#FF8C00] mt-1">{formatETB(car.price)}</p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-gray-800 text-xs text-gray-300">
                <div className="flex justify-between py-1 border-b border-gray-800/50">
                  <span className="text-gray-400">Year</span>
                  <span className="font-semibold">{car.year}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800/50">
                  <span className="text-gray-400">Mileage</span>
                  <span className="font-semibold">{formatKM(car.mileage, language)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800/50">
                  <span className="text-gray-400">Fuel Type</span>
                  <span className="font-semibold">{car.fuelType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800/50">
                  <span className="text-gray-400">Transmission</span>
                  <span className="font-semibold">{car.transmission}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800/50">
                  <span className="text-gray-400">Customs</span>
                  <span className="font-semibold truncate max-w-[130px]">{car.customsStatus}</span>
                </div>
              </div>

              <Link
                to={`/car/${car.id}`}
                className="block w-full py-2.5 rounded-xl bg-gray-900 hover:bg-[#FF8C00] hover:text-gray-950 font-bold text-xs text-center transition"
              >
                View Full Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
