import React, { useState, useEffect } from "react";
import { Handshake, Phone, ShieldCheck } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <Handshake className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {language === "am" ? "???? ??? ??? ????" : "Local Ethiopian Partners & Banking Services"}
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          {language === "am"
            ? "???? ???? ????? ??? (????/???)? ???? ???? ?? ????? ???? ??????"
            : "Trusted network of Ethiopian banks, insurance providers, inspection centers, and digital payment platforms."}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">Loading partners...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map(p => {
            const name = language === "am" && p.nameAm ? p.nameAm : p.name;
            const category = language === "am" && p.categoryAm ? p.categoryAm : p.category;
            const desc = language === "am" && p.descriptionAm ? p.descriptionAm : p.description;

            return (
              <div
                key={p.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-orange-400/80 transition"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={p.logo}
                    alt={name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                      {category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span className="font-mono font-bold text-slate-900">{p.contact}</span>
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
