import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";

export const SellCar: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    titleAm: "",
    make: "Toyota",
    model: "",
    year: 2022,
    price: 3500000,
    priceNegotiable: true,
    condition: "Slightly Used (Ethiopia)",
    conditionAm: "??? ????",
    bodyType: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 25000,
    engineCapacity: "2.0L",
    color: "White",
    location: "Bole Rwanda, Addis Ababa",
    customsStatus: "Duty Paid",
    plateCode: "Code 2",
    description: "",
    descriptionAm: "",
    imageUrls: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=70"
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const images = formData.imageUrls
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        images: images.length > 0 ? images : [formData.imageUrls],
        seller: user
          ? {
              id: user.id,
              name: user.name,
              nameAm: user.nameAm,
              phone: user.phone,
              location: user.subCity || "Addis Ababa"
            }
          : {
              name: "Showroom Seller",
              phone: "+251-91-122-3344"
            }
      };

      const res = await apiRequest("/cars", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => navigate(`/car/${res.data.id}`), 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit vehicle listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <PlusCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {language === "am" ? "????? ??? ?? ???? ???" : "Sell Your Car at Gode & Million"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {language === "am"
            ? "???? ?????? ???? ????? ??? ???? ?????? ???? ???? ?????????"
            : "Reach thousands of vetted car buyers across Addis Ababa and the Ethiopian diaspora."}
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md">
        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">Vehicle listing submitted successfully! Redirecting...</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Listing Title (English) *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 2022 Toyota RAV4 Limited"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Listing Title (Amharic - ????)</label>
              <input
                type="text"
                value={formData.titleAm}
                onChange={e => setFormData({ ...formData, titleAm: e.target.value })}
                placeholder="???? 2022 ??? ??4 ????"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Make *</label>
              <select
                value={formData.make}
                onChange={e => setFormData({ ...formData, make: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Toyota">Toyota</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Isuzu">Isuzu</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Nissan">Nissan</option>
                <option value="BYD">BYD EV</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Model *</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={e => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. Corolla"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Year *</label>
              <input
                type="number"
                min={1995}
                max={2026}
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Price (ETB) *</label>
              <input
                type="number"
                required
                min={100000}
                step={50000}
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Fuel Type</label>
              <select
                value={formData.fuelType}
                onChange={e => setFormData({ ...formData, fuelType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Petrol">Petrol (????)</option>
                <option value="Diesel">Diesel (???)</option>
                <option value="Electric">Electric EV (??????)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Transmission</label>
              <select
                value={formData.transmission}
                onChange={e => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value="Automatic">Automatic (?????)</option>
                <option value="Manual">Manual (????)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mileage (km)</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={e => setFormData({ ...formData, mileage: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Plate Code</label>
              <input
                type="text"
                value={formData.plateCode}
                onChange={e => setFormData({ ...formData, plateCode: e.target.value })}
                placeholder="Code 2 - B..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Image URLs (comma-separated)</label>
            <input
              type="text"
              value={formData.imageUrls}
              onChange={e => setFormData({ ...formData, imageUrls: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:brightness-105 transition disabled:opacity-50"
          >
            {loading ? "Publishing Vehicle..." : "Publish Car Listing to Showroom"}
          </button>
        </form>
      </div>
    </div>
  );
};
