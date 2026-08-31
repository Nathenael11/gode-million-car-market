import React from "react";
import { Link } from "react-router-dom";
import { Car, MapPin, Phone, Mail, Clock, Send, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-gray-800/80 bg-gray-950 text-gray-400 text-sm">
      {/* Top Banner with Partners */}
      <div className="border-b border-gray-800/60 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
            <ShieldCheck className="w-5 h-5 text-[#FF8C00]" />
            <span>{language === "am" ? "የተረጋገጠ የክፍያ እና የመድን ዋስትና አጋሮች" : "Trusted Ethiopian Banking, Payment & Inspection Partners"}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300">Telebirr (ቴሌብር)</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300">CBE Birr</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300">Awash Auto Finance</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300">Nyala Insurance</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF8C00] flex items-center justify-center text-gray-950 font-bold shadow-lg shadow-orange-500/20">
                <Car className="w-6 h-6 text-gray-950" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white">GODE &amp; MILLION</span>
                <p className="text-xs text-[#FF8C00] font-semibold">ጎዴ እና ሚሊየን የመኪና መሸጫ 🇪🇹</p>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
              {language === "am"
                ? "በአዲስ አበባ ቦሌ ሩዋንዳ የሚገኝ አስተማማኝ የመኪና መሸጫ እና መግዣ የገበያ ማዕከል። ቶዮታ፣ ሃዩንዳይ፣ ኢሱዙ እና የኤሌክትሪክ መኪኖች በታማኝነት እና በተመጣጣኝ ዋጋ።"
                : "Ethiopia's premier car marketplace in Bole Rwanda, Addis Ababa. Discover verified new and pre-owned vehicles, EV tax incentive benefits, and flexible auto loans."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/godemillion_cars"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sky-400 hover:bg-sky-500 hover:text-white transition"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="tel:+251911223344"
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-[#FF8C00] hover:bg-[#FF8C00] hover:text-gray-950 transition"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === "am" ? "ፈጣን ሊንኮች" : "Explore"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/inventory" className="hover:text-[#FF8C00] flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-[#FF8C00]" />
                  <span>{t.navInventory}</span>
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#FF8C00] flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-[#FF8C00]" />
                  <span>{t.navSellCar}</span>
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="hover:text-[#FF8C00] flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-[#FF8C00]" />
                  <span>{t.navEstimator}</span>
                </Link>
              </li>
              <li>
                <Link to="/financing" className="hover:text-[#FF8C00] flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-[#FF8C00]" />
                  <span>{t.navFinancing}</span>
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#FF8C00] flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-[#FF8C00]" />
                  <span>{t.navCompare}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Brands in Ethiopia */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === "am" ? "ተወዳጅ ብራንዶች" : "Popular in Ethiopia"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/inventory?make=Toyota" className="hover:text-[#FF8C00] transition">Toyota (ቶዮታ ፕራዶ / ኮሮላ / ቪትዝ)</Link>
              </li>
              <li>
                <Link to="/inventory?make=Volkswagen" className="hover:text-[#FF8C00] transition">Volkswagen (ID.4 CROZZ EV)</Link>
              </li>
              <li>
                <Link to="/inventory?make=Hyundai" className="hover:text-[#FF8C00] transition">Hyundai (አክሰንት / ቱክሰን)</Link>
              </li>
              <li>
                <Link to="/inventory?make=Isuzu" className="hover:text-[#FF8C00] transition">Isuzu (ዲ-ማክስ 4x4 / FSR)</Link>
              </li>
              <li>
                <Link to="/inventory?make=Suzuki" className="hover:text-[#FF8C00] transition">Suzuki (ዲዛየር / ስዊፍት)</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === "am" ? "የሾውሩም አድራሻ" : "Showroom Contact"}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                <span>Bole Rwanda, Next to Edna Mall Road, Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <a href="tel:+251911223344" className="hover:underline font-mono text-gray-300">+251-91-122-3344</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span>info@godemillion.et</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span>Mon-Sat: 8:30 AM - 6:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Gode and Million Car Market (ጎዴ እና ሚሊየን የመኪና መሸጫ). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-gray-400">About</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            <Link to="/login" className="hover:text-gray-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
