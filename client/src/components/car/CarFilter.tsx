import React from "react";
import { Filter, RotateCcw, Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export interface FilterState {
  search: string;
  make: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  condition: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  sort: string;
}

interface CarFilterProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const CarFilter: React.FC<CarFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const { t, language } = useLanguage();

  const handleChange = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const makes = [
    { value: "all", label: t.allMakes },
    { value: "Toyota", label: "Toyota (ቶዮታ)" },
    { value: "Hyundai", label: "Hyundai (ሃዩንዳይ)" },
    { value: "Isuzu", label: "Isuzu (ኢሱዙ)" },
    { value: "Volkswagen", label: "Volkswagen (ቮልስዋገን)" },
    { value: "Suzuki", label: "Suzuki (ሱዙኪ)" },
    { value: "Nissan", label: "Nissan (ኒሳን)" },
    { value: "BYD", label: "BYD EV (ቢ ዋይ ዲ)" }
  ];

  const fuelTypes = [
    { value: "all", label: t.allFuelTypes },
    { value: "Petrol", label: language === "am" ? "ቤንዚን (Petrol)" : "Petrol" },
    { value: "Diesel", label: language === "am" ? "ናፍጣ (Diesel)" : "Diesel" },
    { value: "Electric", label: language === "am" ? "ኤሌክትሪክ (Electric EV)" : "Electric (EV)" },
    { value: "Hybrid", label: language === "am" ? "ሃይብሪድ (Hybrid)" : "Hybrid" }
  ];

  const bodyTypes = [
    { value: "all", label: t.allBodyTypes },
    { value: "SUV", label: "SUV / 4x4" },
    { value: "Sedan", label: "Sedan (ሴዳን)" },
    { value: "Pickup", label: "Pickup / Double Cab" },
    { value: "Hatchback", label: "Hatchback (ቪትዝ/ስዊፍት)" }
  ];

  const transmissions = [
    { value: "all", label: t.allTransmissions },
    { value: "Automatic", label: language === "am" ? "ኦቶማቲክ" : "Automatic" },
    { value: "Manual", label: language === "am" ? "ማኑዋል" : "Manual" }
  ];

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 space-y-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Filter className="w-4 h-4 text-[#FF8C00]" />
          <span>{language === "am" ? "የመኪና ማጣሪያ" : "Filter Listings"}</span>
          <span className="text-xs font-normal text-gray-400">({totalResults})</span>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#FF8C00] transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetFilters}</span>
        </button>
      </div>

      {/* Search text */}
      <div className="relative">
        <input
          type="text"
          value={filters.search}
          onChange={e => handleChange("search", e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8C00]"
        />
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
      </div>

      {/* Make dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300">{t.specMake}</label>
        <select
          value={filters.make}
          onChange={e => handleChange("make", e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-[#FF8C00]"
        >
          {makes.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Fuel Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300">{t.specFuel}</label>
        <select
          value={filters.fuelType}
          onChange={e => handleChange("fuelType", e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-[#FF8C00]"
        >
          {fuelTypes.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Body Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300">Body Type</label>
        <select
          value={filters.bodyType}
          onChange={e => handleChange("bodyType", e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-[#FF8C00]"
        >
          {bodyTypes.map(b => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300">{t.specTransmission}</label>
        <select
          value={filters.transmission}
          onChange={e => handleChange("transmission", e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-[#FF8C00]"
        >
          {transmissions.map(tr => (
            <option key={tr.value} value={tr.value}>{tr.label}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300">{t.priceRange}</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder={t.minPrice}
            value={filters.minPrice}
            onChange={e => handleChange("minPrice", e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8C00]"
          />
          <input
            type="number"
            placeholder={t.maxPrice}
            value={filters.maxPrice}
            onChange={e => handleChange("maxPrice", e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8C00]"
          />
        </div>
      </div>
    </div>
  );
};
