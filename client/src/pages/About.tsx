import React from "react";
import { Car, Award, ShieldCheck, Users, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const About: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00]">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {language === "am" ? "ስለ ጎዴ እና ሚሊየን የመኪና መሸጫ" : "About Gode and Million Car Market"}
        </h1>
        <p className="text-xs text-[#FF8C00] font-semibold">📍 Bole Rwanda, Addis Ababa, Ethiopia 🇪🇹</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#111827] border border-gray-800 space-y-6 text-sm leading-relaxed text-gray-300">
        <h2 className="text-xl font-bold text-white">
          {language === "am" ? "የእኛ ታሪክ እና ተልዕኮ" : "Our Heritage & Mission"}
        </h2>
        <p>
          Founded in the prime commercial zone of Bole Rwanda, Addis Ababa, <strong>Gode &amp; Million Car Market</strong> (ጎዴ እና ሚሊየን የመኪና መሸጫ) has established itself as one of Ethiopia's most trusted automotive marketplaces.
        </p>
        <p>
          We bridge individual car buyers, sellers, and diaspora returnees with 100% transparent pricing in Ethiopian Birr (ETB), strict 120-point mechanical inspection verification, and expert advice on customs duty regulations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800 text-center">
          <div className="p-4 rounded-2xl bg-gray-900">
            <p className="text-2xl font-black text-[#FF8C00]">10+ Years</p>
            <p className="text-xs text-gray-400 mt-1">Automotive Experience</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900">
            <p className="text-2xl font-black text-[#FF8C00]">2,500+</p>
            <p className="text-xs text-gray-400 mt-1">Cars Sold in Addis</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900">
            <p className="text-2xl font-black text-[#FF8C00]">99%</p>
            <p className="text-xs text-gray-400 mt-1">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};
