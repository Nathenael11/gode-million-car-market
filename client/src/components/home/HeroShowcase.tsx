import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ShieldCheck,
  Gauge,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  PhoneCall,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { formatETB } from "../../utils/formatters";

interface ShowcaseCar {
  id: string;
  name: string;
  nameAm: string;
  badge: string;
  badgeAm: string;
  badgeType: "ev" | "luxury" | "popular";
  price: number;
  year: number;
  fuel: string;
  fuelAm: string;
  transmission: string;
  transmissionAm: string;
  rangeOrPower: string;
  rangeOrPowerAm: string;
  image: string;
  tagline: string;
  taglineAm: string;
}

const SHOWCASE_CARS: ShowcaseCar[] = [
  {
    id: "car-001",
    name: "Volkswagen ID.4 CROZZ Pro",
    nameAm: "ቮልስዋገን ID.4 ክሮዝ ፕሮ",
    badge: "⚡ Zero-Duty EV",
    badgeAm: "⚡ ከቀረጥ ነፃ ኢቪ",
    badgeType: "ev",
    price: 8900000,
    year: 2024,
    fuel: "Electric EV (84.8 kWh)",
    fuelAm: "ኤሌክትሪክ (84.8 kWh)",
    transmission: "Automatic",
    transmissionAm: "ኦቶማቲክ",
    rangeOrPower: "550 km Range",
    rangeOrPowerAm: "550 ኪ.ሜ ርቀት",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80",
    tagline: "100% Tax-Free electric luxury designed for Addis Ababa streets",
    taglineAm: "100% ከቀረጥ ነፃ የሆነ የቅንጦት ኤሌክትሪክ መኪና ለአዲስ አበባ መንገዶች"
  },
  {
    id: "car-002",
    name: "Toyota Land Cruiser Prado TX-L",
    nameAm: "ቶዮታ ላንድ ክሩዘር ፕራዶ TX-L",
    badge: "🚙 4WD Off-Road Legend",
    badgeAm: "🚙 ባለ 4 ጎማ ጉልበተኛ",
    badgeType: "luxury",
    price: 18500000,
    year: 2024,
    fuel: "2.8L Turbo Diesel",
    fuelAm: "2.8L ተርቦ ናፍጣ",
    transmission: "Automatic 4WD",
    transmissionAm: "ኦቶማቲክ 4WD",
    rangeOrPower: "204 HP / 500 Nm",
    rangeOrPowerAm: "204 የፈረስ ጉልበት",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    tagline: "Unrivaled executive prestige and extreme Ethiopian terrain mastery",
    taglineAm: "የክብር መገለጫ እና ማንኛውንም የኢትዮጵያ መንገድ የሚቆጣጠር"
  },
  {
    id: "car-003",
    name: "BYD Song Plus Flagship EV",
    nameAm: "ቢ ዋይ ዲ ሶንግ ፕላስ ኢቪ",
    badge: "⚡ Blade Battery EV",
    badgeAm: "⚡ ዘመናዊ ኤሌክትሪክ",
    badgeType: "ev",
    price: 7800000,
    year: 2024,
    fuel: "Electric EV (71.7 kWh)",
    fuelAm: "ኤሌክትሪክ (71.7 kWh)",
    transmission: "Single-Speed Auto",
    transmissionAm: "ኦቶማቲክ",
    rangeOrPower: "505 km Range",
    rangeOrPowerAm: "505 ኪ.ሜ ርቀት",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
    tagline: "Ultra-safe blade battery with futuristic smart cockpit & zero emissions",
    taglineAm: "አስተማማኝ ባትሪ፣ ዘመናዊ የውስጥ ክፍል እና ዜሮ የቀረጥ ወጪ"
  },
  {
    id: "car-004",
    name: "Hyundai Tucson Limited Edition",
    nameAm: "ሃዩንዳይ ቱሳን ሊሚትድ ኤዲሽን",
    badge: "✨ Premium Compact SUV",
    badgeAm: "✨ ተመራጭ የከተማ SUV",
    badgeType: "popular",
    price: 6400000,
    year: 2023,
    fuel: "1.6L Turbo Petrol",
    fuelAm: "1.6L ተርቦ ቤንዚን",
    transmission: "8-Speed Auto",
    transmissionAm: "8-ማርሽ ኦቶማቲክ",
    rangeOrPower: "Panoramic Sunroof",
    rangeOrPowerAm: "ፓኖራሚክ ጣሪያ",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80",
    tagline: "The perfect balance of city comfort, fuel efficiency, and style",
    taglineAm: "ለከተማ ምቹ፣ ነዳጅ ቆጣቢ እና ዘመናዊ መልክ ያለው ምርጥ መኪና"
  }
];

