import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  PlusCircle,
  Heart,
  Scale,
  User,
  Shield,
  PhoneCall,
  Car,
  Calculator,
  Newspaper,
  Handshake,
  LogOut
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { LanguageToggle } from "./LanguageToggle";

export const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: t.navHome },
    { path: "/inventory", label: t.navInventory },
    { path: "/estimator", label: t.navEstimator },
    { path: "/financing", label: t.navFinancing },
    { path: "/blog", label: t.navBlog },
    { path: "/partners", label: t.navPartners },
    { path: "/about", label: t.navAbout },
    { path: "/contact", label: t.navContact }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-[#0B0F17]/90 backdrop-blur-md">
      {/* Top utility ticker bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs text-gray-400 bg-gray-950/70 border-b border-gray-800/60">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📍</span>
            <span className="text-gray-300 font-medium">Bole Rwanda, Addis Ababa, Ethiopia 🇪🇹</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FF8C00]">
            <span className="font-semibold">📞 Hotline:</span>
            <a href="tel:+251911223344" className="hover:underline font-mono font-medium">+251-91-122-3344</a>
          </div>
          <div className="text-gray-400">
            ⏰ Mon - Sat: 8:30 AM - 6:30 PM
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EV Zero Duty Active</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300 font-mono">Telebirr &amp; CBE Birr Direct</span>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8C00] to-[#E07B00] p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <Car className="w-6 h-6 text-[#FF8C00]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">GODE &amp; MILLION</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#FF8C00]/20 text-[#FF8C00] font-bold">🇪🇹</span>
              </div>
              <span className="text-xs text-[#FF8C00] font-semibold -mt-0.5">
                {language === "am" ? "የመኪና መሸጫ ማዕከል" : "Car Market • Bole Rwanda"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive(link.path)
                    ? "bg-[#FF8C00]/15 text-[#FF8C00]"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Compare, Wishlist, Language, Post Car, User */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Compare */}
            <Link
              to="/compare"
              className="relative p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-[#FF8C00] hover:border-[#FF8C00]/30 transition"
              title="Compare Cars"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF8C00] text-gray-950 text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/inventory?wishlist=true"
              className="relative p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-[#FF8C00] hover:border-[#FF8C00]/30 transition"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Post Car CTA */}
            <Link
              to="/sell"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-xs shadow-md shadow-orange-500/20 hover:brightness-110 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navSellCar}</span>
            </Link>

            {/* User Account / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=ff8c00`}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-xs font-semibold text-gray-200 max-w-[100px] truncate">
                    {language === "am" ? user.nameAm || user.name : user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl py-1 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-gray-800">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-[#FF8C00] uppercase font-semibold">{user.role}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t.navDashboard}</span>
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-orange-400 hover:bg-gray-800"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>{t.navAdmin}</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-gray-800"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.navLogout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-gray-200 hover:text-white hover:border-gray-700 transition"
              >
                {t.navLogin}
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#0B0F17] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive(link.path)
                  ? "bg-[#FF8C00]/15 text-[#FF8C00] font-bold"
                  : "text-gray-300 hover:bg-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-800 space-y-2">
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navSellCar}</span>
            </Link>

            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-gray-800">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-white"
                >
                  <User className="w-4 h-4 text-[#FF8C00]" />
                  <span>{user.name} ({t.navDashboard})</span>
                </Link>
                <button onClick={logout} className="text-xs text-red-400 font-medium">
                  {t.navLogout}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm font-semibold text-gray-200"
              >
                {t.navLogin}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
