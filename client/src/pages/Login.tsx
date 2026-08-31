import React, { useState } from "react";
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
                className={`px-3 py-1.5 rounded-lg border font-bold hover:brightness-95 transition ${d.color}`}>
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
