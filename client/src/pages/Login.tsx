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
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate(redirect);
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FF8C00] flex items-center justify-center text-white font-bold mx-auto shadow-md shadow-orange-500/20">
            <Car className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">{t.welcomeBack}</h1>
          <p className="text-xs text-slate-500">
            {language === "am"
              ? "?? ?? ?? ???? ???? ??? ?????? ???"
              : "Sign in to access your listings, inquiries, and saved vehicles"}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">{t.email}</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@godemillion.et"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:brightness-105 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : t.navLogin}
          </button>
        </form>

        {/* Demo fast-fill accounts */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-[11px]">
          <p className="text-slate-600 font-bold">Demo Credentials (Click to fill):</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@godemillion.et", "Admin@123")}
              className="px-2.5 py-1 rounded-lg bg-orange-100 border border-orange-200 text-orange-800 font-bold hover:bg-orange-200"
            >
              Admin (Million)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("seller@godemillion.et", "Seller@123")}
              className="px-2.5 py-1 rounded-lg bg-blue-100 border border-blue-200 text-blue-800 font-bold hover:bg-blue-200"
            >
              Seller (Dawit)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("buyer@godemillion.et", "Buyer@123")}
              className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-200"
            >
              Buyer (Selamawit)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          {t.dontHaveAccount}{" "}
          <Link to="/register" className="text-orange-600 font-bold hover:underline">
            {t.navRegister}
          </Link>
        </div>
      </div>
    </div>
  );
};
