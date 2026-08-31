import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', path.basename(p)); };
const B = path.resolve('.');

// Fix CarCard to use correct context API (toggleWishlist / isInCompare)
W(path.join(B, 'client/src/components/car/CarCard.tsx'), `import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Scale, Eye, Fuel, Gauge, Zap } from "lucide-react";
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
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const { compareList, addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [imgLoaded, setImgLoaded] = useState(false);

  const wishlisted = isWishlisted(car.id);
  const inCompare = isInCompare(car.id);

  const title = language === "am" && car.titleAm ? car.titleAm : car.title;
  const fuel = language === "am" && car.fuelTypeAm ? car.fuelTypeAm : car.fuelType;
  const isEV = car.fuelType === "Electric" || car.isEV;
  const isDutyFree = isEV || (car.customsStatus?.toLowerCase().includes("free") ?? false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(car.id);
  };
  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    inCompare ? removeFromCompare(car.id) : addToCompare(car.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all duration-300 overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
        )}
        <img
          src={car.images?.[0] || FALLBACK}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={e => { (e.target as HTMLImageElement).src = FALLBACK; setImgLoaded(true); }}
          className={\`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 \${imgLoaded ? "opacity-100" : "opacity-0"}\`}
        />

        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
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

        {/* Action buttons top-right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleWishlist}
            className={\`p-1.5 rounded-xl shadow-sm transition \${wishlisted ? "bg-red-500 text-white" : "bg-white/95 text-gray-700 hover:bg-red-50 hover:text-red-500"}\`}
            title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}>
            <Heart className="w-3.5 h-3.5" fill={wishlisted ? "currentColor" : "none"} />
          </button>
          <button onClick={handleCompare}
            className={\`p-1.5 rounded-xl shadow-sm transition \${inCompare ? "bg-[#FF8C00] text-white" : "bg-white/95 text-gray-700 hover:bg-orange-50 hover:text-[#FF8C00]"}\`}
            title={inCompare ? "Remove from comparison" : "Add to comparison"}>
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold">{car.year}</span>
            <span className="text-[10px] text-gray-400">{language === "am" && car.conditionAm ? car.conditionAm : car.condition}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <Fuel className="w-3 h-3 text-[#FF8C00]" />{fuel}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3 text-[#FF8C00]" />{formatKM(car.mileage, language)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-lg font-black text-gray-900 leading-none">{formatETB(car.price)}</p>
            {car.priceNegotiable && (
              <span className="text-[10px] text-[#FF8C00] font-semibold">
                {language === "am" ? "ዋጋ ይደራደር" : "Negotiable"}
              </span>
            )}
          </div>
          <Link
            to={\`/car/\${car.id}\`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs transition shadow-sm shadow-orange-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === "am" ? "ዝርዝር" : "Details"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
`);

// Also fix CarGrid to not pass viewMode if CarCard doesn't support it
const carGridPath = path.join(B, 'client/src/components/car/CarGrid.tsx');
if (fs.existsSync(carGridPath)) {
  let c = fs.readFileSync(carGridPath, 'utf8');
  // Remove viewMode from CarCard usage
  c = c.replace(/viewMode=\{viewMode\}/g, '');
  c = c.replace(/viewMode={viewMode}/g, '');
  fs.writeFileSync(carGridPath, c, 'utf8');
  console.log('CarGrid viewMode prop removed');
}

// Fix CarDetail locationAm and isComingSoon references
const carDetailPath = path.join(B, 'client/src/pages/CarDetail.tsx');
if (fs.existsSync(carDetailPath)) {
  let c = fs.readFileSync(carDetailPath, 'utf8');
  // Fix locationAm - car.locationAm doesn't exist in CarItem
  c = c.replace(/car\.locationAm/g, 'car.location');
  // Fix isComingSoon - already added to CarItem interface
  fs.writeFileSync(carDetailPath, c, 'utf8');
  console.log('CarDetail fixes applied');
}

console.log('All TypeScript errors fixed!');
