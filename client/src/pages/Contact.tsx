import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { EthiopianMap } from "../components/common/EthiopianMap";

export const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {language === "am" ? "ያግኙን" : "Get in Touch"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2">
          {language === "am"
            ? "ለማንኛውም ጥያቄ ወይም ሾውሩማችንን ለመጎብኘት ያነጋግሩን"
            : "Questions about a car, test drive bookings, or just want to visit the showroom? We're here to help."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === "am" ? "መልእክትዎ ደርሷል!" : "Message received!"}
              </h3>
              <p className="text-xs text-gray-500">
                {language === "am" ? "ቡድናችን በቅርቡ ያነጋግርዎታል።" : "Our team will get back to you shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-black text-sm text-gray-900 mb-4">
                {language === "am" ? "መልእክት ይላኩ" : "Send a Message"}
              </h3>
              {[
                { key: "name", label: language === "am" ? "ሙሉ ስም" : "Your Name", type: "text", placeholder: "Abebe Bekele" },
                { key: "phone", label: language === "am" ? "ስልክ ቁጥር (+251)" : "Phone (+251)", type: "tel", placeholder: "+251-91-234-5678" },
                { key: "email", label: language === "am" ? "ኢሜይል (አማራጭ)" : "Email (optional)", type: "email", placeholder: "abebe@email.com" },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-bold text-gray-700 block mb-1">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
              ))}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "am" ? "መልእክት" : "Message"}
                </label>
                <textarea rows={4} required value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder={language === "am" ? "ስለ ምን ያናገርዎ?" : "How can we help you today?"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-md shadow-orange-200 transition">
                {language === "am" ? "ይላኩ" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-black text-sm text-gray-900">
            {language === "am" ? "ቀጥታ ያነጋግሩን" : "Direct Contacts"}
          </h3>
          <div className="space-y-4 text-xs text-gray-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{language === "am" ? "አድራሻ" : "Address"}</p>
                <p className="mt-0.5">{language === "am" ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ፣ አዲስ አበባ" : "Bole Rwanda, Near Edna Mall Road, Addis Ababa, Ethiopia"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{language === "am" ? "ስልክ" : "Phone"}</p>
                <a href="tel:+251911223344" className="block font-mono hover:text-[#FF8C00] transition mt-0.5">+251-91-122-3344</a>
                <a href="tel:+251912345678" className="block font-mono hover:text-[#FF8C00] transition">+251-91-234-5678</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <a href="mailto:info@godemillion.et" className="hover:text-[#FF8C00] transition mt-0.5 block">info@godemillion.et</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{language === "am" ? "የስራ ሰዓት" : "Opening Hours"}</p>
                <p className="mt-0.5">{language === "am" ? "ሰ.ሰ — ቅዳሜ: ጠ.ሰ 8:30 — ከ.ሰ 6:30" : "Monday — Saturday: 8:30 AM – 6:30 PM"}</p>
                <p className="text-gray-400">{language === "am" ? "እሁድ: በቀጠሮ ብቻ" : "Sunday by appointment"}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
            <a href="https://t.me/godemillion" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold hover:bg-blue-100 transition">
              Telegram
            </a>
            <a href="https://wa.me/251911223344" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 transition">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <EthiopianMap />
    </div>
  );
};
