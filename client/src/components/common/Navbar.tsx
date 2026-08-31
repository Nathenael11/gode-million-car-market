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
  Car,
  LogOut,
  Sparkles
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top utility ticker bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs text-slate-600 bg-slate-100/80 border-b border-slate-200/60">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">??</span>
            <span className="text-slate-800 font-semibold">Bole Rwanda, Addis Ababa, Ethiopia ????</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-600 font-semibold">
            <span>?? Hotline:</span>
            <a href="tel:+251911223344" className="hover:underline font-mono">+251-91-122-3344</a>
          </div>
          <div className="text-slate-500">
            ? Mon - Sat: 8:30 AM - 6:30 PM (EAT)
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold text-[11px] border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>EV Zero Duty Active ?</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700 font-mono font-medium">Telebirr &amp; CBE Birr Accepted</span>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF8C00] to-[#EA580C] p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Car className="w-6 h-6 text-[#FF8C00]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">GODE &amp; MILLION</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 font-bold">????</span>
              </div>
              <span className="text-xs text-orange-600 font-semibold -mt-0.5">
                {language === "am" ? "???? ??? ????" : "Car Market • Bole Rwanda"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive(link.path)
                    ? "bg-orange-50 text-[#FF8C00] shadow-xs"
                    : "text-slate-700 hover:text-[#FF8C00] hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Compare */}
            <Link
              to="/compare"
              className="relative p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#FF8C00] hover:bg-orange-50 transition shadow-xs"
              title="Compare Cars"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF8C00] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/inventory?wishlist=true"
              className="relative p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-red-500 hover:bg-red-50 transition shadow-xs"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Post Car CTA */}
            <Link
              to="/sell"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:brightness-105 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navSellCar}</span>
            </Link>

            {/* User Account / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 transition"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=ff8c00`}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {language === "am" ? user.nameAm || user.name : user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl py-1 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-orange-600 uppercase font-semibold">{user.role}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t.navDashboard}</span>
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-orange-600 hover:bg-orange-50 font-semibold"
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
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
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
                className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:text-[#FF8C00] hover:bg-slate-200/80 transition"
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
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? "bg-orange-50 text-[#FF8C00] font-bold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-sm shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navSellCar}</span>
            </Link>

            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900"
                >
                  <User className="w-4 h-4 text-[#FF8C00]" />
                  <span>{user.name}</span>
                </Link>
                <button onClick={logout} className="text-xs text-red-600 font-semibold">
                  {t.navLogout}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm font-bold text-slate-800"
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
