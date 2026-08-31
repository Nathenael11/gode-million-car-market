import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Gauge,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Eye,
  PhoneCall,
  Activity,
  Flame,
  BatteryCharging
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { formatETB } from "../../utils/formatters";

// Curated high quality automotive moving GIF animations
const MOVING_CARS = [
  {
    id: "moving-ev",
    title: "Volkswagen ID.4 CROZZ EV in Motion",
    titleAm: "ቮልስዋገን ID.4 ኤሌክትሪክ ተሽከርካሪ",
    mode: "EV Hyper-Drive",
    modeAm: "ኤሌክትሪክ ሃይፐር-ድራይቭ",
    speed: 120,
    range: "550 km",
    price: 8900000,
    // Driving dynamic car animation GIF
    gifUrl: "https://media.giphy.com/media/l41JGlwa1xY7Btxfs/giphy.gif",
    fallbackUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    badge: "⚡ Zero Emissions • 100% Duty-Free",
    badgeAm: "⚡ ዜሮ በካይ • 100% ከቀረጥ ነፃ",
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "moving-prado",
    title: "Toyota Land Cruiser Prado High-Speed",
    titleAm: "ቶዮታ ፕራዶ 4WD ከፍተኛ ፍጥነት",
    mode: "4WD Turbo Drive",
    modeAm: "ባለ 4 ጎማ ተርቦ ድራይቭ",
    speed: 160,
    range: "204 HP",
    price: 18500000,
    // Dynamic SUV off-road moving animation GIF
    gifUrl: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
    fallbackUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    badge: "🚙 4WD Off-Road Legend • Addis Luxury",
    badgeAm: "🚙 ባለ 4 ጎማ ጉልበተኛ • የክብር መገለጫ",
    accentColor: "from-orange-500 to-amber-600"
  },
  {
    id: "moving-sport",
    title: "Cyber City Night Drive",
    titleAm: "የምሽት ፈጣን የከተማ ጉዞ",
    mode: "Sport Mode Activated",
    modeAm: "ስፖርት ሞድ",
    speed: 180,
    range: "0-100 in 4.8s",
    price: 7800000,
    // Cinematic moving car night drive GIF
    gifUrl: "https://media.giphy.com/media/3o85xsGXVuYh8lM3EQ/giphy.gif",
    fallbackUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
    badge: "🔥 Turbocharged • Dynamic Acceleration",
    badgeAm: "🔥 ተርቦቻርጅድ • ፈጣን ፍጥነት",
    accentColor: "from-blue-500 to-indigo-600"
  }
];

export const DynamicMovingCar: React.FC = () => {
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(85);
  const [isHeadlightsOn, setIsHeadlightsOn] = useState(true);
  const [imageError, setImageError] = useState(false);

  const car = MOVING_CARS[selectedIdx];

  // Dynamic live speedometer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const speedInterval = setInterval(() => {
      setCurrentSpeed((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const next = prev + delta;
        return Math.max(70, Math.min(car.speed, next));
      });
    }, 800);
    return () => clearInterval(speedInterval);
  }, [isPlaying, car.speed]);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group transition-all duration-300">
      
      {/* Top Cockpit HUD Bar */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-white">
        
        {/* Dynamic Drive Mode Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-black tracking-wider text-emerald-400 uppercase flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            <span>{language === "am" ? car.modeAm : car.mode}</span>
          </span>
        </div>

        {/* Vehicle Selection Switcher */}
        <div className="flex items-center gap-1.5">
          {MOVING_CARS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setImageError(false);
                setSelectedIdx(idx);
                setCurrentSpeed(Math.floor(item.speed * 0.7));
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
                selectedIdx === idx
                  ? "bg-[#FF8C00] text-slate-950 shadow-md shadow-orange-500/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              {idx === 0 ? "⚡ EV Mode" : idx === 1 ? "🚙 4WD Prado" : "🔥 Sport"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Moving Car Video / GIF Container */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[400px] bg-slate-950 overflow-hidden flex items-center justify-center">
        
        {/* Speed Lines & Ambient Road Lighting Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60 z-10 pointer-events-none" />

        {/* Dynamic Moving Car GIF Animation */}
        <img
          key={car.id}
          src={imageError ? car.fallbackUrl : car.gifUrl}
          alt={car.title}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isPlaying ? "scale-105" : "scale-100 grayscale-30"
          }`}
        />

        {/* Simulated Headlight Beam Glow */}
        {isHeadlightsOn && (
          <div className="absolute top-1/3 left-1/4 w-72 h-40 bg-orange-400/20 blur-3xl rounded-full pointer-events-none z-10 animate-pulse" />
        )}

        {/* Top Left Live Tag Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-white text-xs font-black shadow-xl backdrop-blur-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>{language === "am" ? car.badgeAm : car.badge}</span>
          </span>
        </div>

        {/* Live HUD Speedometer Gauge Overlay */}
        <div className="absolute top-4 right-4 z-20 p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-white text-right shadow-2xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            {language === "am" ? "የፍጥነት መለኪያ" : "Live Speedometer"}
          </span>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-2xl sm:text-3xl font-mono font-black text-[#FF8C00]">
              {isPlaying ? currentSpeed : 0}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">km/h</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 via-amber-400 to-[#FF8C00] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentSpeed / car.speed) * 100}%` }}
            />
          </div>
        </div>

        {/* Live Price Tag & Duty Free Status in Bottom Left */}
        <div className="absolute bottom-4 left-4 z-20 p-3 sm:p-4 rounded-2xl bg-slate-900/95 border border-slate-800 text-white backdrop-blur-md shadow-2xl">
          <span className="text-[10px] font-semibold text-slate-400 uppercase block">
            {language === "am" ? "የመኪና ዋጋ (ቦሌ ሩዋንዳ)" : "Bole Rwanda Showroom Price"}
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#FF8C00] tracking-tight mt-0.5">
            {formatETB(car.price)}
          </p>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
            <Zap className="w-3 h-3" />
            <span>{language === "am" ? "ሙሉ ቀረጥ የተከፈለ / ነፃ" : "Duty Paid / Zero Tax Ready"}</span>
          </span>
        </div>

        {/* Interactive Play / Pause & Headlight Controls in Bottom Right */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setIsHeadlightsOn(!isHeadlightsOn)}
            title="Toggle Headlights Glow"
            className={`p-2.5 rounded-xl border backdrop-blur-md text-xs font-bold transition shadow-lg ${
              isHeadlightsOn
                ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                : "bg-slate-900/80 border-slate-700 text-slate-400"
            }`}
          >
            💡 {isHeadlightsOn ? "Lights ON" : "Lights OFF"}
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Motion" : "Play Motion"}
            className="p-2.5 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-slate-950 font-bold transition shadow-lg shadow-orange-500/30"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Action & Performance Banner */}
      <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-white">
            {language === "am" ? car.titleAm : car.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === "am"
              ? "በቦሌ ሩዋንዳ ሾውሩማችን ለሙከራ ጉዞ እና ቀጥታ ግዢ ዝግጁ የሆነ"
              : "Available for live test drives & instant delivery in Bole Rwanda"}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href="tel:+251911223344"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
          >
            <PhoneCall className="w-4 h-4 text-[#FF8C00]" />
            <span>{language === "am" ? "ይደውሉ" : "Call"}</span>
          </a>

          <Link
            to="/inventory"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:brightness-105 transition"
          >
            <Eye className="w-4 h-4" />
            <span>{language === "am" ? "ዝርዝሩን ይመልከቱ" : "View Showroom"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
