import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Car, Shield, Send, Heart } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C00] to-[#EA580C] p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Car className="w-5 h-5 text-[#FF8C00]" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">GODE &amp; MILLION</h3>
                <p className="text-xs text-orange-400 font-semibold">
                  {language === "am" ? "???? ??? • ?? ????" : "Car Market • Bole Rwanda"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === "am"
                ? "???? ??? ?? ???? ???? ?????? ???? ???? ??? ???? ????? ???? ?? ?? ?? ????? ???? ???????"
                : "Addis Ababa's trusted automotive hub located in Bole Rwanda. Verified mechanical condition, ETB financing, and EV duty exemptions."}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span>???? Proudly serving Ethiopia &amp; Diaspora</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/inventory" className="hover:text-[#FF8C00] transition">Vehicle Inventory (???? ????)</Link></li>
              <li><Link to="/estimator" className="hover:text-[#FF8C00] transition">Price Estimator (??? ???)</Link></li>
              <li><Link to="/financing" className="hover:text-[#FF8C00] transition">Bank Loan Calculator (???? ???)</Link></li>
              <li><Link to="/sell" className="hover:text-[#FF8C00] transition">Sell Your Car (????? ???)</Link></li>
              <li><Link to="/blog" className="hover:text-[#FF8C00] transition">Automotive News (???? ????)</Link></li>
            </ul>
          </div>

          {/* Partners & Payment */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Payment &amp; Partners</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Telebirr SuperApp Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>CBE Birr &amp; Auto Loans (70%)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>Awash Bank Vehicle Financing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span>Nyala Motor Insurance S.C.</span>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Showroom Contact</h4>
            <div className="space-y-2.5 text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                <span>Bole Rwanda (Near Edna Mall Road), Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span className="font-mono font-bold text-white">+251-91-122-3344</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF8C00] shrink-0" />
                <span>Mon - Sat: 8:30 AM - 6:30 PM (EAT)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Gode &amp; Million Car Market (?? ?? ???? ???? ???). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300">About Us</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300">Contact</Link>
            <span>•</span>
            <Link to="/partners" className="hover:text-slate-300">Partners</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
