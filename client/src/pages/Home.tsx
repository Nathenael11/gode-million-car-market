import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Car,
  CheckCircle,
  Clock,
  Phone
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

  // Search hero inputs
  const [searchMake, setSearchMake] = useState("all");
  const [searchBody, setSearchBody] = useState("all");
  const [searchFuel, setSearchFuel] = useState("all");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await apiRequest("/cars");
        if (res.success && res.data) {
          setCars(res.data);
        }
      } catch (err) {
        console.error("Error loading cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchMake !== "all") params.append("make", searchMake);
    if (searchBody !== "all") params.append("bodyType", searchBody);
    if (searchFuel !== "all") params.append("fuelType", searchFuel);
    navigate(`/inventory?${params.toString()}`);
  };

  const featuredCars = cars.filter(c => c.isFeatured).slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      {/* Bright & Welcoming Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-slate-200/80 py-12 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Text & Search Box */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-ping" />
                <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" />
                <span>Bole Rwanda, Addis Ababa, Ethiopia ????</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {language === "am" ? (
                  <>
                    ???? ??? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#EA580C]">???? ???</span>
                  </>
                ) : (
                  <>
                    Find Your Perfect Car <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#EA580C]">In Addis Ababa</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {language === "am"
                  ? "????? ???? ?? ????? ????? 100% ????? ?? ???? ?????? ??????? (EV) ???? ?? ????? ?? ???? ??? ???????"
                  : "Ethiopia's premier car marketplace located in Bole Rwanda. Certified 120-point mechanical inspection, zero-duty EVs, and transparent pricing in ETB."}
              </p>

              {/* Interactive Search Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
                <form onSubmit={handleHeroSearch} className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Make / ????</label>
                    <select
                      value={searchMake}
                      onChange={e => setSearchMake(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
                    >
                      <option value="all">{t.allMakes}</option>
                      <option value="Toyota">Toyota (???)</option>
                      <option value="Hyundai">Hyundai (?????)</option>
                      <option value="Isuzu">Isuzu (???)</option>
                      <option value="Volkswagen">Volkswagen (??????)</option>
                      <option value="Suzuki">Suzuki (???)</option>
                      <option value="Nissan">Nissan (???)</option>
                      <option value="BYD">BYD EV (? ?? ?)</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Body Type / ????</label>
                    <select
                      value={searchBody}
                      onChange={e => setSearchBody(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
                    >
                      <option value="all">{t.allBodyTypes}</option>
                      <option value="SUV">SUV / 4WD</option>
                      <option value="Sedan">Sedan (???)</option>
                      <option value="Pickup">Pickup (????)</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Fuel / ???</label>
                    <select
                      value={searchFuel}
                      onChange={e => setSearchFuel(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
                    >
                      <option value="all">{t.allFuelTypes}</option>
                      <option value="Petrol">Petrol (????)</option>
                      <option value="Diesel">Diesel (???)</option>
                      <option value="Electric">? Electric EV (???? ??)</option>
                    </select>
                  </div>

                  <div className="sm:self-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-extrabold text-xs shadow-md shadow-orange-500/25 hover:brightness-105 transition flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>{t.searchButton}</span>
                    </button>
                  </div>
                </form>

                {/* Quick filter pills */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">Popular:</span>
                  <button
                    onClick={() => navigate("/inventory?fuelType=Electric")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 hover:bg-emerald-100 transition"
                  >
                    ? Zero-Duty EVs
                  </button>
                  <button
                    onClick={() => navigate("/inventory?make=Toyota")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                  >
                    Toyota Prado &amp; Corolla
                  </button>
                  <button
                    onClick={() => navigate("/inventory?bodyType=SUV")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                  >
                    4x4 SUVs
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Feature Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1000&q=80"
                  alt="Gode and Million Showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating highlight card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase">
                        Featured in Showroom
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-1">2023 Toyota Prado TX-L</h4>
                      <p className="text-xs text-orange-600 font-black">13.5M ETB • Duty Paid</p>
                    </div>
                    <Link
                      to="/car/car_01"
                      className="px-3.5 py-2 rounded-xl bg-[#FF8C00] text-white font-bold text-xs hover:brightness-105 transition"
                    >
                      View Car
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-orange-50 text-[#FF8C00] border border-orange-100 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {language === "am" ? "????? ????" : "120-Point Inspection"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === "am" ? "????? ???? ?? ???? ????? ???????" : "Verified chassis integrity, engine condition, and genuine ownership papers."}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {language === "am" ? "???? ?? ??" : "Zero-Duty EV Hub"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === "am" ? "?????? ??????? ??? ??? ?????" : "Zero customs tax savings on Volkswagen ID.4 CROZZ & BYD electric vehicles."}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {language === "am" ? "???? ??? ???" : "Auto Loan Financing"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === "am" ? "?????? ??? ??? ?? ???? ??? ???" : "Up to 70% vehicle financing with flexible 5-year repayment through CBE & Awash."}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {language === "am" ? "?? ???? ????" : "Showroom Test Drives"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === "am" ? "???? ??? ????? ???? ?? ???? ????" : "Walk in or schedule an on-site test drive 6 days a week in Bole Rwanda."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showroom Inventory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "am" ? "????? ????" : "Hand-Picked Inventory"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === "am" ? "????? ???? ?????" : "Featured Showroom Vehicles"}
            </h2>
          </div>

          <Link
            to="/inventory"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 text-[#FF8C00] font-bold text-xs border border-orange-200 hover:bg-orange-100 transition"
          >
            <span>{language === "am" ? "???? ???? ?????" : "Explore All Inventory"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <CarGrid cars={featuredCars} loading={loading} />
      </section>

      {/* Showroom Location & Contact Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === "am" ? "?? ????" : "Bole Rwanda Location"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === "am" ? "??????? ????" : "Visit Our Addis Ababa Showroom"}
          </h2>
        </div>

        <EthiopianMap />
      </section>
    </div>
  );
};
