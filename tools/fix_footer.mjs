import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', path.basename(p)); };
const B = path.resolve('.');

// Fix Footer - remove unavailable lucide icons
W(path.join(B, 'client/src/components/common/Footer.tsx'), `import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Car } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-[#1A1A2E] text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF8C00] flex items-center justify-center shadow-lg shadow-orange-900/30">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-sm leading-none">
                  {language === "am" ? "ጎዴ እና ሚሊየን" : "Gode & Million"}
                </p>
                <p className="text-[10px] text-[#FF8C00] font-semibold mt-0.5">
                  {language === "am" ? "የመኪና መሸጫ" : "Car Market"}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === "am"
                ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ — ፕሮፌሽናል የመኪና ሸያጭ፣ ቀረጥ ነፃ EV፣ 120 ነጥብ ምርመራ።"
                : "Bole Rwanda, Addis Ababa — Professional vehicle sales, EV duty-free incentives, and 120-point inspections."}
            </p>
            <div className="flex items-center gap-2">
              {[
                { href: "https://facebook.com", label: "Facebook" },
                { href: "https://t.me/godemillion", label: "Telegram" },
                { href: "https://instagram.com", label: "Instagram" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#FF8C00] hover:text-white text-slate-400 transition text-[10px] font-bold border border-white/10">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                ["/inventory", t.navInventory],
                ["/sell", t.navSellCar],
                ["/estimator", t.navEstimator],
                ["/financing", t.navFinancing],
                ["/compare", t.navCompare],
                ["/blog", t.navBlog],
                ["/partners", t.navPartners],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to as string} className="text-slate-400 hover:text-[#FF8C00] transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t.contactUs}</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#FF8C00] shrink-0 mt-0.5" />
                <span>{language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ፣ ኢትዮጵያ" : "Bole Rwanda, Near Edna Mall, Addis Ababa"}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                <a href="tel:+251911223344" className="hover:text-[#FF8C00] transition font-mono">+251-91-122-3344</a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                <a href="tel:+251912345678" className="hover:text-[#FF8C00] transition font-mono">+251-91-234-5678</a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                <a href="mailto:info@godemillion.et" className="hover:text-[#FF8C00] transition">info@godemillion.et</a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#FF8C00] shrink-0 mt-0.5" />
                <span>{t.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">
              {language === "am" ? "የክፍያ አማራጮች" : "Payment Options"}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {["Telebirr", "CBE Birr", "Awash Bank", "Dashen Bank", "Bank Transfer", "Cash (ETB)"].map(p => (
                <div key={p} className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
                  {p}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3.5 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/20">
              <p className="text-[10px] text-[#FF8C00] font-bold">
                {language === "am" ? "ቴሌብር እና ሲቢኢ ብር ዲጂታል ክፍያ ይቀበላሉ" : "Telebirr & CBE Birr digital payments accepted"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} {t.rightsReserved}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span>Ethiopia</span>
            <span className="text-[#FF8C00]">&bull;</span>
            <span>Bole Rwanda</span>
            <span className="text-[#FF8C00]">&bull;</span>
            <span>Addis Ababa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
`);

console.log('Footer fixed');
