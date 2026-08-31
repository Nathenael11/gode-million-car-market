import React from "react";
import { MapPin, Phone, Clock, Car } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const EthiopianMap: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Info panel */}
        <div className="bg-[#1A1A2E] p-8 space-y-6 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Car className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white font-black">
                {language === "am" ? "ጎዴ እና ሚሊየን" : "Gode & Million Car Market"}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === "am"
                ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ"
                : "Bole Rwanda, Near Edna Mall Road"}
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs">
                  {language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ" : "Bole Rwanda, Addis Ababa"}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {language === "am" ? "ኢትዮጵያ" : "Ethiopia — Lat: 9.0052° N, Lon: 38.7861° E"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-[#FF8C00] shrink-0" />
              <div className="text-xs">
                <a href="tel:+251911223344" className="text-white font-mono hover:text-[#FF8C00] transition block">+251-91-122-3344</a>
                <a href="tel:+251912345678" className="text-white font-mono hover:text-[#FF8C00] transition block">+251-91-234-5678</a>
              </div>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <Clock className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="text-white font-semibold">
                  {language === "am" ? "ሰ.ሰ — ቅዳሜ፡ 8:30 — 18:30" : "Mon — Sat: 8:30 AM – 6:30 PM"}
                </p>
                <p className="text-slate-400">
                  {language === "am" ? "እሁድ፡ በቀጠሮ ብቻ" : "Sunday by appointment only"}
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Bole+Rwanda+Addis+Ababa+Ethiopia"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-2.5 rounded-xl border border-[#FF8C00]/40 bg-[#FF8C00]/10 text-[#FF8C00] font-bold text-xs text-center hover:bg-[#FF8C00] hover:text-white transition"
          >
            {language === "am" ? "Google Maps ላይ ይከፈቱ" : "Open in Google Maps"}
          </a>
        </div>

        {/* Map embed */}
        <div className="lg:col-span-2 h-64 lg:h-auto min-h-[280px] bg-slate-100 relative">
          <iframe
            title="Gode and Million Car Market Location - Bole Rwanda, Addis Ababa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.618894854756!2d38.786!3d9.005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMTguNyJOIDM4wrA0NycxOS42IkU!5e0!3m2!1sen!2set!4v1600000000000!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "280px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
