import React from "react";
import { Car, Award, ShieldCheck, Users, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const About: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {language === "am" ? "?? ?? ?? ???? ???? ???" : "About Gode and Million Car Market"}
        </h1>
        <p className="text-xs font-bold text-orange-600">?? Bole Rwanda, Addis Ababa, Ethiopia ????</p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-sm leading-relaxed text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">
          {language === "am" ? "??? ??? ?? ????" : "Our Heritage & Mission"}
        </h2>
        <p>
          Founded in the prime commercial automotive district of Bole Rwanda, Addis Ababa, <strong>Gode &amp; Million Car Market</strong> (?? ?? ???? ???? ???) has established itself as one of Ethiopia's premier and most trusted car dealerships.
        </p>
        <p>
          We bridge individual car buyers, sellers, and diaspora returnees with 100% transparent pricing in Ethiopian Birr (ETB), strict 120-point mechanical inspection verification, and expert advice on zero-customs duty EV incentives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-3xl font-black text-orange-600">10+ Years</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Automotive Experience</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-3xl font-black text-orange-600">2,500+</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Cars Sold in Addis</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-3xl font-black text-orange-600">99%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};
