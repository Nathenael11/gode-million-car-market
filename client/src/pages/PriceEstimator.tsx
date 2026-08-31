import React, { useState } from "react";
import { Calculator, Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";
import { formatETB } from "../utils/formatters";

export const PriceEstimator: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    make: "Toyota",
    model: "Corolla",
    year: "2020",
    condition: "Slightly Used",
    fuelType: "Petrol",
    mileage: "35000"
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest("/estimator", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      if (res.success && res.data) {
        setResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] mb-3">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t.estimatorTitle}
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1">
          {t.estimatorSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-2xl">
          <form onSubmit={handleEstimate} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-gray-300 block mb-1">Make / Brand</label>
              <select
                value={formData.make}
                onChange={e => setFormData({ ...formData, make: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Toyota">Toyota (ቶዮታ)</option>
                <option value="Hyundai">Hyundai (ሃዩንዳይ)</option>
                <option value="Isuzu">Isuzu (ኢሱዙ)</option>
                <option value="Volkswagen">Volkswagen (ቮልስዋገን)</option>
                <option value="Suzuki">Suzuki (ሱዙኪ)</option>
                <option value="Nissan">Nissan (ኒሳን)</option>
                <option value="BYD">BYD EV (ቢ ዋይ ዲ)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1">Model Name</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={e => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. Prado, Accent, ID.4, Dzire"
                className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">Year</label>
                <input
                  type="number"
                  min="2000"
                  max="2026"
                  value={formData.year}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Mileage (km)</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={e => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="e.g. 40000"
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">Condition</label>
                <select
                  value={formData.condition}
                  onChange={e => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="Brand New">Brand New (ዜሮ ኪ.ሜ)</option>
                  <option value="Slightly Used">Slightly Used (ጥሩ ይዞታ)</option>
                  <option value="Fair">Fair (ተነድቶ የቆየ)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Fuel Type</label>
                <select
                  value={formData.fuelType}
                  onChange={e => setFormData({ ...formData, fuelType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">⚡ Electric (EV Duty Free)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-xs shadow-lg shadow-orange-500/20 hover:brightness-110 transition disabled:opacity-50"
            >
              {loading ? "Calculating Valuation..." : "Calculate Market Value (ETB)"}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="md:col-span-6 space-y-4">
          {result ? (
            <div className="p-6 rounded-3xl bg-[#111827] border border-[#FF8C00]/40 shadow-2xl space-y-4">
              <div className="text-center pb-4 border-b border-gray-800">
                <span className="text-xs text-gray-400 block mb-1">{t.estimatedValue}</span>
                <p className="text-3xl font-black text-[#FF8C00]">
                  {formatETB(result.estimatedPriceETB)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Range: {formatETB(result.minEstimatedPriceETB)} - {formatETB(result.maxEstimatedPriceETB)}
                </p>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-900">
                  <span className="text-gray-400">Market Demand:</span>
                  <span className="font-semibold text-emerald-400">{result.marketDemand}</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-900">
                  <span className="text-gray-400">Customs Status:</span>
                  <span className="font-semibold text-white">{result.recommendedCustomsNote}</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-900">
                  <span className="text-gray-400">Benchmark Hub:</span>
                  <span className="font-semibold text-[#FF8C00]">{result.locationBenchmark}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#111827] border border-gray-800 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#FF8C00] mx-auto opacity-60" />
              <h3 className="text-sm font-bold text-white">Instant Valuation Ready</h3>
              <p className="text-xs text-gray-400">Fill in the vehicle specifications to see accurate market valuations in Addis Ababa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
