import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Car, PlusCircle, Heart, Phone, MessageSquare, QrCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useWishlist } from "../../context/WishlistContext";
import { QRCodeModal } from "../common/QRCodeModal";

export const MobileBottomNav: React.FC = () => {
  const { language } = useLanguage();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* ── Native Mobile Bottom App Navigation Bar ── */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
              isActive("/")
                ? "text-[#FF8C00] font-black scale-105"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <div className="relative">
              <Home className={`w-5 h-5 ${isActive("/") ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              {isActive("/") && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF8C00]" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {language === "am" ? "መነሻ" : "Home"}
            </span>
          </Link>

          {/* Inventory */}
          <Link
            to="/inventory"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
              isActive("/inventory")
                ? "text-[#FF8C00] font-black scale-105"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <div className="relative">
              <Car className={`w-5 h-5 ${isActive("/inventory") ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              {isActive("/inventory") && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF8C00]" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {language === "am" ? "መኪኖች" : "Cars"}
            </span>
          </Link>

          {/* Sell Car (Prominent Central Action Button) */}
          <Link
            to="/sell"
            className="flex flex-col items-center justify-center -mt-5 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF8C00] via-[#FFA333] to-[#E07B00] text-white flex items-center justify-center shadow-lg shadow-orange-500/35 border-2 border-white group-active:scale-90 transition-transform">
              <PlusCircle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 mt-1">
              {language === "am" ? "ይሽጡ" : "Sell"}
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/inventory?wishlist=true"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 relative ${
              location.search.includes("wishlist=true")
                ? "text-[#FF8C00] font-black scale-105"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <div className="relative">
              <Heart
                className={`w-5 h-5 ${
                  location.search.includes("wishlist=true")
                    ? "fill-[#FF8C00] text-[#FF8C00]"
                    : "stroke-[1.75]"
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {language === "am" ? "የተመረጡ" : "Saved"}
            </span>
          </Link>

          {/* Contact / Showroom Quick Menu */}
          <button
            onClick={() => setContactModalOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-slate-500 hover:text-[#FF8C00] transition-colors"
          >
            <Phone className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5 tracking-tight">
              {language === "am" ? "ደውሉ" : "Call"}
            </span>
          </button>
        </div>
      </nav>

      {/* ── Quick Contact Bottom Sheet for Mobile ── */}
      {contactModalOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end transition-opacity"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 pb-24 space-y-4 max-w-md w-full mx-auto shadow-2xl animate-in slide-in-from-bottom-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />
            
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                {language === "am" ? "ጎዴ እና ሚሊየን የመኪና ገበያ" : "Gode & Million Car Market"}
              </h3>
              <p className="text-xs text-slate-500">
                {language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ 🇪🇹" : "Bole Rwanda, Addis Ababa 🇪🇹"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:+251911223344"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs active:scale-95 transition"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <span>{language === "am" ? "ቀጥታ ይደውሉ" : "Call Showroom"}</span>
                <span className="text-[10px] text-emerald-600 font-normal">+251-91-122-3344</span>
              </a>

              <a
                href="https://wa.me/251911223344?text=Hello%20Gode%20and%20Million%20Car%20Market,%20I%20am%20interested%20in%20your%20cars"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 font-bold text-xs active:scale-95 transition"
              >
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md shadow-green-600/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span>WhatsApp Chat</span>
                <span className="text-[10px] text-green-600 font-normal">{language === "am" ? "መልዕክት ይላኩ" : "Instant Chat"}</span>
              </a>
            </div>

            <button
              onClick={() => {
                setContactModalOpen(false);
                setQrModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
            >
              <QrCode className="w-4 h-4 text-[#FF8C00]" />
              <span>{language === "am" ? "የስልክ QR ኮድ አሳይ (Share App)" : "Show QR Code (Share App)"}</span>
            </button>

            <button
              onClick={() => setContactModalOpen(false)}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              {language === "am" ? "ዝጋ" : "Close"}
            </button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        title="Gode & Million Car Market (ጎዴ እና ሚሊየን)"
        url="https://gode-million-car-market.onrender.com"
      />
    </>
  );
};
