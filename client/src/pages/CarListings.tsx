import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal, Car, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import { CarGrid } from "../components/car/CarGrid";
import { CarFilter, FilterState } from "../components/car/CarFilter";
import { CarItem } from "../components/car/CarCard";
import { apiRequest } from "../utils/api";

export const CarListings: React.FC = () => {
  const { t, language } = useLanguage();
  const { wishlist } = useWishlist();
  const [searchParams] = useSearchParams();

  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

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
  const isWishlistView = searchParams.get("wishlist") === "true";

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, val]) => {
          if (val && val !== "all") query.append(key, val);
        });

        const res = await apiRequest(`/cars?${query.toString()}`);
        if (res.success && res.data) {
          let list = res.data;
          if (isWishlistView) {
            list = list.filter((c: CarItem) => wishlist.includes(c.id));
          }
          setCars(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, isWishlistView, wishlist]);

  const handleReset = () => {
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-1">
            <Car className="w-3.5 h-3.5" />
            <span>{isWishlistView ? "Saved Vehicles" : "Showroom Inventory"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isWishlistView
              ? (language === "am" ? "????? ???? ????" : "My Saved Wishlist")
              : (language === "am" ? "?????? ?? ????" : "Available Vehicles in Addis Ababa")}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {cars.length} {cars.length === 1 ? "vehicle available" : "vehicles available"} in Bole Rwanda Showroom
          </p>
        </div>

        {/* View Mode & Sort */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition ${
                viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition ${
                viewMode === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <CarFilter
            filters={filters}
            setFilters={setFilters}
            onReset={handleReset}
            resultsCount={cars.length}
          />
        </aside>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-12">
            <CarFilter
              filters={filters}
              setFilters={setFilters}
              onReset={handleReset}
              resultsCount={cars.length}
            />
          </div>
        )}

        {/* Vehicle Grid / List */}
        <div className="lg:col-span-9">
          <CarGrid cars={cars} loading={loading} viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};
