import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Scale, Eye, Fuel, Gauge, Zap, Phone, MessageSquare } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { formatETB, formatKM } from "../../utils/formatters";

export interface CarItem {
  id: string;
  title: string;
  titleAm?: string;
  make: string;
  model: string;
  year: number;
  price: number;
  priceNegotiable?: boolean;
  condition: string;
  conditionAm?: string;
  bodyType: string;
  fuelType: string;
  fuelTypeAm?: string;
  transmission: string;
  transmissionAm?: string;
  mileage: number;
  engineCapacity?: string;
  color?: string;
  colorAm?: string;
  doors?: number;
  seats?: number;
  location: string;
  locationAm?: string;
  customsStatus?: string;
  plateCode?: string;
  description?: string;
  descriptionAm?: string;
  features?: string[];
  featuresAm?: string[];
  images: string[];
  seller?: {
    id?: string;
    name: string;
    nameAm?: string;
    phone: string;
    location?: string;
    avatar?: string;
  };
  isFeatured?: boolean;
  isEV?: boolean;
  isComingSoon?: boolean;
  createdAt?: string;
}

const FALLBACK = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=70";

interface CarCardProps {
  car: CarItem;
  compact?: boolean;
  viewMode?: "grid" | "list";
}

export const CarCard: React.FC<CarCardProps> = ({ car, compact = false, viewMode = "grid" }) => {
  const { language } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [imgLoaded, setImgLoaded] = useState(false);

  const wishlisted = isWishlisted(car.id);
  const inCompare = isInCompare(car.id);

  const title = language === "am" && car.titleAm ? car.titleAm : car.title;
  const fuel = language === "am" && car.fuelTypeAm ? car.fuelTypeAm : car.fuelType;
  const isEV = car.fuelType === "Electric" || car.isEV;
  const isDutyFree = isEV || (car.customsStatus?.toLowerCase().includes("free") ?? false);
  const sellerPhone = car.seller?.phone || "+251911223344";

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(car.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inCompare ? removeFromCompare(car.id) : addToCompare(car.id);
  };

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
        )}
        <img
          src={car.images?.[0] || FALLBACK}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={e => { (e.target as HTMLImageElement).src = FALLBACK; setImgLoaded(true); }}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Top-Left Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {car.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-[#FF8C00] text-white text-[10px] font-extrabold shadow-sm">
              {language === "am" ? "ተለይቷል" : "Featured"}
            </span>
          )}
          {isDutyFree && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              {language === "am" ? "ቀረጥ ነፃ" : "Duty-Free"}
            </span>
          )}
        </div>

        {/* Top-Right Action Buttons (Always visible on mobile, slick on desktop) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from favorites" : "Add to favorites"}
            className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all active:scale-90 ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
          </button>
          
          <button
            onClick={handleCompare}
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all active:scale-90 hidden sm:flex ${
              inCompare
                ? "bg-[#FF8C00] text-white"
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-[#FF8C00]"
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Condition & Year Overlay on Bottom Image for clean mobile look */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-bold">
            {car.year}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-xs text-slate-200 text-[10px] font-medium">
            {language === "am" && car.conditionAm ? car.conditionAm : car.condition}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/car/${car.id}`}>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 group-hover:text-[#FF8C00] transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3 text-[#FF8C00]" />
              <span>{fuel}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-[#FF8C00]" />
              <span>{formatKM(car.mileage, language)}</span>
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
              {formatETB(car.price)}
            </p>
            {car.priceNegotiable && (
              <span className="text-[10px] text-[#FF8C00] font-semibold">
                {language === "am" ? "ዋጋ ይደራደር" : "Negotiable"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Call Button on Mobile */}
            <a
              href={`tel:${sellerPhone}`}
              title="Call Seller"
              className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition active:scale-95 flex items-center justify-center"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* View Details */}
            <Link
              to={`/car/${car.id}`}
              className="flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs transition shadow-sm shadow-orange-500/20 active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === "am" ? "ዝርዝር" : "View"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
