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
  Sparkles
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
  const evCars = cars.filter(c => c.fuelType === "Electric").slice(0, 2);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-gray-800">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] scale-105 transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/90 via-[#0B0F17]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/80 border border-[#FF8C00]/40 backdrop-blur-md shadow-lg shadow-orange-500/10">
              <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span className="text-xs font-bold text-white tracking-wide">
                Bole Rwanda, Addis Ababa, Ethiopia 🇪🇹
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {language === "am" ? (
                <>
                  ህልምዎ መኪና <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FED100]">እዚህ አለ</span>
                </>
              ) : (
                <>
                  Your Dream Car <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FED100]">Awaits You</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            <form
              onSubmit={handleHeroSearch}
              className="p-4 sm:p-5 rounded-2xl bg-gray-950/80 border border-gray-800 backdrop-blur-xl shadow-2xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
            >
              <div className="flex-1">
                <select
                  value={searchMake}
                  onChange={e => setSearchMake(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-white focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="all">{t.allMakes}</option>
                  <option value="Toyota">Toyota (ቶዮታ)</option>
                  <option value="Hyundai">Hyundai (ሃዩንዳይ)</option>
                  <option value="Isuzu">Isuzu (ኢሱዙ)</option>
                  <option value="Volkswagen">Volkswagen (ቮልስዋገን)</option>
                  <option value="Suzuki">Suzuki (ሱዙኪ)</option>
                  <option value="Nissan">Nissan (ኒሳን)</option>
                  <option value="BYD">BYD EV (ቢ ዋይ ዲ)</option>
                </select>
              </div>

              <div className="flex-1">
                <select
                  value={searchBody}
                  onChange={e => setSearchBody(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-white focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="all">{t.allBodyTypes}</option>
                  <option value="SUV">SUV / 4WD</option>
                  <option value="Sedan">Sedan (ሴዳን)</option>
                  <option value="Pickup">Pickup / Double Cab</option>
                </select>
              </div>

              <div className="flex-1">
                <select
                  value={searchFuel}
                  onChange={e => setSearchFuel(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-white focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="all">{t.allFuelTypes}</option>
                  <option value="Petrol">Petrol (ቤንዚን)</option>
                  <option value="Diesel">Diesel (ናፍጣ)</option>
                  <option value="Electric">⚡ Electric EV (ከቀረጥ ነፃ)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-extrabold text-xs shadow-lg shadow-orange-500/25 hover:brightness-110 transition flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchButton}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Value Proposition Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#FF8C00]/15 text-[#FF8C00] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                {language === "am" ? "የቴክኒክ ምርመራ" : "120-Point Inspection"}
              </h4>
              <p className="text-xs text-gray-400">
                {language === "am" ? "የሻንሲ፣ የሞተር እና የሊብሬ ማረጋገጫ የተደረገለት" : "Complete mechanical & title (Libre) verification"}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                {language === "am" ? "ከቀረጥ ነፃ ኢቪ" : "EV Duty-Free Hub"}
              </h4>
              <p className="text-xs text-gray-400">
                {language === "am" ? "የመንግስት የኤሌክትሪክ መኪና ቀረጥ ማበረታቻ" : "Zero excise tax incentives on VW & BYD EVs"}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-500/15 text-sky-400 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                {language === "am" ? "የባንክ ብድር አጋር" : "Flexible Auto Loans"}
              </h4>
              <p className="text-xs text-gray-400">
                {language === "am" ? "በኢትዮጵያ ንግድ ባንክ እና በአዋሽ ባንክ በኩል" : "Up to 70% financing with local bank partners"}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/15 text-purple-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                {language === "am" ? "ቦሌ ሩዋንዳ ሾውሩም" : "Prime Showroom"}
              </h4>
              <p className="text-xs text-gray-400">
                {language === "am" ? "በአዲስ አበባ እምብርት የሚገኝ ምቹ የሙከራ ማዕከል" : "Walk-in inspection & test drives 6 days a week"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ethiopian Inventory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "am" ? "ተለይተው የቀረቡ" : "Hand-Picked Inventory"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === "am" ? "የተመረጡ የመኪና ዝርዝሮች" : "Featured Showroom Listings"}
            </h2>
          </div>

          <Link
            to="/inventory"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#FF8C00] hover:underline"
          >
            <span>{language === "am" ? "ሁሉንም መኪኖች ይመልከቱ" : "View All Listings"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <CarGrid cars={featuredCars} loading={loading} />
      </section>

      {/* Showroom Map & Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#FF8C00] uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === "am" ? "ቦሌ ሩዋንዳ" : "Bole Rwanda Location"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === "am" ? "ሾውሩማችንን ይጎብኙ" : "Visit Our Addis Ababa Showroom"}
          </h2>
        </div>

        <EthiopianMap />
      </section>
    </div>
  );
};
