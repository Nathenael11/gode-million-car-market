import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Scale, Gauge, Fuel, Calendar, MapPin, CheckCircle2, Car as CarIcon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { EthiopianBadge } from "../common/EthiopianBadge";
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
  isFeatured?: boolean;
  isComingSoon?: boolean;
  isInspectionVerified?: boolean;
  viewsCount?: number;
  images: string[];
  features?: string[];
  featuresAm?: string[];
  description?: string;
  descriptionAm?: string;
  seller?: {
    id: string;
    name: string;
    nameAm?: string;
    phone: string;
    whatsapp?: string;
    telegram?: string;
    location?: string;
  };
}

interface CarCardProps {
  car: CarItem;
  viewMode?: "grid" | "list";
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=70";

export const CarCard: React.FC<CarCardProps> = ({ car, viewMode = "grid" }) => {
  const { language, t } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const [imgSrc, setImgSrc] = useState(
    car.images && car.images.length > 0 ? car.images[0] : FALLBACK_IMAGE
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  const wishlisted = isWishlisted(car.id);
  const compared = isInCompare(car.id);

  const displayTitle = language === "am" && car.titleAm ? car.titleAm : car.title;
  const displayCondition = language === "am" && car.conditionAm ? car.conditionAm : car.condition;
  const displayFuel = language === "am" && car.fuelTypeAm ? car.fuelTypeAm : car.fuelType;
  const displayTrans = language === "am" && car.transmissionAm ? car.transmissionAm : car.transmission;
  const displayLocation = language === "am" && car.locationAm ? car.locationAm : car.location;

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-400/80 transition-all duration-300 card-hover">
      {/* Image container */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
            <CarIcon className="w-10 h-10 text-slate-300" />
          </div>
        )}
        <img
          src={imgSrc}
          alt={displayTitle}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {car.isComingSoon && <EthiopianBadge type="comingSoon" />}
          {car.fuelType === "Electric" && <EthiopianBadge type="dutyFree" />}
          {car.isFeatured && !car.isComingSoon && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF8C00] text-white text-[10px] font-extrabold uppercase shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Action buttons on image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => (compared ? removeFromCompare(car.id) : addToCompare(car.id))}
            className={`p-2 rounded-xl backdrop-blur-md transition shadow-xs ${
              compared
                ? "bg-[#FF8C00] text-white font-bold"
                : "bg-white/90 text-slate-700 hover:text-[#FF8C00] hover:bg-white"
            }`}
            title="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleWishlist(car.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition shadow-xs ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 text-slate-700 hover:text-red-500 hover:bg-white"
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current text-white" : ""}`} />
          </button>
        </div>

        {/* Overlaid year & mileage */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white font-semibold">
          <span className="px-2 py-0.5 rounded-md bg-slate-900/70 backdrop-blur-md">{car.year}</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-900/70 backdrop-blur-md">{formatKM(car.mileage, language)}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-orange-600 font-bold tracking-wide uppercase">{car.make} • {car.bodyType}</span>
            <span className="text-slate-600 font-medium">{displayCondition}</span>
          </div>

          <Link to={`/car/${car.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF8C00] transition line-clamp-1">
              {displayTitle}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </div>

          {/* Quick Specs Pill */}
          <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
              <span className="truncate">{displayFuel}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{displayTrans}</span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-lg font-black text-slate-900 tracking-tight">
              {formatETB(car.price)}
            </p>
            <p className="text-[11px] text-orange-600 font-semibold">
              {car.priceNegotiable ? (language === "am" ? "?? ??????" : "Negotiable") : (language === "am" ? "??????" : "Fixed Price")}
            </p>
          </div>

          <Link
            to={`/car/${car.id}`}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-xs shadow-sm shadow-orange-500/20 hover:brightness-105 transition"
          >
            {t.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
};
