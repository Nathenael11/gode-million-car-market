import React, { useState } from "react";
import { Calculator, Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { formatETB } from "../utils/formatters";
import { apiRequest } from "../utils/api";

export const PriceEstimator: React.FC = () => {
  const { t, language } = useLanguage();

  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("Corolla");
  const [year, setYear] = useState(2020);
  const [condition, setCondition] = useState("Slightly Used (Ethiopia)");
  const [fuelType, setFuelType] = useState("Petrol");
  const [customsStatus, setCustomsStatus] = useState("Duty Paid");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest("/estimator", {
        method: "POST",
        body: JSON.stringify({ make, model, year, condition, fuelType, customsStatus })
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {language === "am" ? "?????? ???? ?? ???" : "Ethiopian Car Market Price Estimator"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {language === "am"
            ? "???? ??? ???? ???? ???? ??? ???? ??? ?? ????? ???? ???? ???? ????? ???"
            : "Get accurate, real-time market valuations in Ethiopian Birr (ETB) based on Addis Ababa demand, customs duty, and condition."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <form
          onSubmit={handleEstimate}
          className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-slate-800"
        >
          <h3 className="font-black text-base text-slate-900 border-b border-slate-100 pb-3">
            Vehicle Details
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Make / ????</label>
              <select
                value={make}
                onChange={e => setMake(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Toyota">Toyota (???)</option>
                <option value="Hyundai">Hyundai (?????)</option>
                <option value="Isuzu">Isuzu (???)</option>
                <option value="Volkswagen">Volkswagen (??????)</option>
                <option value="Suzuki">Suzuki (???)</option>
                <option value="Nissan">Nissan (???)</option>
                <option value="BYD">BYD EV (? ?? ?)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Model / ???</label>
              <input
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="e.g. Prado, ID.4..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Year / ???? ???</label>
              <input
                type="number"
                min={2000}
                max={2026}
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Fuel / ???</label>
              <select
                value={fuelType}
                onChange={e => setFuelType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Petrol">Petrol (????)</option>
                <option value="Diesel">Diesel (???)</option>
                <option value="Electric">Electric EV (??????)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Condition</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Brand New">Brand New (?? ?.?)</option>
                <option value="Slightly Used (Ethiopia)">Slightly Used</option>
                <option value="Used (Showroom Grade)">Used (Good Condition)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Customs Status</label>
              <select
                value={customsStatus}
                onChange={e => setCustomsStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Duty Paid">Duty Paid (??? ?????)</option>
                <option value="Duty Free">Duty Free Eligible (??? ??)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:brightness-105 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Calculating Valuation..." : "Calculate Fair Market Value"}
          </button>
        </form>

        {/* Results Card */}
        <div className="md:col-span-5 space-y-4">
          {result ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Estimated Market Value</span>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">Estimated Fair Price</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatETB(result.estimatedPriceETB)}
                </p>
                <p className="text-xs text-orange-600 font-bold mt-1">
                  Range: {formatETB(result.priceRange?.low)} – {formatETB(result.priceRange?.high)}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <p className="flex justify-between">
                  <span className="text-slate-500">Market Demand:</span>
                  <span className="font-bold text-slate-900">{result.marketDemand}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-500">Addis Liquidity:</span>
                  <span className="font-bold text-slate-900">{result.liquidityRate}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF8C00] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Real-Time Valuation Engine</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fill in the vehicle specifications to see accurate estimated values based on Addis Ababa market trends.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
