import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, LogOut, LayoutDashboard, Car, Shield, QrCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { QRCodeModal } from "./QRCodeModal";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const navLinks = [
    { to: "/", label: t.navHome, exact: true },
    { to: "/inventory", label: t.navInventory },
    { to: "/sell", label: t.navSellCar },
    { to: "/estimator", label: t.navEstimator },
    { to: "/financing", label: t.navFinancing },
    { to: "/blog", label: t.navBlog },
    { to: "/about", label: t.navAbout },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-gray-100 shadow-sm"
            : "bg-white/95 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
              <div className="w-9 h-9 rounded-xl bg-[#FF8C00] flex items-center justify-center shadow-md shadow-orange-200">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-gray-900 leading-none">
                  {language === "am" ? "ጎዴ እና ሚሊየን" : "Gode & Million"}
                </p>
                <p className="text-[10px] text-[#FF8C00] font-semibold leading-none mt-0.5">
                  {language === "am" ? "ቦሌ ሩዋንዳ · አ.አ" : "Bole Rwanda · Addis Ababa"}
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? "text-[#FF8C00] bg-orange-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* QR Code Share Button */}
              <button
                onClick={() => setQrModalOpen(true)}
                title={language === "am" ? "የስልክ QR ኮድ አሳይ" : "Show Mobile QR Code"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF8C00] border border-orange-200 text-xs font-bold transition shadow-xs"
              >
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">{language === "am" ? "QR ኮድ" : "QR Code"}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#FF8C00] hover:text-[#FF8C00] transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === "en" ? "አማ" : "EN"}</span>
              </button>

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#FF8C00] transition"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=ff8c00`}
                      alt={user.name}
                      className="w-6 h-6 rounded-lg object-cover"
                    />
                    <span className="text-xs font-bold text-gray-900 max-w-[80px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-gray-100 shadow-xl py-1.5 z-50">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF8C00] transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>{t.navDashboard}</span>
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF8C00] transition"
                        >
                          <Shield className="w-4 h-4" />
                          <span>{t.navAdmin}</span>
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t.navLogout}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="hidden sm:block text-xs font-semibold text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    {t.navLogin}
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-bold text-white px-4 py-2 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] shadow-sm shadow-orange-200 transition"
                  >
                    {t.navRegister}
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive ? "text-[#FF8C00] bg-orange-50" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => { setQrModalOpen(true); setMobileOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100"
            >
              <QrCode className="w-4 h-4" />
              <span>{language === "am" ? "የስልክ QR ኮድ አሳይ" : "Show QR Code"}</span>
            </button>
            <button
              onClick={() => { toggleLanguage(); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {language === "en" ? "Amharic (አማርኛ)" : "English"}
            </button>
          </div>
        )}
      </header>

      {/* Global QR Code Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        title="Gode and Million Car Market (ጎዴ እና ሚሊየን)"
        url="https://gode-million-car-market.onrender.com"
      />
    </>
  );
};
