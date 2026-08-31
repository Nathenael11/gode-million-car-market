import React from "react";
import { Link } from "react-router-dom";
import { Heart, Scale, Gauge, Fuel, Calendar, MapPin, CheckCircle2 } from "lucide-react";
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

export const CarCard: React.FC<CarCardProps> = ({ car, viewMode = "grid" }) => {
  const { language, t } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const wishlisted = isWishlisted(car.id);
  const compared = isInCompare(car.id);

  const displayTitle = language === "am" && car.titleAm ? car.titleAm : car.title;
  const displayCondition = language === "am" && car.conditionAm ? car.conditionAm : car.condition;
  const displayFuel = language === "am" && car.fuelTypeAm ? car.fuelTypeAm : car.fuelType;
  const displayTrans = language === "am" && car.transmissionAm ? car.transmissionAm : car.transmission;
  const displayLocation = language === "am" && car.locationAm ? car.locationAm : car.location;

  const mainImage = car.images && car.images.length > 0
    ? car.images[0]
    : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80";

  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col md:flex-row bg-[#111827] border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-[#FF8C00]/40 transition-all duration-300">
        <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-gray-900">
          <img
            src={mainImage}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent md:hidden" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {car.isComingSoon && <EthiopianBadge type="comingSoon" />}
            {car.fuelType === "Electric" && <EthiopianBadge type="dutyFree" />}
            {car.isFeatured && !car.isComingSoon && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF8C00] text-gray-950 text-[10px] font-extrabold uppercase shadow-sm">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={() => toggleWishlist(car.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition ${
                wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-gray-950/60 text-gray-300 hover:text-white hover:bg-gray-950/90"
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[#FF8C00] uppercase tracking-wider">
                {car.make} • {car.bodyType}
              </span>
              {car.plateCode && <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300">{car.plateCode}</span>}
            </div>

            <Link to={`/car/${car.id}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-[#FF8C00] transition line-clamp-1">
                {displayTitle}
              </h3>
            </Link>

            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="truncate">{displayLocation}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900/80 border border-gray-800">
                <Calendar className="w-3.5 h-3.5 text-[#FF8C00]" />
                <span>{car.year}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900/80 border border-gray-800">
                <Gauge className="w-3.5 h-3.5 text-[#FF8C00]" />
                <span>{formatKM(car.mileage, language)}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900/80 border border-gray-800">
                <Fuel className="w-3.5 h-3.5 text-[#FF8C00]" />
                <span className="truncate">{displayFuel}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900/80 border border-gray-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">{displayTrans}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xl font-extrabold text-[#FF8C00] tracking-tight">
                {formatETB(car.price)}
              </p>
              <p className="text-[11px] text-gray-400">
                {car.priceNegotiable ? (language === "am" ? "ዋጋ የሚነጋገር" : "Negotiable") : (language === "am" ? "የማይቀነስ" : "Fixed Price")}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => (compared ? removeFromCompare(car.id) : addToCompare(car.id))}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  compared
                    ? "bg-[#FF8C00]/20 border-[#FF8C00] text-[#FF8C00]"
                    : "bg-gray-900 border-gray-800 text-gray-300 hover:text-white"
                }`}
                title="Compare"
              >
                <Scale className="w-4 h-4" />
              </button>

              <Link
                to={`/car/${car.id}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-xs shadow-md shadow-orange-500/20 hover:brightness-110 transition text-center"
              >
                {t.viewDetails}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col bg-[#111827] border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-[#FF8C00]/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
      <div className="relative w-full h-52 overflow-hidden bg-gray-900">
        <img
          src={mainImage}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {car.isComingSoon && <EthiopianBadge type="comingSoon" />}
          {car.fuelType === "Electric" && <EthiopianBadge type="dutyFree" />}
          {car.isFeatured && !car.isComingSoon && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF8C00] text-gray-950 text-[10px] font-extrabold uppercase shadow-sm">
              Featured
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => (compared ? removeFromCompare(car.id) : addToCompare(car.id))}
            className={`p-2 rounded-xl backdrop-blur-md transition ${
              compared
                ? "bg-[#FF8C00] text-gray-950 font-bold"
                : "bg-gray-950/60 text-gray-300 hover:text-white hover:bg-gray-950/90"
            }`}
            title="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleWishlist(car.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-gray-950/60 text-gray-300 hover:text-white hover:bg-gray-950/90"
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
          <span className="px-2 py-0.5 rounded bg-gray-950/70 backdrop-blur-md font-mono">{car.year}</span>
          <span className="px-2 py-0.5 rounded bg-gray-950/70 backdrop-blur-md font-mono">{formatKM(car.mileage, language)}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="text-[#FF8C00] font-semibold">{car.make} • {car.bodyType}</span>
            <span className="truncate">{displayCondition}</span>
          </div>

          <Link to={`/car/${car.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-[#FF8C00] transition line-clamp-1">
              {displayTitle}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 mb-3">
            <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 py-2.5 px-3 rounded-xl bg-gray-900/60 border border-gray-800/80 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
              <span className="truncate">{displayFuel}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{displayTrans}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
          <div>
            <p className="text-lg font-extrabold text-[#FF8C00] tracking-tight">
              {formatETB(car.price)}
            </p>
            <p className="text-[10px] text-gray-400">
              {car.priceNegotiable ? (language === "am" ? "ዋጋ የሚነጋገር" : "Negotiable") : (language === "am" ? "የማይቀነስ" : "Fixed")}
            </p>
          </div>

          <Link
            to={`/car/${car.id}`}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-xs shadow-md shadow-orange-500/20 hover:brightness-110 transition"
          >
            {t.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
};
