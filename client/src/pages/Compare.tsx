import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale, Trash2, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { useCompare } from "../context/CompareContext";
import { useLanguage } from "../context/LanguageContext";
import { formatETB, formatKM } from "../utils/formatters";
import { apiRequest } from "../utils/api";
import { CarItem } from "../components/car/CarCard";

export const Compare: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { language } = useLanguage();
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComparedCars = async () => {
      if (compareList.length === 0) {
        setCars([]);
        setLoading(false);
        return;
      }
      try {
        const res = await apiRequest("/cars");
        if (res.success && res.data) {
          setCars(res.data.filter((c: CarItem) => compareList.includes(c.id)));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComparedCars();
  }, [compareList]);

  if (compareList.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF8C00] flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Vehicles Selected for Comparison</h2>
        <p className="text-xs text-slate-500">
          Browse our showroom inventory and tap the scale icon to compare up to 3 vehicles side by side.
        </p>
        <Link
          to="/inventory"
          className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-white font-bold text-xs shadow-md"
        >
          Explore Showroom
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Side-by-Side Vehicle Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Comparing {cars.length} of 3 maximum vehicles
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
              <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
              <button
                onClick={() => removeFromCompare(car.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-700 hover:text-red-600 shadow-xs"
              >
                ?
              </button>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900">{car.title}</h3>
              <p className="text-xl font-black text-slate-900 mt-1">{formatETB(car.price)}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
              <p className="flex justify-between">
                <span className="text-slate-500">Year:</span>
                <span className="font-bold text-slate-900">{car.year}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Mileage:</span>
                <span className="font-bold text-slate-900">{formatKM(car.mileage, language)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Fuel:</span>
                <span className="font-bold text-slate-900">{car.fuelType}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Transmission:</span>
                <span className="font-bold text-slate-900">{car.transmission}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Customs:</span>
                <span className="font-bold text-slate-900">{car.customsStatus || "Duty Paid"}</span>
              </p>
            </div>

            <Link
              to={`/car/${car.id}`}
              className="block w-full py-2.5 rounded-xl bg-[#FF8C00] text-white font-bold text-xs text-center shadow-xs"
            >
              View Full Specs
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
