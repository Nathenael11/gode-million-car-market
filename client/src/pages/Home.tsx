import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronRight,
  Car,
  Phone,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Award
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { CarGrid } from "../components/car/CarGrid";
import { CarItem } from "../components/car/CarCard";
import { EthiopianMap } from "../components/common/EthiopianMap";
import { apiRequest } from "../utils/api";

/* ─── Animated Moving Car Hero ─────────────────────────────────────── */
const AnimatedCarHero: React.FC = () => {
  // All photos: pure car shots, no people
  const carImages = [
    // Red Porsche Carrera on open road — no people
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85",
    // Lamborghini Aventador orange exterior — no people
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1920&q=85",
    // Black BMW M sporty car on road — no people
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=85",
    // White luxury sports car side view — no people
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=85",
  ];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % carImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {carImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === frame ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: i === frame ? "kenBurns 5s ease-in-out forwards" : "none",
          }}
        />
      ))}

      {/* Speed-lines overlay — creates "driving" feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 80px, rgba(255,255,255,0.03) 80px, rgba(255,255,255,0.03) 81px)",
          animation: "speedLines 0.8s linear infinite",
        }}
      />

      {/* Left-fade only — car visible on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/60 to-slate-950/20 sm:to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </>
  );
};

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMake, setSearchMake] = useState("all");
  const [searchFuel, setSearchFuel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    apiRequest("/cars")
      .then(res => { if (res.success && res.data) setCars(res.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("search", searchQuery.trim());
    if (searchMake !== "all") params.append("make", searchMake);
    if (searchFuel !== "all") params.append("fuelType", searchFuel);
    navigate(`/inventory?${params.toString()}`);
  };

  const featuredCars = cars.filter(c => c.isFeatured).slice(0, 6);

  // Mobile quick categories for horizontal scrolling
  const quickCategories = [
    {
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      titleEn: "EV Duty-Free",
      titleAm: "ቀረጥ ነፃ EV",
      link: "/inventory?fuelType=Electric",
      badge: "0% Tax",
      bg: "from-emerald-500/20 to-emerald-700/20 border-emerald-500/30 text-emerald-300"
    },
    {
      icon: <Flame className="w-4 h-4 text-[#FF8C00]" />,
      titleEn: "Toyota Prado",
      titleAm: "ቶዮታ ፕራዶ",
      link: "/inventory?make=Toyota",
      badge: "Popular",
      bg: "from-orange-500/20 to-amber-700/20 border-orange-500/30 text-orange-300"
    },
    {
      icon: <Award className="w-4 h-4 text-blue-400" />,
      titleEn: "Brand New",
      titleAm: "አዳዲስ መኪኖች",
      link: "/inventory?condition=Brand New",
      badge: "Zero KM",
      bg: "from-blue-500/20 to-indigo-700/20 border-blue-500/30 text-blue-300"
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-purple-400" />,
      titleEn: "Under 3M ETB",
      titleAm: "ከ 3M ብር በታች",
      link: "/inventory?maxPrice=3000000",
      badge: "Budget",
      bg: "from-purple-500/20 to-pink-700/20 border-purple-500/30 text-purple-300"
    },
    {
      icon: <Car className="w-4 h-4 text-amber-400" />,
      titleEn: "SUV & 4x4",
      titleAm: "ኤስ.ዩ.ቪ / 4x4",
      link: "/inventory?bodyType=SUV",
      badge: "All Terrain",
      bg: "from-amber-500/20 to-yellow-700/20 border-amber-500/30 text-amber-300"
    },
  ];

  return (
    <>
      {/* CSS keyframe animations */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.06) translateX(2%); }
          100% { transform: scale(1.00) translateX(-2%); }
        }
        @keyframes speedLines {
          0%   { background-position: 0px 0; }
          100% { background-position: -200px 0; }
        }
        @keyframes carDrive {
          0%   { transform: translateX(110%); }
          100% { transform: translateX(-10%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="space-y-12 sm:space-y-16 pb-24 lg:pb-20">

        {/* ── Cinematic Moving Car Hero (Mobile & Desktop Touch Optimized) ── */}
        <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center overflow-hidden bg-slate-950 text-white">

          <AnimatedCarHero />

          {/* Animated car silhouette streaking across bottom */}
          <div
            className="absolute bottom-16 pointer-events-none hidden sm:block"
            style={{
              animation: "carDrive 8s linear infinite",
              animationDelay: "1s",
              zIndex: 1,
              opacity: 0.18,
            }}
          >
            <svg viewBox="0 0 200 60" width="220" height="66" fill="white">
              <ellipse cx="100" cy="50" rx="85" ry="10" opacity="0.3"/>
              <rect x="15" y="30" width="170" height="20" rx="8"/>
              <path d="M45 30 Q65 10 90 10 L140 10 Q165 10 175 30 Z"/>
              <circle cx="45" cy="52" r="10" fill="#222"/>
              <circle cx="45" cy="52" r="6" fill="#555"/>
              <circle cx="155" cy="52" r="10" fill="#222"/>
              <circle cx="155" cy="52" r="6" fill="#555"/>
              <rect x="70" y="13" width="55" height="16" rx="4" fill="rgba(135,206,250,0.4)"/>
            </svg>
          </div>

          {/* Hero Content */}
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12 sm:py-16 lg:py-20 w-full"
            style={{ zIndex: 2, animation: "fadeSlideUp 0.8s ease both" }}
          >
            <div className="max-w-2xl space-y-4 sm:space-y-6 text-left">

              {/* Bole Rwanda Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-orange-400 text-xs font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-ping" />
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {language === "am"
                    ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ — ጎዴ እና ሚሊየን 🇪🇹"
                    : "Bole Rwanda, Addis Ababa — Gode & Million 🇪🇹"}
                </span>
              </div>

              {/* Dynamic Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                {language === "am" ? (
                  <>
                    <span>ህልምዎን </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA333] to-[#FDBA74]">
                      መኪና
                    </span>
                    <br />
                    <span>በአዲስ አበባ ያግኙ</span>
                  </>
                ) : (
                  <>
                    Find Your Dream
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA333] to-[#FDBA74]">
                      Car in Addis
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {language === "am"
                  ? "ቀረጥ ነፃ ኤሌክትሪክ ተሽከርካሪዎች፣ 120-ነጥብ ምርመራ ያለፉ አዳዲስ እና ያገለገሉ መኪናዎች — ግልጽ የብር ዋጋ። ቦሌ ሩዋንዳ ሾውሩም።"
                  : "Fully inspected new & used vehicles with transparent ETB pricing. Zero-duty EVs, bank loan financing, and instant test drives at our Bole Rwanda showroom."}
              </p>

              {/* Interactive Mobile-Ready Search Form */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 max-w-xl"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={language === "am" ? "የመኪና ስም ወይም ሞዴል ፈልግ (ለምሳሌ፡ ID.4, Prado)..." : "Search make, model (e.g. ID.4, Prado)..."}
                    className="w-full pl-9 pr-3 py-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>

                <div className="flex gap-2">
                  <select
                    value={searchMake}
                    onChange={e => setSearchMake(e.target.value)}
                    className="flex-1 sm:w-32 px-3 py-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
                  >
                    <option value="all">{t.allMakes}</option>
                    <option value="Toyota">Toyota (ቶዮታ)</option>
                    <option value="Hyundai">Hyundai (ሃዩንዳይ)</option>
                    <option value="Isuzu">Isuzu (ኢሱዙ)</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Suzuki">Suzuki (ሱዙኪ)</option>
                    <option value="BYD">BYD EV</option>
                  </select>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#FF8C00] to-[#E07B00] hover:brightness-110 text-white font-bold text-xs rounded-xl sm:rounded-2xl transition shadow-lg shadow-orange-500/30 shrink-0 active:scale-95"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.searchButton}</span>
                  </button>
                </div>
              </form>

              {/* Mobile Quick Action Buttons & Showroom Dial */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="tel:+251911223344"
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>{language === "am" ? "ቀጥታ ደውሉ" : "Call Showroom"}</span>
                </a>

                <a
                  href="https://wa.me/251911223344"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-400/40 text-green-300 text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                  <span>WhatsApp</span>
                </a>

                <Link
                  to="/sell"
                  className="px-4 py-2 rounded-xl bg-[#FF8C00]/20 hover:bg-[#FF8C00]/30 border border-[#FF8C00]/50 text-orange-300 text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ml-auto sm:ml-0"
                >
                  <Car className="w-3.5 h-3.5 text-orange-400" />
                  <span>{language === "am" ? "መኪና ይሽጡ" : "Sell Car"}</span>
                </Link>
              </div>

            </div>
          </div>

          {/* Desktop Stats Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-md border-t border-white/10 py-3 hidden md:block" style={{ zIndex: 2 }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Car className="w-4 h-4 text-[#FF8C00]" />
                <span className="text-xs font-bold text-slate-300">500+ {language === "am" ? "የተረጋገጡ መኪኖች" : "Verified Cars"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300">120-Point {language === "am" ? "ምርመራ" : "Inspected"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-300">0% {language === "am" ? "EV ቀረጥ ነፃ" : "EV Duty Tax"}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-slate-300">70% {language === "am" ? "የባንክ ብድር" : "Bank Financing"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mobile Touch Category Story Carousel (Swipeable Pills) ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>{language === "am" ? "ፈጣን ምድቦች (Quick Browse)" : "Quick Categories"}</span>
            </h2>
            <span className="text-[11px] text-slate-400 sm:hidden">👈 {language === "am" ? "ያንሸራትቱ" : "Swipe"}</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
            {quickCategories.map(cat => (
              <Link
                key={cat.link}
                to={cat.link}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${cat.bg} border backdrop-blur-xs active:scale-95 transition-all shadow-xs`}
              >
                <div className="p-1 rounded-lg bg-white/10">{cat.icon}</div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {language === "am" ? cat.titleAm : cat.titleEn}
                  </p>
                  <span className="text-[10px] opacity-75 font-semibold">{cat.badge}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured Cars Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-1">
                <Car className="w-3.5 h-3.5" />
                <span>{language === "am" ? "የተመረጡ መኪናዎች" : "Top Picks"}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900">
                {language === "am" ? "ተለይተው የቀረቡ መኪናዎች" : "Featured Vehicles"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "am"
                  ? "በቦሌ ሩዋንዳ ሾውሩማችን ታቅፈው የቀረቡ ምርጥ አማራጮች"
                  : "Hand-picked selections at our Bole Rwanda showroom"}
              </p>
            </div>
            <Link
              to="/inventory"
              className="flex items-center gap-1 text-xs font-bold text-[#FF8C00] hover:underline"
            >
              <span>{language === "am" ? "ሁሉንም ይዩ" : "View All"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <CarGrid cars={featuredCars} loading={loading} />

          <div className="text-center mt-8">
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-orange-500/25 active:scale-95"
            >
              <span>{language === "am" ? "ሁሉንም ተሽከርካሪዎች ይዩ (500+)" : "Browse All Vehicles (500+)"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="bg-[#1A1A2E] py-12 sm:py-16 text-white rounded-3xl mx-3 sm:mx-6 lg:mx-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-xl sm:text-3xl font-black text-white">
                {language === "am" ? "ለምን ጎዴ እና ሚሊየን?" : "Why Gode & Million?"}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
                {language === "am"
                  ? "ለዓመታት አዲስ አበባን ያገለገልን የቦሌ ሩዋንዳ የመኪና ገበያ ማዕከል"
                  : "Bole Rwanda's most trusted car marketplace — serving Addis Ababa for over a decade"}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                { icon: "🔍", title: language === "am" ? "120-ነጥብ ምርመራ" : "120-Pt Inspected", desc: language === "am" ? "እያንዳንዱ መኪና ሙሉ ቴክኒካዊ ምርመራ ካለፈ በኋላ ብቻ ይቀርባል" : "Full mechanical inspection before listing" },
                { icon: "⚡", title: language === "am" ? "EV ቀረጥ ነፃ" : "EV Duty-Free", desc: language === "am" ? "ቮልስዋገን ID.4፣ BYD Song Plus — ዜሮ ቀረጥ" : "Volkswagen ID.4, BYD Song Plus — zero excise tax" },
                { icon: "🏦", title: language === "am" ? "ባንክ ብድር" : "Bank Financing", desc: language === "am" ? "እስከ 70% ብድር፣ 3-5 ዓ.ም ስምምነት" : "CBE & Awash Bank auto loans up to 70%" },
                { icon: "💰", title: language === "am" ? "ግልጽ ዋጋ" : "Clear Pricing", desc: language === "am" ? "ቴሌብር እና ሲቢኢ ብር ተቀባይ" : "Full ETB pricing — Telebirr & CBE accepted" },
              ].map(f => (
                <div key={f.title} className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF8C00]/40 transition">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-4">{f.icon}</div>
                  <h3 className="text-white font-bold text-xs sm:text-sm mb-1">{f.title}</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mobile-Friendly Contact Strip ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#FF8C00] via-[#FFA333] to-[#E07B00] rounded-3xl p-6 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-orange-500/20">
            <div className="text-white text-center sm:text-left">
              <h3 className="text-lg sm:text-2xl font-black">
                {language === "am" ? "ሾውሩማችንን ይጎብኙ" : "Visit Our Showroom Today"}
              </h3>
              <p className="text-orange-100 text-xs sm:text-sm mt-1">
                {language === "am"
                  ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ — ሰኞ - ቅዳሜ፡ 8:30 – 18:30"
                  : "Bole Rwanda, Near Edna Mall Road — Mon-Sat 8:30 AM – 6:30 PM"}
              </p>
            </div>
            <div className="flex flex-row gap-2.5 w-full sm:w-auto">
              <a
                href="tel:+251911223344"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#FF8C00] font-bold text-xs sm:text-sm hover:bg-orange-50 transition shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>+251-91-122-3344</span>
              </a>
              <Link
                to="/contact"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/20 border border-white/40 text-white font-bold text-xs sm:text-sm hover:bg-white/30 transition active:scale-95"
              >
                {language === "am" ? "ያግኙን" : "Contact"}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Interactive Map ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EthiopianMap />
        </section>
      </div>
    </>
  );
};
