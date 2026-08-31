import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', p.slice(p.indexOf('client'))); };
const B = path.resolve('.');

// ━━ EthiopianMap ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/components/common/EthiopianMap.tsx'), `import React from "react";
import { MapPin, Phone, Clock, Car } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const EthiopianMap: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Info panel */}
        <div className="bg-[#1A1A2E] p-8 space-y-6 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Car className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white font-black">
                {language === "am" ? "ጎዴ እና ሚሊየን" : "Gode & Million Car Market"}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === "am"
                ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ"
                : "Bole Rwanda, Near Edna Mall Road"}
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs">
                  {language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ" : "Bole Rwanda, Addis Ababa"}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {language === "am" ? "ኢትዮጵያ" : "Ethiopia — Lat: 9.0052° N, Lon: 38.7861° E"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-[#FF8C00] shrink-0" />
              <div className="text-xs">
                <a href="tel:+251911223344" className="text-white font-mono hover:text-[#FF8C00] transition block">+251-91-122-3344</a>
                <a href="tel:+251912345678" className="text-white font-mono hover:text-[#FF8C00] transition block">+251-91-234-5678</a>
              </div>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <Clock className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="text-white font-semibold">
                  {language === "am" ? "ሰ.ሰ — ቅዳሜ፡ 8:30 — 18:30" : "Mon — Sat: 8:30 AM – 6:30 PM"}
                </p>
                <p className="text-slate-400">
                  {language === "am" ? "እሁድ፡ በቀጠሮ ብቻ" : "Sunday by appointment only"}
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Bole+Rwanda+Addis+Ababa+Ethiopia"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-2.5 rounded-xl border border-[#FF8C00]/40 bg-[#FF8C00]/10 text-[#FF8C00] font-bold text-xs text-center hover:bg-[#FF8C00] hover:text-white transition"
          >
            {language === "am" ? "Google Maps ላይ ይከፈቱ" : "Open in Google Maps"}
          </a>
        </div>

        {/* Map embed */}
        <div className="lg:col-span-2 h-64 lg:h-auto min-h-[280px] bg-slate-100 relative">
          <iframe
            title="Gode and Million Car Market Location - Bole Rwanda, Addis Ababa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.618894854756!2d38.786!3d9.005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMTguNyJOIDM4wrA0NycxOS42IkU!5e0!3m2!1sen!2set!4v1600000000000!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "280px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
`);

// ━━ Login ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/pages/Login.tsx'), `import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Car, Lock, Mail, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export const Login: React.FC = () => {
  const { t, language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await login(email, password);
      navigate(redirect);
    } catch (err: any) {
      setError(err.message || "Wrong email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl space-y-7">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FF8C00] flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-200">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">{t.welcomeBack}</h1>
          <p className="text-xs text-gray-500">
            {language === "am"
              ? "ወደ ጎዴ እና ሚሊየን አካውንትዎ ይግቡ"
              : "Sign in to your Gode & Million account"}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">{t.email}</label>
            <div className="relative">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-md shadow-orange-200 transition disabled:opacity-50">
            {loading ? "Signing in..." : t.navLogin}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5 text-[11px]">
          <p className="text-gray-600 font-bold">Try a demo account:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Admin", email: "admin@godemillion.et", pass: "Admin@123", color: "bg-orange-100 text-orange-800 border-orange-200" },
              { label: "Seller", email: "seller@godemillion.et", pass: "Seller@123", color: "bg-blue-100 text-blue-800 border-blue-200" },
              { label: "Buyer", email: "buyer@godemillion.et", pass: "Buyer@123", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
            ].map(d => (
              <button key={d.label} type="button" onClick={() => { setEmail(d.email); setPassword(d.pass); }}
                className={\`px-3 py-1.5 rounded-lg border font-bold hover:brightness-95 transition \${d.color}\`}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          {t.dontHaveAccount}{" "}
          <Link to="/register" className="text-[#FF8C00] font-bold hover:underline">{t.navRegister}</Link>
        </p>
      </div>
    </div>
  );
};
`);

// ━━ Register ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/pages/Register.tsx'), `import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, User, Mail, Lock, Phone, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export const Register: React.FC = () => {
  const { t, language } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "buyer" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl space-y-7">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FF8C00] flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-200">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">{t.createAccount}</h1>
          <p className="text-xs text-gray-500">
            {language === "am" ? "ለቦሌ ሩዋንዳ ሾውሩም ህብረተሰብ ይቀላቀሉ" : "Join Addis Ababa's premier car community"}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {[
            { key: "name", label: t.name, type: "text", icon: User, placeholder: "Abebe Bekele" },
            { key: "phone", label: t.phone, type: "tel", icon: Phone, placeholder: "+251-91-234-5678" },
            { key: "email", label: t.email, type: "email", icon: Mail, placeholder: "abebe@email.com" },
            { key: "password", label: "Password", type: "password", icon: Lock, placeholder: "Min 8 characters" },
          ].map(f => (
            <div key={f.key}>
              <label className="font-bold text-gray-700 block mb-1">{f.label} *</label>
              <div className="relative">
                <input type={f.type} required value={(form as any)[f.key]} onChange={e => upd(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                <f.icon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          ))}

          <div>
            <label className="font-bold text-gray-700 block mb-1">I am a...</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: "buyer", label: language === "am" ? "ገዢ / አሽከርካሪ" : "Buyer" },
                { val: "seller", label: language === "am" ? "ሻጭ / ዲለር" : "Seller / Dealer" },
              ].map(r => (
                <button key={r.val} type="button" onClick={() => upd("role", r.val)}
                  className={\`py-2.5 rounded-xl border font-bold transition \${form.role === r.val ? "border-[#FF8C00] bg-orange-50 text-[#FF8C00]" : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"}\`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-md shadow-orange-200 transition disabled:opacity-50">
            {loading ? "Creating..." : t.createAccount}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          {t.alreadyHaveAccount}{" "}
          <Link to="/login" className="text-[#FF8C00] font-bold hover:underline">{t.navLogin}</Link>
        </p>
      </div>
    </div>
  );
};
`);

console.log('EthiopianMap, Login, Register done');
