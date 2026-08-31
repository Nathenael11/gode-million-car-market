import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, MapPin, ShieldCheck, Zap, TrendingUp, ChevronRight, Car, Phone, Eye
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { CarGrid } from "../components/car/CarGrid";
import { CarItem } from "../components/car/CarCard";
import { EthiopianMap } from "../components/common/EthiopianMap";
import { apiRequest } from "../utils/api";

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchMake, setSearchMake] = useState("all");
  const [searchFuel, setSearchFuel] = useState("all");
  const [searchBody, setSearchBody] = useState("all");

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    apiRequest("/cars")
      .then(res => { if (res.success && res.data) setCars(res.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchMake !== "all") params.append("make", searchMake);
    if (searchFuel !== "all") params.append("fuelType", searchFuel);
    if (searchBody !== "all") params.append("bodyType", searchBody);
    navigate(`/inventory?${params.toString()}`);
  };

  const featuredCars = cars.filter(c => c.isFeatured).slice(0, 6);

  return (
    <div className="space-y-16 pb-20">

      {/* ── Cinematic Real Car Video Background Hero ── */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-slate-950 text-white">
        
        {/* Real Moving Car Video Loop in Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover scale-100 filter brightness-100 saturate-110"
        >
          <source src="/videos/car-road-2.mp4" type="video/mp4" />
          <source src="/videos/hero-car.mp4" type="video/mp4" />
        </video>

        {/* Subtle Left-Side Text Background — Car is Fully Visible on Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20 w-full">
          <div className="max-w-2xl space-y-6 text-left">
            
            {/* Location & Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-ping" />
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {language === "am"
                  ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ — ጎዴ እና ሚሊየን 🇪🇹"
                  : "Bole Rwanda, Addis Ababa — Gode & Million 🇪🇹"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {language === "am" ? (
                <>
                  <span>ህልምዎን </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FDBA74]">መኪና</span>
                  <br />
                  <span>በአዲስ አበባ ያግኙ</span>
                </>
              ) : (
                <>
                  Find Your Dream
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FDBA74]">Car in Addis</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              {language === "am"
                ? "ቀረጥ ነፃ የኤሌክትሪክ መኪናዎች፣ 120-ነጥብ ምርመራ ያለፉ አዳዲስ እና ያገለገሉ ተሽከርካሪዎች — በኢትዮጵያ ብር ግልጽ ዋጋ። የባንክ ብድር ድጋፍ በቦሌ ሩዋንዳ ሾውሩም።"
                : "Fully inspected new & used vehicles with transparent ETB pricing. Zero-duty EVs, bank loan financing, and instant test drives at our Bole Rwanda showroom."}
            </p>

            {/* Search Box on Hero */}
            <form
              onSubmit={handleHeroSearch}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-xl"
            >
              <select
                value={searchMake}
                onChange={e => setSearchMake(e.target.value)}
                className="flex-1 px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="all">{t.allMakes}</option>
                <option value="Toyota">Toyota (ቶዮታ)</option>
                <option value="Hyundai">Hyundai (ሃዩንዳይ)</option>
                <option value="Isuzu">Isuzu (ኢሱዙ)</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Suzuki">Suzuki (ሱዙኪ)</option>
                <option value="BYD">BYD EV</option>
              </select>

              <select
                value={searchFuel}
                onChange={e => setSearchFuel(e.target.value)}
                className="flex-1 px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="all">{t.allFuelTypes}</option>
                <option value="Petrol">Petrol (ቤንዚን)</option>
                <option value="Diesel">Diesel (ናፍጣ)</option>
                <option value="Electric">⚡ Electric EV (ቀረጥ ነፃ)</option>
              </select>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs rounded-xl transition shadow-lg shadow-orange-500/30 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchButton}</span>
              </button>
            </form>

            {/* Quick Filter Tags & CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                to="/inventory?fuelType=Electric"
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{language === "am" ? "ቀረጥ ነፃ EV" : "EV Duty-Free"}</span>
              </Link>

              <Link
                to="/inventory?make=Toyota"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-bold transition"
              >
                Toyota Prado
              </Link>

              <Link
                to="/inventory?condition=Brand New"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-bold transition"
              >
                {language === "am" ? "አዲስ መኪናዎች" : "Brand New"}
              </Link>

              <a
                href="tel:+251911223344"
                className="px-4 py-1.5 rounded-xl bg-[#FF8C00]/20 hover:bg-[#FF8C00]/30 border border-[#FF8C00]/50 text-orange-300 text-xs font-bold transition flex items-center gap-1.5 ml-auto sm:ml-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+251-91-122-3344</span>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Floating Stats Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-md border-t border-white/10 py-3 hidden md:block">
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

      {/* ── Featured Cars ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {language === "am" ? "ተለይተው የቀረቡ መኪናዎች" : "Featured Vehicles"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === "am"
                ? "በቦሌ ሩዋንዳ ሾውሩማችን ታቅፈው የቀረቡ ምርጥ አማራጮች"
                : "Hand-picked selections available at our Bole Rwanda showroom"}
            </p>
          </div>
          <Link
            to="/inventory"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#FF8C00] hover:underline"
          >
            <span>{language === "am" ? "ሁሉንም ይዩ" : "View All"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <CarGrid cars={featuredCars} loading={loading} />

        <div className="text-center mt-10">
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm transition shadow-lg shadow-orange-200"
          >
            <span>{language === "am" ? "ሁሉንም ተሽከርካሪዎች ይዩ" : "Browse All Vehicles"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === "am" ? "ለምን ጎዴ እና ሚሊየን?" : "Why Gode & Million?"}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {language === "am"
                ? "ለዓመታት አዲስ አበባን ያገለገልን የቦሌ ሩዋንዳ የመኪና ገበያ ማዕከል"
                : "Bole Rwanda's most trusted car marketplace — serving Addis Ababa for over a decade"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔍",
                title: language === "am" ? "120-ነጥብ ምርመራ" : "120-Point Inspection",
                desc: language === "am" ? "እያንዳንዱ መኪና ሙሉ ቴክኒካዊ ምርመራ ካለፈ በኋላ ብቻ ይቀርባል" : "Every car undergoes a full mechanical inspection before listing"
              },
              {
                icon: "⚡",
                title: language === "am" ? "EV ቀረጥ ነፃ" : "EV Duty-Free",
                desc: language === "am" ? "ቮልስዋገን ID.4፣ BYD Song Plus — ዜሮ ቀረጥ ኢቪ መኪናዎች ዝርዝር" : "Volkswagen ID.4, BYD Song Plus — zero excise duty EVs in stock"
              },
              {
                icon: "🏦",
                title: language === "am" ? "ባንክ ብድር" : "Bank Financing",
                desc: language === "am" ? "ቀጥ ያለ የባንክ ብድር ትስስር፣ እስከ 70% ብድር፣ 3-5 ዓ.ም ስምምነት" : "Direct CBE & Awash Bank auto loan arrangement, up to 70%, 3-5 yr terms"
              },
              {
                icon: "💰",
                title: language === "am" ? "ግልጽ የብር ዋጋ" : "Transparent Pricing",
                desc: language === "am" ? "በኢትዮጵያ ብር ሙሉ ዋጋ ምንም ተደብቆ የለም — ቴሌብር እና ሲቢኢ ብር ተቀባይ" : "Full ETB pricing, no hidden fees — Telebirr & CBE Birr accepted"
              },
            ].map(f => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF8C00]/40 transition">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Strip ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FF8C00] to-[#E07B00] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-orange-200">
          <div className="text-white">
            <h3 className="text-xl sm:text-2xl font-black">
              {language === "am" ? "ሾውሩማችንን ይጎብኙ" : "Visit Our Showroom Today"}
            </h3>
            <p className="text-orange-100 text-sm mt-1">
              {language === "am"
                ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ — ሰኞ - ቅዳሜ፡ 8:30 – 18:30"
                : "Bole Rwanda, Near Edna Mall Road — Mon-Sat 8:30 AM – 6:30 PM"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+251911223344"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#FF8C00] font-bold text-sm hover:bg-orange-50 transition shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>+251-91-122-3344</span>
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 border border-white/40 text-white font-bold text-sm hover:bg-white/30 transition"
            >
              {language === "am" ? "ያግኙን" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EthiopianMap />
      </section>
    </div>
  );
};
