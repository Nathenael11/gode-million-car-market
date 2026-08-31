import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', p.slice(p.indexOf('client'))); };
const B = path.resolve('.');

// ━━ Home page — human, warm, not AI-sounding ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/pages/Home.tsx'), `import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, MapPin, ShieldCheck, Zap, TrendingUp, ChevronRight, Car, Phone
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
  const [searchBody, setSearchBody] = useState("all");
  const [searchFuel, setSearchFuel] = useState("all");

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
    if (searchBody !== "all") params.append("bodyType", searchBody);
    if (searchFuel !== "all") params.append("fuelType", searchFuel);
    navigate(\`/inventory?\${params.toString()}\`);
  };

  const featuredCars = cars.filter(c => c.isFeatured).slice(0, 6);

  return (
    <div className="space-y-16 pb-20">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#F8FAFC] border-b border-gray-100 py-14 lg:py-24 overflow-hidden">
        {/* Background decor */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#FF8C00]/5 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-orange-100/40 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">

              {/* Location badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-ping" />
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {language === "am"
                    ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ — ኢትዮጵያ"
                    : "Bole Rwanda, Addis Ababa — Ethiopia"}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                {language === "am" ? (
                  <>
                    <span>ህልምዎን </span>
                    <span className="text-[#FF8C00]">መኪና</span>
                    <br />
                    <span>ያግኙ</span>
                  </>
                ) : (
                  <>
                    Find Your Dream
                    <br />
                    <span className="text-[#FF8C00]">Car in Addis</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
                {language === "am"
                  ? "ቀረጥ ነፃ ኤሌክትሪክ መኪናዎች፣ 120-ነጥብ ቴክኒካዊ ምርመራ ያለፉ አዳዲስ እና ያገለገሉ ተሽከርካሪዎች — ሁሉም በብር ዋጋ ግልጽ ሁኔታ። ቦሌ ሩዋንዳ፣ አዲስ አበባ።"
                  : "Fully inspected new & used vehicles with transparent ETB pricing. EV duty-free incentives, bank loan support, and test drives available at our Bole Rwanda showroom."}
              </p>

              {/* Search form */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg p-1.5 flex flex-col sm:flex-row gap-1.5 max-w-2xl"
              >
                <select
                  value={searchMake}
                  onChange={e => setSearchMake(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#FF8C00]"
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
                  value={searchBody}
                  onChange={e => setSearchBody(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="all">{t.allBodyTypes}</option>
                  <option value="SUV">SUV / 4x4</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Hatchback">Hatchback</option>
                </select>

                <select
                  value={searchFuel}
                  onChange={e => setSearchFuel(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="all">{t.allFuelTypes}</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric (EV)</option>
                </select>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm rounded-xl transition shadow-md shadow-orange-200"
                >
                  <Search className="w-4 h-4" />
                  <span className="whitespace-nowrap">{t.searchButton}</span>
                </button>
              </form>

              {/* Quick action links */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: language === "am" ? "ቀረጥ ነፃ EV" : "EV Duty-Free", to: "/inventory?fuelType=Electric", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { label: "Toyota Prado", to: "/inventory?make=Toyota", color: "bg-orange-50 text-orange-700 border-orange-200" },
                  { label: language === "am" ? "ያዲስ መኪናዎች" : "Brand New", to: "/inventory?condition=Brand New", color: "bg-blue-50 text-blue-700 border-blue-200" },
                  { label: language === "am" ? "ፒክ-አፕ" : "Pickup Trucks", to: "/inventory?bodyType=Pickup", color: "bg-slate-50 text-slate-700 border-slate-200" },
                ].map(q => (
                  <Link
                    key={q.label}
                    to={q.to}
                    className={\`px-3.5 py-1.5 rounded-full border text-xs font-bold transition hover:scale-105 \${q.color}\`}
                  >
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[
                { icon: Car, value: "500+", label: language === "am" ? "የተረጋገጡ መኪናዎች" : "Verified Cars", color: "text-[#FF8C00] bg-orange-50" },
                { icon: ShieldCheck, value: "120", label: language === "am" ? "ነጥብ ምርመራ" : "Point Inspection", color: "text-emerald-600 bg-emerald-50" },
                { icon: Zap, value: "0%", label: language === "am" ? "EV ቀረጥ ነፃ" : "EV Duty Tax", color: "text-blue-600 bg-blue-50" },
                { icon: TrendingUp, value: "70%", label: language === "am" ? "ባንክ ብድር" : "Bank Financing", color: "text-violet-600 bg-violet-50" },
              ].map(stat => (
                <div key={stat.label} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-sm transition">
                  <div className={\`w-10 h-10 rounded-xl flex items-center justify-center mb-3 \${stat.color}\`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Cars ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {language === "am" ? "ተለይቶ የቀረቡ መኪናዎች" : "Featured Vehicles"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === "am"
                ? "በሾውሩማችን ታቅፎ የቀረቡ ምርጥ አማራጮች"
                : "Hand-picked selections from our Bole Rwanda showroom"}
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
                ? "ለዓመታት አዲስ አበባን ያገለገልን የቦሌ ሩዋንዳ የመኪና ገበያ ላቆናችን"
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
                desc: language === "am" ? "በኢትዮጵያ ብር ሙሉ ዋጋ ምንም ተደብቆ አለ — ቴሌብር እና ሲቢኢ ብር ተቀባይ" : "Full ETB pricing, no hidden fees — Telebirr & CBE Birr accepted"
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
                ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ — ሰ.ሰ ሰ:30 – 12:30"
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
`);

console.log('Home.tsx written');
