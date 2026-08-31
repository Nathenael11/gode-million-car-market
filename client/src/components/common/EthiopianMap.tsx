import React from "react";
import { MapPin, Navigation, Phone, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const EthiopianMap: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Info panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === "am" ? "????? ????" : "Showroom Location"}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {language === "am" ? "?? ?? ???? ???? ???" : "Gode & Million Car Market"}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "am"
                ? "???? ??? ?? ???? ????? ???? ?? ????? ?????? ???? ????? ????? ?? ???? ?? (Test Drive) ????? ??????"
                : "Located in the prime automotive district of Bole Rwanda, Addis Ababa. Visit us for walk-in inspections, mechanical verifications, and instant test drives."}
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span className="font-semibold">Bole Rwanda, Next to Edna Mall Road, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span className="font-mono font-bold text-slate-900">+251-91-122-3344 / +251-91-234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span>Monday – Saturday: 8:30 AM – 6:30 PM (EAT)</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free On-Site Mechanical Inspection Available</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <a
              href="https://maps.google.com/?q=Bole+Rwanda+Addis+Ababa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:brightness-105 transition flex items-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
            <a
              href="tel:+251911223344"
              className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-200 transition"
            >
              Call Showroom
            </a>
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="lg:col-span-7 h-72 lg:h-auto min-h-[300px] bg-slate-100 relative">
          <iframe
            title="Gode & Million Car Market Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.673891461943!2d38.77723467472855!3d8.995054178553255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85042ab672eb%3A0x6a0a03beadfa7dc0!2sBole%20Rwanda%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
