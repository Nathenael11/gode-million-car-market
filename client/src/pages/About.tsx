import React from "react";
import { Car, Award, ShieldCheck, Users, MapPin, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const About: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {language === "am" ? "ስለ ጎዴ እና ሚሊየን" : "About Gode & Million Car Market"}
        </h1>
        <p className="text-xs font-bold text-[#FF8C00]">
          {language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ፣ ኢትዮጵያ" : "Bole Rwanda, Addis Ababa, Ethiopia"}
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5 text-sm leading-relaxed text-gray-600">
        <h2 className="text-xl font-bold text-gray-900">
          {language === "am" ? "ታሪካችን" : "Our Story"}
        </h2>
        <p>
          {language === "am"
            ? "ጎዴ እና ሚሊየን የመኪና መሸጫ በቦሌ ሩዋንዳ፣ አዲስ አበባ ለዓመታት ያገለገለ፣ ኢትዮጵያ ውስጥ በጣም የሚታመን የመኪና ሸያጭ ድርጅት ነው። የእያንዳንዱን ደንበኛ ፍላጎት ለማሟላት፣ ሙሉ ቴክኒካዊ ምርመራ ያለፈ፣ ዋጋው ግልጽ የሆነ ተሽከርካሪ ማቅረብ የዕለት ሥራችን ነው።"
            : "Founded in the heart of Bole Rwanda, Addis Ababa, Gode & Million Car Market has grown into one of Ethiopia's most trusted automotive dealerships. Every car we sell goes through a rigorous 120-point mechanical check and is priced transparently in Ethiopian Birr — no hidden charges."}
        </p>
        <p>
          {language === "am"
            ? "ከቮልስዋገን ID.4 EV ቀረጥ ነፃ መኪናዎች ጀምሮ እስከ ቶዮታ ፕራዶ፣ ሃዩንዳይ ቱሳን እና ኢሱዙ D-Max ፒክ-አፕ ድረስ — ሁሉም ዓይነት ፍላጎቶችን ያሟላ ሰፊ ዝርዝር አለን። የቴሌብር፣ ሲቢኢ ብር፣ አዋሽ ባንክ እና ዳሽን ባንክ ብድር ጭምር እናስተናግዳለን።"
            : "From Volkswagen ID.4 zero-duty EVs to Toyota Prado 4WDs, Hyundai Tucson sedans, and Isuzu D-Max pickups — our Bole Rwanda showroom has something for every buyer. We also arrange bank financing through CBE, Awash Bank, and Dashen Bank."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-center">
          {[
            { val: "10+", label: language === "am" ? "ዓመት ልምድ" : "Years of Experience" },
            { val: "2,500+", label: language === "am" ? "የተሸጡ መኪናዎች" : "Cars Sold in Addis" },
            { val: "99%", label: language === "am" ? "ደንበኛ እርካታ" : "Customer Satisfaction" },
          ].map(s => (
            <div key={s.val} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <p className="text-3xl font-black text-[#FF8C00]">{s.val}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { icon: ShieldCheck, title: language === "am" ? "120-ነጥብ ምርመራ" : "120-Point Inspection", desc: language === "am" ? "እያንዳንዱ ተሽከርካሪ ሙሉ ቴክኒካዊ ምርመራ ያካሂዳል" : "Every vehicle undergoes a comprehensive mechanical and safety check." },
          { icon: Award, title: language === "am" ? "የምስክር ወረቀት ያለው ሁኔታ" : "Certified Condition Reports", desc: language === "am" ? "ሙሉ የቴክኒክ ሪፖርት ከጀርመን ኦቶ ምርመራ ጣቢያ" : "Full inspection reports from German Auto inspection centre in Addis." },
          { icon: Users, title: language === "am" ? "የባንክ ብድር ድጋፍ" : "Bank Loan Assistance", desc: language === "am" ? "ቀጥ ያለ ትስስር ከሲቢኢ፣ አዋሽ እና ዳሽን ባንክ" : "Direct arrangement with CBE, Awash, and Dashen Bank auto loans." },
          { icon: Star, title: language === "am" ? "ቀረጥ ነፃ EV ምክር" : "EV Zero-Duty Advisory", desc: language === "am" ? "ቮልስዋገን ID.4 እና BYD Song Plus ቀረጥ ነፃ ምርጫዎች" : "Guidance on Volkswagen ID.4 and BYD EV zero-excise incentives." },
        ].map(f => (
          <div key={f.title} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex gap-4">
            <div className="p-3 rounded-xl bg-orange-50 text-[#FF8C00] shrink-0 h-fit">
              <f.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
