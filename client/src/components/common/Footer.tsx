import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Car, QrCode, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { QRCodeModal } from "./QRCodeModal";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <>
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
              
              {/* Social & QR Code Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQrOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-[#FF8C00] hover:text-white transition text-xs font-bold border border-orange-500/30"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{language === "am" ? "QR ኮድ" : "Scan QR"}</span>
                </button>
                <a href="https://t.me/godemillion" target="_blank" rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#FF8C00] hover:text-white text-slate-400 transition text-[10px] font-bold border border-white/10">
                  Telegram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#FF8C00] hover:text-white text-slate-400 transition text-[10px] font-bold border border-white/10">
                  Facebook
                </a>
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

          {/* Bottom Bar with Author Credit */}
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-[11px] text-slate-400">
                &copy; {new Date().getFullYear()} {t.rightsReserved}
              </p>
              <p className="text-xs text-slate-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <span>Designed &amp; Developed by</span>
                <span className="text-[#FF8C00] font-bold">Nathenael Ermais</span>
                <span>🇪🇹</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <button
                onClick={() => setQrOpen(true)}
                className="text-orange-400 hover:text-orange-300 font-semibold underline flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{language === "am" ? "የዌብሳይት QR ኮድ" : "Showroom QR Code"}</span>
              </button>
              <span>&bull;</span>
              <span>Bole Rwanda</span>
              <span>&bull;</span>
              <span>Addis Ababa</span>
            </div>
          </div>
        </div>
      </footer>

      {/* QR Code Modal Trigger */}
      <QRCodeModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        title="Gode and Million Car Market (ጎዴ እና ሚሊየን)"
        url="https://gode-million-car-market.onrender.com"
      />
    </>
  );
};
