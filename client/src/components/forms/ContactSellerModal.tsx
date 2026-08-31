import React, { useState } from "react";
import { X, Send, Phone, MessageSquare, Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { apiRequest } from "../../utils/api";

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string;
  carTitle: string;
  sellerPhone?: string;
}

export const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  isOpen,
  onClose,
  carId,
  carTitle,
  sellerPhone = "+251-91-122-3344"
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `Hello, I am interested in inspecting the ${carTitle}. Please contact me.`
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
      await apiRequest("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          carId,
          carTitle,
          ...formData
        })
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send inquiry.");
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
              {language === "am" ? "ጥያቄዎ በተሳካ ሁኔታ ተልኳል!" : "Message Sent Successfully!"}
            </h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              {language === "am"
                ? "የጎዴ እና ሚሊየን የሽያጭ አማካሪ በቅርብ ጊዜ በስልክዎ ይደውልልዎታል።"
                : "A Gode & Million representative will contact you shortly regarding this vehicle."}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-[#FF8C00]/10 text-[#FF8C00]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {language === "am" ? "ሻጩን ያነጋግሩ" : "Contact Seller / Showroom"}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-1">{carTitle}</p>
              </div>
            </div>

            {/* Direct call pill */}
            <div className="flex items-center justify-between p-3 mb-4 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Phone className="w-4 h-4 text-[#FF8C00]" />
                <span>{language === "am" ? "ቀጥታ ጥሪ:" : "Direct Call:"}</span>
              </div>
              <a
                href={`tel:${sellerPhone.replace(/[\s-]/g, "")}`}
                className="font-mono text-xs font-bold text-[#FF8C00] hover:underline"
              >
                {sellerPhone}
              </a>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">{t.name} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

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
                <label className="font-semibold text-gray-300 block mb-1">{t.message} *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 transition disabled:opacity-50"
              >
                {submitting ? "Sending..." : t.sendInquiry}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
