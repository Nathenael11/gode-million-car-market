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
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  resultsCount: number;
}

export const CarFilter: React.FC<CarFilterProps> = ({
  filters,
  setFilters,
  onReset,
  resultsCount
}) => {
  const { t, language } = useLanguage();

  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-800">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-black text-sm text-slate-900">
          <Filter className="w-4 h-4 text-[#FF8C00]" />
          <span>{t.filterResults}</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
            {resultsCount}
          </span>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-[#FF8C00] flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetFilters}</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.searchPlaceholder}</label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={e => handleChange("search", e.target.value)}
            placeholder="e.g. Prado, ID.4, Accent..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.specMake}</label>
        <select
          value={filters.make}
          onChange={e => handleChange("make", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
        >
          <option value="all">{t.allMakes}</option>
          <option value="Toyota">Toyota (???)</option>
          <option value="Hyundai">Hyundai (?????)</option>
          <option value="Isuzu">Isuzu (???)</option>
          <option value="Volkswagen">Volkswagen (??????)</option>
          <option value="Suzuki">Suzuki (???)</option>
          <option value="Nissan">Nissan (???)</option>
          <option value="BYD">BYD EV (? ?? ?)</option>
        </select>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.allBodyTypes}</label>
        <select
          value={filters.bodyType}
          onChange={e => handleChange("bodyType", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
        >
          <option value="all">{t.allBodyTypes}</option>
          <option value="SUV">SUV / 4WD</option>
          <option value="Sedan">Sedan (???)</option>
          <option value="Pickup">Pickup (????)</option>
        </select>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.specFuel}</label>
        <select
          value={filters.fuelType}
          onChange={e => handleChange("fuelType", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
        >
          <option value="all">{t.allFuelTypes}</option>
          <option value="Petrol">Petrol (????)</option>
          <option value="Diesel">Diesel (???)</option>
          <option value="Electric">Electric EV (??????) ?</option>
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.specTransmission}</label>
        <select
          value={filters.transmission}
          onChange={e => handleChange("transmission", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
        >
          <option value="all">{t.allTransmissions}</option>
          <option value="Automatic">Automatic (?????)</option>
          <option value="Manual">Manual (????)</option>
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Condition / ???</label>
        <select
          value={filters.condition}
          onChange={e => handleChange("condition", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
        >
          <option value="all">All Conditions</option>
          <option value="Brand New">{t.dutyPaid === "??? ?????" ? "??? (?? ?.?)" : "Brand New"}</option>
          <option value="Used">{t.dutyPaid === "??? ?????" ? "?????" : "Used"}</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.priceRange}</label>
        <select
          value={filters.maxPrice}
          onChange={e => handleChange("maxPrice", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#FF8C00]"
        >
          <option value="">Any Price</option>
          <option value="3000000">Under 3,000,000 ETB (3M)</option>
          <option value="5000000">Under 5,000,000 ETB (5M)</option>
          <option value="10000000">Under 10,000,000 ETB (10M)</option>
          <option value="20000000">Under 20,000,000 ETB (20M)</option>
        </select>
      </div>
    </div>
  );
};
