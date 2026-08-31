import React, { useState, useEffect } from "react";
import { Handshake, Phone, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";

export const Partners: React.FC = () => {
  const { language } = useLanguage();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await apiRequest("/partners");
        if (res.success && res.data) {
          setPartners(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] mb-3">
          <Handshake className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {language === "am" ? "የሀገር ውስጥ አጋር ተቋማት" : "Local Ethiopian Partners & Services"}
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1">
          {language === "am"
            ? "የባንክ ብድር፣ የሞባይል ክፍያ (ቴሌብር/ሲቢኢ)፣ የመድን ዋስትና እና የቴክኒክ ምርመራ አጋሮቻችን"
            : "Trusted network of Ethiopian banks, insurance providers, inspection centers, and repair workshops."}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-gray-400">Loading partners...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map(p => {
            const name = language === "am" && p.nameAm ? p.nameAm : p.name;
            const category = language === "am" && p.categoryAm ? p.categoryAm : p.category;
            const desc = language === "am" && p.descriptionAm ? p.descriptionAm : p.description;

            return (
              <div
                key={p.id}
                className="p-6 rounded-3xl bg-[#111827] border border-gray-800 space-y-4 hover:border-[#FF8C00]/40 transition"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={p.logo}
                    alt={name}
                    className="w-16 h-16 rounded-2xl object-cover border border-gray-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FF8C00] tracking-wider">
                      {category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span className="font-mono text-gray-300">{p.contact}</span>
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Partner</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
