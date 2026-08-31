import React, { useState } from "react";
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
                  className={`py-2.5 rounded-xl border font-bold transition ${form.role === r.val ? "border-[#FF8C00] bg-orange-50 text-[#FF8C00]" : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"}`}>
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
