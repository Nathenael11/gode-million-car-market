import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";
import { PhotoUploader } from "../components/admin/PhotoUploader";

export const SellCar: React.FC = () => {
  const { language } = useLanguage();
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
  });

  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, val: any) => setFormData(p => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrls.length === 0) {
      setError("Please add at least one photo of the vehicle.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        images: photoUrls.map(u => u.startsWith("/uploads/") ? window.location.origin + u : u),
        seller: user
          ? { id: user.id, name: user.name, nameAm: user.nameAm, phone: user.phone, location: user.subCity || "Addis Ababa" }
          : { name: "Showroom Seller", phone: "+251-91-122-3344" }
      };

      const res = await apiRequest("/cars", { method: "POST", body: JSON.stringify(payload) });
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
        <h1 className="text-3xl font-black text-gray-900">
          {language === "am" ? "መኪናዎን ይሽጡ" : "Sell Your Car"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          {language === "am"
            ? "ዝርዝሩን ሞልተው ፎቶ ያስገቡ — ሾውሩማችን ለሺዎች ደንበኞች ያስተዋውቃል"
            : "Fill in the details and upload photos — we'll show your car to thousands of buyers across Addis Ababa"}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm mb-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">Listing published! Redirecting to car page...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Photo Upload — First and most important */}
          <PhotoUploader onPhotosChange={setPhotoUrls} />

          <div className="border-t border-gray-100 pt-7">
            <p className="text-sm font-bold text-gray-900 mb-4">Vehicle Details</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Title (English) *</label>
                <input type="text" required value={formData.title}
                  onChange={e => update("title", e.target.value)}
                  placeholder="e.g. 2022 Toyota RAV4 Limited"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Title Amharic (አማርኛ)</label>
                <input type="text" value={formData.titleAm}
                  onChange={e => update("titleAm", e.target.value)}
                  placeholder="ምሳሌ፡ 2022 ቶዮታ ራቭ4 ሊሚትድ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Make</label>
                <select value={formData.make} onChange={e => update("make", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Isuzu">Isuzu</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="BYD">BYD EV</option>
                  <option value="Nissan">Nissan</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Model *</label>
                <input type="text" required value={formData.model}
                  onChange={e => update("model", e.target.value)}
                  placeholder="Corolla, Prado..."
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Year</label>
                <input type="number" min={1995} max={2026} value={formData.year}
                  onChange={e => update("year", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Price (ETB) *</label>
                <input type="number" required min={100000} step={50000} value={formData.price}
                  onChange={e => update("price", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Fuel Type</label>
                <select value={formData.fuelType} onChange={e => update("fuelType", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                  <option value="Petrol">Petrol (ቤንዚን)</option>
                  <option value="Diesel">Diesel (ናፍጣ)</option>
                  <option value="Electric">Electric EV</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Transmission</label>
                <select value={formData.transmission} onChange={e => update("transmission", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Mileage (km)</label>
                <input type="number" value={formData.mileage}
                  onChange={e => update("mileage", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Plate Code</label>
                <input type="text" value={formData.plateCode}
                  onChange={e => update("plateCode", e.target.value)}
                  placeholder="Code 2 - B..."
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
            </div>

            <div className="mt-4 text-xs">
              <label className="font-bold text-gray-700 block mb-1">Description (English)</label>
              <textarea rows={3} value={formData.description}
                onChange={e => update("description", e.target.value)}
                placeholder="Describe the car condition, history, and any extras..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
            </div>

            <div className="mt-3 text-xs">
              <label className="font-bold text-gray-700 block mb-1">Description Amharic (አማርኛ)</label>
              <textarea rows={2} value={formData.descriptionAm}
                onChange={e => update("descriptionAm", e.target.value)}
                placeholder="ስለ መኪናው ሁኔታ እና ታሪክ ያስረዱ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-lg shadow-orange-200 transition disabled:opacity-50">
            {loading ? "Publishing..." : (language === "am" ? "መኪናውን ለሽያጭ አቅርብ" : "Publish Listing")}
          </button>
        </form>
      </div>
    </div>
  );
};
