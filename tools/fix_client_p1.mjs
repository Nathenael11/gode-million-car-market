import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', p.slice(p.indexOf('client'))); };
const B = path.resolve('.');

// ━━ 1. index.css — Professional warm color system ━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/styles/index.css'), `@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', 'Noto Sans Ethiopic', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #FAFAFA;
    color: #1A1A2E;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5 { letter-spacing: -0.01em; }
}

:root {
  --tangerine: #FF8C00;
  --tangerine-dark: #E07B00;
  --tangerine-light: #FFF4E6;
  --slate-dark: #1A1A2E;
  --slate-mid: #334155;
  --slate-soft: #64748B;
  --surface: #FFFFFF;
  --surface-2: #F8F8F8;
  --border: #E8E8E8;
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #F1F5F9; }
::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--tangerine); }

.tangerine-gradient { background: linear-gradient(135deg, #FF8C00 0%, #E07B00 100%); }
.tangerine-glow { box-shadow: 0 4px 20px rgba(255,140,0,0.2); }
.tangerine-glow-lg { box-shadow: 0 10px 40px rgba(255,140,0,0.25); }

.card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,140,0,0.12);
}

/* Ethiopic script rendering */
[lang="am"], .ethiopic {
  font-family: 'Noto Sans Ethiopic', 'Nyala', sans-serif;
  line-height: 1.7;
}
`);

// ━━ 2. Navbar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/components/common/Navbar.tsx'), `import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, LogOut, LayoutDashboard, Car, Shield } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
    <header
      className={\`sticky top-0 z-50 transition-all duration-300 \${
        scrolled
          ? "bg-white border-b border-gray-100 shadow-sm"
          : "bg-white/95 border-b border-transparent"
      }\`}
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
                  \`px-3 py-2 rounded-lg text-xs font-semibold transition \${
                    isActive
                      ? "text-[#FF8C00] bg-orange-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }\`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
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
                    src={user.avatar || \`https://api.dicebear.com/7.x/initials/svg?seed=\${user.name}&backgroundColor=ff8c00\`}
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
                \`block px-4 py-2.5 rounded-xl text-sm font-semibold transition \${
                  isActive ? "text-[#FF8C00] bg-orange-50" : "text-gray-700 hover:bg-gray-50"
                }\`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => { toggleLanguage(); setMobileOpen(false); }}
            className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            {language === "en" ? "Amharic (አማርኛ)" : "English"}
          </button>
        </div>
      )}
    </header>
  );
};
`);

// ━━ 3. Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/components/common/Footer.tsx'), `import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Car, Facebook, Instagram, Youtube } from "lucide-react";
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
                ? "በቦሌ ሩዋንዳ፣ አዲስ አበባ የሚሰጥ ፕሮፌሽናል የመኪና ሸያጭ አገልግሎት። ቀረጥ ነፃ ኤሌክትሪክ መኪናዎች፣ 120-ነጥብ ምርመራ እና ሙሉ ድጋፍ።"
                : "Professional vehicle sales & inspection services in Bole Rwanda, Addis Ababa. EV duty-free incentives, 120-point inspections, and full support."}
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-[#FF8C00] hover:text-white text-slate-400 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-[#FF8C00] hover:text-white text-slate-400 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-[#FF8C00] hover:text-white text-slate-400 transition">
                <Youtube className="w-4 h-4" />
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
                  <Link to={to} className="text-slate-400 hover:text-[#FF8C00] transition">
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
                <span>{language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ፣ ኢትዮጵያ" : "Bole Rwanda, Near Edna Mall Road, Addis Ababa, Ethiopia"}</span>
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
            <span className="text-[#FF8C00]">&#8226;</span>
            <span>Bole Rwanda</span>
            <span className="text-[#FF8C00]">&#8226;</span>
            <span>Addis Ababa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
`);

console.log('Done part 1: CSS, Navbar, Footer');
