import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import { CarGrid } from "../components/car/CarGrid";
import { CarFilter, FilterState } from "../components/car/CarFilter";
import { CarItem } from "../components/car/CarCard";
import { apiRequest } from "../utils/api";

export const CarListings: React.FC = () => {
  const { language } = useLanguage();
  const { wishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const initialFilters: FilterState = {
    search: searchParams.get("search") || "",
    make: searchParams.get("make") || "all",
    bodyType: searchParams.get("bodyType") || "all",
    fuelType: searchParams.get("fuelType") || "all",
    transmission: searchParams.get("transmission") || "all",
    condition: searchParams.get("condition") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minYear: searchParams.get("minYear") || "",
    maxYear: searchParams.get("maxYear") || "",
    sort: searchParams.get("sort") || "newest"
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const showWishlistOnly = searchParams.get("wishlist") === "true";

  const fetchCars = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (filters.search) q.append("search", filters.search);
      if (filters.make !== "all") q.append("make", filters.make);
      if (filters.bodyType !== "all") q.append("bodyType", filters.bodyType);
      if (filters.fuelType !== "all") q.append("fuelType", filters.fuelType);
      if (filters.transmission !== "all") q.append("transmission", filters.transmission);
      if (filters.minPrice) q.append("minPrice", filters.minPrice);
      if (filters.maxPrice) q.append("maxPrice", filters.maxPrice);
      if (filters.sort) q.append("sort", filters.sort);

      const res = await apiRequest(`/cars?${q.toString()}`);
      if (res.success && res.data) {
        let results: CarItem[] = res.data;
        if (showWishlistOnly) {
          results = results.filter(c => wishlist.includes(c.id));
        }
        setCars(results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters, showWishlistOnly, wishlist]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      make: "all",
      bodyType: "all",
      fuelType: "all",
      transmission: "all",
      condition: "all",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      sort: "newest"
    });
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {showWishlistOnly
              ? (language === "am" ? "የወደዷቸው መኪኖች ዝርዝር" : "Your Saved Wishlist")
              : (language === "am" ? "የመኪና ሽያጭ ዝርዝር" : "Available Car Inventory")}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {language === "am"
              ? "በቦሌ ሩዋንዳ ሾውሩም ያሉ የተረጋገጡ መኪኖች"
              : "Explore verified Ethiopian listings with transparent ETB pricing in Bole Rwanda"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FF8C00]" />
            <select
              value={filters.sort}
              onChange={e => handleFilterChange({ ...filters, sort: e.target.value })}
              className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-[#FF8C00]"
            >
              <option value="newest">{language === "am" ? "አዳዲስ የተጨመሩ" : "Recently Added"}</option>
              <option value="price_asc">{language === "am" ? "ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ" : "Price: Low to High"}</option>
              <option value="price_desc">{language === "am" ? "ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ" : "Price: High to Low"}</option>
              <option value="year_desc">{language === "am" ? "ዓ.ም፡ አዲስ" : "Year: Newest"}</option>
              <option value="mileage_asc">{language === "am" ? "ኪ.ሜ፡ ዝቅተኛ" : "Mileage: Lowest"}</option>
            </select>
          </div>

          <div className="flex items-center p-1 bg-gray-900 border border-gray-800 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid" ? "bg-[#FF8C00] text-gray-950 font-bold" : "text-gray-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "list" ? "bg-[#FF8C00] text-gray-950 font-bold" : "text-gray-400 hover:text-white"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 xl:col-span-3">
          <CarFilter
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={cars.length}
          />
        </aside>

        <main className="lg:col-span-8 xl:col-span-9">
          <CarGrid cars={cars} loading={loading} viewMode={viewMode} />
        </main>
      </div>
    </div>
  );
};
