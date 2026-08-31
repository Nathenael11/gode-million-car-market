import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail, ShieldCheck, Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { apiRequest } from "../../utils/api";
import confetti from "canvas-confetti";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string;
  carTitle: string;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  carId,
  carTitle
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "10:00 AM",
    drivingLicenseNumber: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await apiRequest("/test-drives", {
        method: "POST",
        body: JSON.stringify({
          carId,
          carTitle,
          ...formData
        })
      });

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 bg-[#111827] border border-gray-800 rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {language === "am" ? "የሙከራ ጉዞ ቀጠሮዎ ተመዝግቧል!" : "Test Drive Booked Successfully!"}
            </h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              {language === "am"
                ? `ለ ${carTitle} ያደረጉት ቀጠሮ ተይዟል። እባክዎን በቀጠሮው ቀን መንጃ ፈቃድዎን ይዘው ቦሌ ሩዋንዳ ሾውሩማችን ይምጡ።`
                : `Your appointment for ${carTitle} is reserved. Our Bole Rwanda team will call you to confirm your arrival.`}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-[#FF8C00]/10 text-[#FF8C00]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {language === "am" ? "የሙከራ ጉዞ ቀጠሮ ይያዙ" : "Book Showroom Test Drive"}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-1">{carTitle}</p>
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">{t.name} *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Abebe Bekele"
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">{t.phone} *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251-9X-XXX-XXXX"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">{t.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">{t.preferredDate} *</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">{t.preferredTime}</label>
                  <select
                    value={formData.preferredTime}
                    onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  >
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">{t.drivingLicense}</label>
                <input
                  type="text"
                  value={formData.drivingLicenseNumber}
                  onChange={e => setFormData({ ...formData, drivingLicenseNumber: e.target.value })}
                  placeholder="Ethiopian License No. (or present at showroom)"
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 transition disabled:opacity-50"
              >
                {submitting ? "Booking..." : (language === "am" ? "ቀጠሮውን አረጋግጥ" : "Confirm Test Drive Booking")}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
