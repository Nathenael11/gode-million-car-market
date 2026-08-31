import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', path.basename(p)); };
const B = path.resolve('.');

// ── CarCard ───────────────────────────────────────────────────────────────────
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
  createdAt?: string;
}

const FALLBACK = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=70";

interface CarCardProps {
  car: CarItem;
  compact?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({ car, compact = false }) => {
  const { language, t } = useLanguage();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const [imgLoaded, setImgLoaded] = useState(false);

  const isWishlisted = wishlist.includes(car.id);
  const isInCompare = compareList.includes(car.id);

  const title = language === "am" && car.titleAm ? car.titleAm : car.title;
  const fuel = language === "am" && car.fuelTypeAm ? car.fuelTypeAm : car.fuelType;
  const isEV = car.fuelType === "Electric" || car.isEV;
  const isDutyFree = isEV || car.customsStatus?.toLowerCase().includes("free");

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    isWishlisted ? removeFromWishlist(car.id) : addToWishlist(car.id);
  };
  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    isInCompare ? removeFromCompare(car.id) : addToCompare(car.id);
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

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {car.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-[#FF8C00] text-white text-[10px] font-extrabold shadow-sm">
              {language === "am" ? "ተለይቷል" : "Featured"}
            </span>
          )}
          {isDutyFree && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              {language === "am" ? "ቀረጥ ነፃ" : "Duty-Free EV"}
            </span>
          )}
        </div>

        {/* Wishlist & Compare */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={toggleWishlist}
            className={\`p-1.5 rounded-xl shadow-sm transition \${isWishlisted ? "bg-red-500 text-white" : "bg-white/95 text-gray-700 hover:bg-red-50 hover:text-red-500"}\`}>
            <Heart className="w-3.5 h-3.5" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button onClick={toggleCompare}
            className={\`p-1.5 rounded-xl shadow-sm transition \${isInCompare ? "bg-[#FF8C00] text-white" : "bg-white/95 text-gray-700 hover:bg-orange-50 hover:text-[#FF8C00]"}\`}>
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold">{car.year}</span>
            <span className="text-[10px] text-gray-400">{language === "am" && car.conditionAm ? car.conditionAm : car.condition}</span>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <Fuel className="w-3 h-3 text-[#FF8C00]" />
            {fuel}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3 text-[#FF8C00]" />
            {formatKM(car.mileage, language)}
          </span>
        </div>

        {/* Price + CTA */}
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

// ── Partners ──────────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/pages/Partners.tsx'), `import React, { useState, useEffect } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";

export const Partners: React.FC = () => {
  const { language } = useLanguage();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/partners")
      .then(r => { if (r.success && r.data) setPartners(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {language === "am" ? "አጋር ተቋማት" : "Our Local Partners"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          {language === "am"
            ? "የባንክ ብድር፣ ቴሌብር/ሲቢኢ ክፍያ፣ የመድን ዋስትና እና የቴክኒክ ምርመራ አጋሮቻችን"
            : "Our trusted network of Ethiopian banks, insurers, inspection centres, and digital payment platforms."}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-gray-400">
          {language === "am" ? "ጥቂት ቆዩ..." : "Loading partners..."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map(p => {
            const name = language === "am" && p.nameAm ? p.nameAm : p.name;
            const cat = language === "am" && p.categoryAm ? p.categoryAm : p.category;
            const desc = language === "am" && p.descriptionAm ? p.descriptionAm : p.description;
            return (
              <div key={p.id} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-orange-200 transition space-y-4">
                <div className="flex items-start gap-4">
                  <img src={p.logo} alt={name}
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-100 shrink-0"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FF8C00] tracking-wider">{cat}</span>
                    <h3 className="text-sm font-bold text-gray-900 mt-0.5">{name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span className="font-mono font-bold">{p.contact}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700 font-bold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{language === "am" ? "ኦፊሴላዊ አጋር" : "Official Partner"}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
`);

// ── Blog ──────────────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/pages/Blog.tsx'), `import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";

export const Blog: React.FC = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/blogs")
      .then(r => { if (r.success && r.data) setBlogs(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {language === "am" ? "ዜናዎች እና መመሪያዎች" : "Ethiopian Auto News & Guides"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          {language === "am"
            ? "ስለ EV ቀረጥ ነፃ ሁኔታ፣ የቀረጥ ማሻሻያ እና ምክሮች ወቅታዊ ጽሁፎች"
            : "Stay updated on EV tax exemptions, customs changes, and car care tips for the Ethiopian market."}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-sm text-gray-400">
          {language === "am" ? "ጥቂት ቆዩ..." : "Loading articles..."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {blogs.map(b => {
            const title = language === "am" && b.titleAm ? b.titleAm : b.title;
            const summary = language === "am" && b.summaryAm ? b.summaryAm : b.summary;
            const author = language === "am" && b.authorAm ? b.authorAm : b.author;
            const cat = language === "am" && b.categoryAm ? b.categoryAm : b.category;
            return (
              <article key={b.id} className="group flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-200 transition">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img src={b.image} alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=70"; }} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#FF8C00] shadow-xs">{cat}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#FF8C00]" />{b.publishedAt}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#FF8C00]" />{b.readTime}</span>
                    </div>
                    <Link to={\`/blog/\${b.slug}\`}>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#FF8C00] transition line-clamp-2">{title}</h3>
                    </Link>
                    <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">{summary}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                      <User className="w-3 h-3 text-gray-400" />{author}
                    </span>
                    <Link to={\`/blog/\${b.slug}\`} className="flex items-center gap-1 text-xs font-bold text-[#FF8C00] hover:underline">
                      <span>{language === "am" ? "ሙሉውን አንብብ" : "Read More"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
`);

// ── CompareDrawer ─────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/components/car/CompareDrawer.tsx'), `import React from "react";
import { Link } from "react-router-dom";
import { Scale, ArrowRight } from "lucide-react";
import { useCompare } from "../../context/CompareContext";
import { useLanguage } from "../../context/LanguageContext";

export const CompareDrawer: React.FC = () => {
  const { compareList, clearCompare } = useCompare();
  const { language } = useLanguage();
  if (compareList.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex items-center gap-3 p-3.5 px-5 bg-white border border-gray-200 rounded-2xl shadow-xl text-gray-900">
        <div className="p-2 rounded-xl bg-orange-100 text-[#FF8C00]">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold">
            {language === "am" ? \`\${compareList.length} መኪናዎች ተመርጠዋል\` : \`\${compareList.length} Cars Selected\`}
          </p>
          <button onClick={clearCompare} className="text-[10px] text-gray-400 hover:text-red-500 transition font-semibold">
            {language === "am" ? "ሁሉንም አጽዳ" : "Clear all"}
          </button>
        </div>
        <Link to="/compare"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF8C00] text-white font-bold text-xs shadow-md shadow-orange-200 hover:bg-[#E07B00] transition">
          <span>{language === "am" ? "አነጻጽር" : "Compare"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
`);

// ── SimilarCars ───────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/components/car/SimilarCars.tsx'), `import React from "react";
import { CarCard, CarItem } from "./CarCard";
import { useLanguage } from "../../context/LanguageContext";

interface SimilarCarsProps { cars: CarItem[]; currentCarId: string; }

export const SimilarCars: React.FC<SimilarCarsProps> = ({ cars, currentCarId }) => {
  const { language } = useLanguage();
  const similar = cars.filter(c => c.id !== currentCarId).slice(0, 3);
  if (similar.length === 0) return null;
  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {language === "am" ? "ተመሳሳይ መኪናዎች" : "Similar Vehicles"}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {language === "am" ? "ሌሎች ተመሳሳይ አማራጮች" : "Other options you might like from our Bole Rwanda showroom"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </div>
  );
};
`);

// ── EthiopianBadge ────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/components/common/EthiopianBadge.tsx'), `import React from "react";

interface EthiopianBadgeProps {
  type: "dutyPaid" | "dutyFree" | "comingSoon" | "verified" | "plate";
  text?: string;
  className?: string;
}

export const EthiopianBadge: React.FC<EthiopianBadgeProps> = ({ type, text, className = "" }) => {
  if (type === "dutyFree") return (
    <span className={\`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 \${className}\`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {text || "EV Duty-Free (ቀረጥ ነፃ)"}
    </span>
  );
  if (type === "dutyPaid") return (
    <span className={\`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-blue-50 border border-blue-200 text-blue-700 \${className}\`}>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      {text || "Duty Paid (ቀረጥ የተከፈለ)"}
    </span>
  );
  if (type === "comingSoon") return (
    <span className={\`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-amber-50 border border-amber-300 text-amber-800 \${className}\`}>
      <span>&#9889;</span>
      {text || "Coming Soon (በቅርብ)"}
    </span>
  );
  if (type === "verified") return (
    <span className={\`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-orange-50 border border-orange-200 text-orange-700 \${className}\`}>
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
      {text || "120-Point Inspected"}
    </span>
  );
  return (
    <span className={\`inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-gray-100 text-gray-800 border border-gray-200 \${className}\`}>
      {text || "Code 2"}
    </span>
  );
};
`);

console.log('All remaining files fixed!');
