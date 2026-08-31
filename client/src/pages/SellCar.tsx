import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Upload, CheckCircle2, Car, Sparkles, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";
import confetti from "canvas-confetti";

export const SellCar: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    titleAm: "",
    make: "Toyota",
    model: "",
    year: "2022",
    price: "",
    priceNegotiable: true,
    condition: "Slightly Used (Ethiopia)",
    conditionAm: "ጥቂት የተነዳ (የኢትዮጵያ ሰሌዳ)",
    bodyType: "Sedan",
    fuelType: "Petrol",
    fuelTypeAm: "ቤንዚን (Petrol)",
    transmission: "Automatic",
    transmissionAm: "ኦቶማቲክ",
    mileage: "",
    engineCapacity: "1.8L",
    color: "White",
    colorAm: "ነጭ",
    plateCode: "Code 2 - B",
    customsStatus: "Duty Paid (ቀረጥ የተከፈለ)",
    location: "Bole Rwanda, Addis Ababa",
    locationAm: "ቦሌ ሩዋንዳ፣ አዲስ አበባ",
    description: "",
    descriptionAm: "",
    imageUrl: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login?redirect=/sell");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage || 0),
        images: formData.imageUrl ? [formData.imageUrl] : [
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
        ]
      };

      const res = await apiRequest("/cars", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (res.success) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setSuccess(true);
        setTimeout(() => {
          navigate(`/car/${res.data.id}`);
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to publish listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] mb-3">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {language === "am" ? "መኪናዎን በጎዴ እና ሚሊየን ለሽያጭ ያቅርቡ" : "Sell Your Car at Gode & Million"}
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1">
          {language === "am"
            ? "በቀላሉ መኪናዎን በመመዝገብ በአዲስ አበባ እና በመላው ኢትዮጵያ ላሉ ከሺዎች በላይ ገዢዎች በፍጥነት ይድረሱ።"
            : "Reach thousands of trusted Ethiopian buyers in Addis Ababa and diaspora directly."}
        </p>
      </div>

      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {language === "am" ? "መኪናዎ በተሳካ ሁኔታ ተመዝግቧል!" : "Listing Published Successfully!"}
            </h3>
            <p className="text-xs text-gray-400">Redirecting to your car details...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}

            {!user && (
              <div className="p-4 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/30 text-gray-200 flex items-center justify-between">
                <span>Please sign in to publish your vehicle under your profile.</span>
                <button
                  type="button"
                  onClick={() => navigate("/login?redirect=/sell")}
                  className="px-3 py-1.5 rounded-lg bg-[#FF8C00] text-gray-950 font-bold"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Basic Info */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF8C00]" />
                <span>1. {language === "am" ? "የመኪናው አጠቃላይ መረጃ" : "Vehicle Overview"}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Listing Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 2022 Toyota Land Cruiser Prado TX-L"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Listing Title (Amharic - አማርኛ)</label>
                  <input
                    type="text"
                    value={formData.titleAm}
                    onChange={e => setFormData({ ...formData, titleAm: e.target.value })}
                    placeholder="ለምሳሌ፡ 2022 ቶዮታ ላንድ ክሩዘር ፕራዶ"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Make / Brand *</label>
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
                  <label className="font-semibold text-gray-300 block mb-1">Model *</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Prado, Accent, ID.4, D-Max"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Manufacturing Year *</label>
                  <input
                    type="number"
                    required
                    min="1990"
                    max="2026"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Asking Price (ETB - በብር) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 3500000"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-sm font-bold text-white mb-3">
                2. {language === "am" ? "የቴክኒክ እና የቀረጥ ዝርዝር" : "Technical & Customs Specs"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={e => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  >
                    <option value="Petrol">Petrol (ቤንዚን)</option>
                    <option value="Diesel">Diesel (ናፍጣ)</option>
                    <option value="Electric">Electric EV (ኤሌክትሪክ)</option>
                    <option value="Hybrid">Hybrid (ሃይብሪድ)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Transmission</label>
                  <select
                    value={formData.transmission}
                    onChange={e => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  >
                    <option value="Automatic">Automatic (ኦቶማቲክ)</option>
                    <option value="Manual">Manual (ማኑዋል)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={formData.mileage}
                    onChange={e => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="e.g. 35000"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Customs Status</label>
                  <select
                    value={formData.customsStatus}
                    onChange={e => setFormData({ ...formData, customsStatus: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  >
                    <option value="Duty Paid (ቀረጥ የተከፈለ)">Duty Paid (ቀረጥ የተከፈለ)</option>
                    <option value="Duty Free EV Incentive (ከቀረጥ ነፃ)">Duty Free EV Incentive (ከቀረጥ ነፃ)</option>
                    <option value="Tax Free / Diaspora Eligible">Tax Free / Diaspora Eligible</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Plate Code</label>
                  <input
                    type="text"
                    value={formData.plateCode}
                    onChange={e => setFormData({ ...formData, plateCode: e.target.value })}
                    placeholder="e.g. Code 2 - B78XXX"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Image URL (or Photo Link)</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-xl shadow-orange-500/20 hover:brightness-110 transition disabled:opacity-50"
            >
              {submitting ? "Publishing..." : t.submitListing}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
