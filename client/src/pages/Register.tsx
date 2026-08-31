import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, User, Mail, Lock, Phone, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export const Register: React.FC = () => {
  const { t, language } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    nameAm: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
    subCity: "Bole"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#111827] border border-gray-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FF8C00] flex items-center justify-center text-gray-950 font-bold mx-auto shadow-lg shadow-orange-500/20">
            <Car className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">{t.createAccount}</h1>
          <p className="text-xs text-gray-400">Join Addis Ababa's premier car community</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-gray-300 block mb-1">{t.name} *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Abebe Bekele"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-300 block mb-1">{t.phone} (+251) *</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+251-91-123-4567"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
              />
              <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-300 block mb-1">{t.email} *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-300 block mb-1">Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-300 block mb-1">Account Role</label>
            <select
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
            >
              <option value="buyer">{t.roleBuyer}</option>
              <option value="seller">{t.roleSeller}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : t.createAccount}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          {t.alreadyHaveAccount}{" "}
          <Link to="/login" className="text-[#FF8C00] font-semibold hover:underline">
            {t.navLogin}
          </Link>
        </div>
      </div>
    </div>
  );
};
