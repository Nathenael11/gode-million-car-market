import React from "react";
import { MapPin, Navigation, Phone, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const EthiopianMap: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Info panel */}
        <div className="p-6 lg:p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/15 border border-[#FF8C00]/30 text-[#FF8C00] text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === "am" ? "የሾውሩም መገኛ" : "Showroom Location"}</span>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
              {language === "am" ? "ጎዴ እና ሚሊየን የመኪና ማዕከል" : "Gode & Million Showroom Hub"}
            </h3>
            
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {language === "am"
                ? "በአዲስ አበባ ቦሌ ሩዋንዳ፣ ከኤድና ሞል መንገድ አቅራቢያ የሚገኝ ዘመናዊ የሙከራ እና የሽያጭ ማዕከል"
                : "Located in the vibrant heart of Bole Rwanda, Addis Ababa. Visit us for on-site test drives, technical inspections, and instant transfer consultations."}
            </p>

            <div className="space-y-3.5 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-[#FF8C00]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Bole Rwanda (Near Rwanda Embassy / Edna Road), Addis Ababa</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-[#FF8C00]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+251-91-122-3344 / +251-91-234-5678</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-[#FF8C00]">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Mon - Sat: 8:30 AM - 6:30 PM EAT</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Free On-Site Parking & Secure Test Track</span>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Bole+Rwanda+Addis+Ababa+Ethiopia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 transition"
          >
            <Navigation className="w-4 h-4" />
            <span>{language === "am" ? "በጎግል ካርታ አቅጣጫ አሳይ" : "Get Google Maps Directions"}</span>
          </a>
        </div>

        {/* Embedded Interactive Map Frame */}
        <div className="lg:col-span-7 h-72 lg:h-auto min-h-[320px] relative bg-gray-950">
          <iframe
            title="Gode and Million Car Market Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.673809633842!2d38.7758364!3d8.9902641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f7b60889%3A0x67dbad9b87eb8f16!2sBole%20Rwanda%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
            className="w-full h-full border-0 filter grayscale-[20%] contrast-[110%]"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating showroom badge on map */}
          <div className="absolute top-4 left-4 p-3 bg-[#111827]/90 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-ping"></span>
              <span>Gode &amp; Million Center 🇪🇹</span>
            </div>
            <div className="text-gray-400 mt-0.5">📍 Bole Rwanda, Addis Ababa</div>
          </div>
        </div>
      </div>
    </div>
  );
};