export const HeroShowcase: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setImageLoaded(false);
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_CARS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeCar = SHOWCASE_CARS[activeIndex];

  const handleNext = () => {
    setImageLoaded(false);
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_CARS.length);
  };

  const handlePrev = () => {
    setImageLoaded(false);
    setActiveIndex((prev) => (prev === 0 ? SHOWCASE_CARS.length - 1 : prev - 1));
  };

  return (
    <div
      className="relative rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden group transition-all duration-300"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Top Header Strip with Vehicle Tabs */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C00] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-orange-400">
            {language === "am" ? "የሾውሩማችን ተለይተው የቀረቡ" : "Bole Rwanda Dynamic Spotlight"}
          </span>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {SHOWCASE_CARS.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => {
                setImageLoaded(false);
                setActiveIndex(idx);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeIndex === idx
                  ? "bg-[#FF8C00] text-white shadow-md shadow-orange-500/30"
                  : "bg-white/10 hover:bg-white/20 text-slate-300"
              }`}
            >
              {language === "am" ? car.nameAm.split(" ")[0] : car.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dynamic Showcase Visual Area */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[430px] bg-gradient-to-b from-slate-100 via-white to-orange-50/40 overflow-hidden flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute w-96 h-96 rounded-full bg-orange-400/15 blur-3xl pointer-events-none -translate-y-6" />

        {/* Skeleton Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
        )}

        {/* Dynamic Car Image with Smooth Zoom */}
        <img
          key={activeCar.id}
          src={activeCar.image}
          alt={activeCar.name}
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Hotspot Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 text-xs font-black text-slate-900 shadow-lg flex items-center gap-1.5 animate-bounce-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>{language === "am" ? activeCar.badgeAm : activeCar.badge}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>120-Point Inspected</span>
          </span>
        </div>

        {/* Floating Live Price Tag */}
        <div className="absolute bottom-4 left-4 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            {language === "am" ? "የሾውሩም ዋጋ" : "Showroom Asking Price"}
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {formatETB(activeCar.price)}
          </p>
          <p className="text-[10px] text-orange-600 font-bold mt-0.5">
            {language === "am" ? "ቀረጥ የተከፈለ / ነፃ • ቦሌ ሩዋንዳ" : "Duty Paid / Free • Bole Rwanda"}
          </p>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Car"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-white/90 border border-gray-200 text-slate-800 hover:bg-[#FF8C00] hover:text-white shadow-lg transition opacity-80 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Car"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-white/90 border border-gray-200 text-slate-800 hover:bg-[#FF8C00] hover:text-white shadow-lg transition opacity-80 hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/70 backdrop-blur-md">
          {SHOWCASE_CARS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setImageLoaded(false);
                setActiveIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                activeIndex === idx ? "w-6 bg-[#FF8C00]" : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Info & Quick Action Strip */}
      <div className="p-5 sm:p-6 bg-white border-t border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {language === "am" ? activeCar.nameAm : activeCar.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "am" ? activeCar.taglineAm : activeCar.tagline}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="tel:+251911223344"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF8C00] font-bold text-xs border border-orange-200 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === "am" ? "ይደውሉ" : "Call Showroom"}</span>
            </a>

            <Link
              to="/inventory"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs shadow-md shadow-orange-200 transition"
            >
              <Eye className="w-4 h-4" />
              <span>{language === "am" ? "ዝርዝር ይመልከቱ" : "View Showroom"}</span>
            </Link>
          </div>
        </div>

        {/* Specs Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-gray-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-gray-200">
            <span className="text-[10px] font-semibold text-slate-400 block">{language === "am" ? "ዓ.ም" : "Model Year"}</span>
            <span className="font-bold text-slate-900">{activeCar.year}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-gray-200">
            <span className="text-[10px] font-semibold text-slate-400 block">{language === "am" ? "ነዳጅ / ኃይል" : "Power Train"}</span>
            <span className="font-bold text-slate-900 truncate block">
              {language === "am" ? activeCar.fuelAm : activeCar.fuel}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-gray-200">
            <span className="text-[10px] font-semibold text-slate-400 block">{language === "am" ? "ማርሽ" : "Transmission"}</span>
            <span className="font-bold text-slate-900">
              {language === "am" ? activeCar.transmissionAm : activeCar.transmission}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200">
            <span className="text-[10px] font-semibold text-orange-600 block">{language === "am" ? "ልዩ አቅም" : "Key Feature"}</span>
            <span className="font-bold text-orange-800 truncate block">
              {language === "am" ? activeCar.rangeOrPowerAm : activeCar.rangeOrPower}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
