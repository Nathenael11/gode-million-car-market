import React, { useState, useEffect } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";

export const Partners: React.FC = () => {
  const { language } = useLanguage();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/partners")
      .then(r => { if (r.success && r.data) setPartners(r.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {language === "am" ? "አጋር ተቋማት" : "Our Local Partners"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          {language === "am"
            ? "የባንክ ብድር፣ ቴሌብር/ሲቢኢ ክፍያ፣ የመድን ዋስትና እና የቴክኒክ ምርመራ አጋሮቻችን"
            : "Our trusted network of Ethiopian banks, insurers, inspection centres, and digital payment platforms."}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-gray-400">
          {language === "am" ? "ጥቂት ቆዩ..." : "Loading partners..."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map(p => {
            const name = language === "am" && p.nameAm ? p.nameAm : p.name;
            const cat = language === "am" && p.categoryAm ? p.categoryAm : p.category;
            const desc = language === "am" && p.descriptionAm ? p.descriptionAm : p.description;
            return (
              <div key={p.id} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-orange-200 transition space-y-4">
                <div className="flex items-start gap-4">
                  <img src={p.logo} alt={name}
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-100 shrink-0"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FF8C00] tracking-wider">{cat}</span>
                    <h3 className="text-sm font-bold text-gray-900 mt-0.5">{name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span className="font-mono font-bold">{p.contact}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700 font-bold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{language === "am" ? "ኦፊሴላዊ አጋር" : "Official Partner"}</span>
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
