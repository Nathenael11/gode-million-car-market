import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', path.basename(p)); };
const B = path.resolve('.');

// ── index.html ───────────────────────────────────────────────────────────────
W(path.join(B, 'client/index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Gode and Million Car Market - Premier bilingual car marketplace in Bole Rwanda, Addis Ababa, Ethiopia. Buy and sell verified vehicles with transparent ETB pricing." />
    <title>Gode & Million Car Market | Bole Rwanda, Addis Ababa</title>
    <!-- Google Fonts: Ethiopian + Latin -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
    <script>
      // Clear stale service workers on localhost so you never get a white screen
      if ('serviceWorker' in navigator && location.hostname === 'localhost') {
        navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
        caches.keys().then(ks => ks.forEach(k => caches.delete(k)));
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

// ── UserDashboard ─────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/pages/UserDashboard.tsx'), `import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Car, Heart, PlusCircle, Calendar, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import { apiRequest } from "../utils/api";
import { formatETB } from "../utils/formatters";
import { CarItem } from "../components/car/CarCard";

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { wishlist } = useWishlist();

  const [myCars, setMyCars] = useState<CarItem[]>([]);
  const [testDrives, setTestDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const [cRes, tdRes] = await Promise.all([
          apiRequest("/cars"),
          apiRequest("/test-drives")
        ]);
        if (cRes.success && cRes.data) setMyCars(cRes.data.filter((c: CarItem) => c.seller?.id === user.id));
        if (tdRes.success && tdRes.data) setTestDrives(tdRes.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white border border-gray-200 text-center space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Please Sign In</h2>
        <Link to="/login" className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-white font-bold text-sm">
          {t.navLogin}
        </Link>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this listing?")) return;
    try {
      await apiRequest(\`/cars/\${id}\`, { method: "DELETE" });
      setMyCars(p => p.filter(c => c.id !== id));
    } catch (e: any) { alert(e.message); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || \`https://api.dicebear.com/7.x/initials/svg?seed=\${encodeURIComponent(user.name)}&backgroundColor=ff8c00\`}
            alt={user.name}
            className="w-16 h-16 rounded-2xl border-2 border-[#FF8C00] object-cover"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {language === "am" ? (user.nameAm || user.name) : user.name}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {user.email}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold text-[10px] uppercase">{user.role}</span>
            </p>
          </div>
        </div>
        <Link
          to="/sell"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs shadow-md shadow-orange-200 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.navSellCar}</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: language === "am" ? "ዝርዝሮቼ" : "My Listings", value: myCars.length, icon: Car, color: "text-[#FF8C00]" },
          { label: language === "am" ? "የሚፈለጉ" : "Saved Cars", value: wishlist.length, icon: Heart, color: "text-red-500" },
          { label: language === "am" ? "የሙከራ ጉዞ" : "Test Drives", value: testDrives.length, icon: Calendar, color: "text-emerald-600" },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center gap-4">
            <div className={\`p-3 rounded-xl bg-gray-50 \${s.color}\`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className={\`text-2xl font-black \${s.color}\`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* My Listings */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-[#FF8C00]" />
          <span>{language === "am" ? "ዝርዝሮቼ" : "My Vehicle Listings"}</span>
        </h2>
        {loading ? (
          <div className="text-xs text-gray-400 py-8 text-center">Loading your listings...</div>
        ) : myCars.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
            <p className="text-sm text-gray-500">
              {language === "am" ? "ምንም ዝርዝር አልቀረበም።" : "You haven't posted any cars yet."}
            </p>
            <Link to="/sell" className="inline-block px-4 py-2 rounded-xl bg-[#FF8C00] text-white font-bold text-xs">
              {language === "am" ? "ዛሬ ዝርዝርዎን ያቅርቡ" : "Post Your First Listing"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCars.map(car => (
              <div key={car.id} className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <img src={car.images?.[0]} alt={car.title} className="w-full h-36 object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=70"; }} />
                <div className="p-4 space-y-2">
                  <p className="font-bold text-sm text-gray-900 line-clamp-1">{car.title}</p>
                  <p className="text-lg font-black text-gray-900">{formatETB(car.price)}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs font-semibold">
                    <Link to={\`/car/\${car.id}\`} className="text-[#FF8C00] hover:underline">View</Link>
                    <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test Drive appointments */}
      {testDrives.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF8C00]" />
            <span>{language === "am" ? "የሙከራ ጉዞ ቀጠሮዎች" : "Test Drive Appointments"}</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                <tr>
                  <th className="p-3 text-left">Vehicle</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Date & Time</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testDrives.map(td => (
                  <tr key={td.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-900">{td.carTitle}</td>
                    <td className="p-3">{td.fullName}</td>
                    <td className="p-3 font-mono">{td.phone}</td>
                    <td className="p-3">{td.preferredDate} {td.preferredTime}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">{td.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
`);

// ── About ─────────────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/pages/About.tsx'), `import React from "react";
import { Car, Award, ShieldCheck, Users, MapPin, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const About: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {language === "am" ? "ስለ ጎዴ እና ሚሊየን" : "About Gode & Million Car Market"}
        </h1>
        <p className="text-xs font-bold text-[#FF8C00]">
          {language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ፣ ኢትዮጵያ" : "Bole Rwanda, Addis Ababa, Ethiopia"}
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5 text-sm leading-relaxed text-gray-600">
        <h2 className="text-xl font-bold text-gray-900">
          {language === "am" ? "ታሪካችን" : "Our Story"}
        </h2>
        <p>
          {language === "am"
            ? "ጎዴ እና ሚሊየን የመኪና መሸጫ በቦሌ ሩዋንዳ፣ አዲስ አበባ ለዓመታት ያገለገለ፣ ኢትዮጵያ ውስጥ በጣም የሚታመን የመኪና ሸያጭ ድርጅት ነው። የእያንዳንዱን ደንበኛ ፍላጎት ለማሟላት፣ ሙሉ ቴክኒካዊ ምርመራ ያለፈ፣ ዋጋው ግልጽ የሆነ ተሽከርካሪ ማቅረብ የዕለት ሥራችን ነው።"
            : "Founded in the heart of Bole Rwanda, Addis Ababa, Gode & Million Car Market has grown into one of Ethiopia's most trusted automotive dealerships. Every car we sell goes through a rigorous 120-point mechanical check and is priced transparently in Ethiopian Birr — no hidden charges."}
        </p>
        <p>
          {language === "am"
            ? "ከቮልስዋገን ID.4 EV ቀረጥ ነፃ መኪናዎች ጀምሮ እስከ ቶዮታ ፕራዶ፣ ሃዩንዳይ ቱሳን እና ኢሱዙ D-Max ፒክ-አፕ ድረስ — ሁሉም ዓይነት ፍላጎቶችን ያሟላ ሰፊ ዝርዝር አለን። የቴሌብር፣ ሲቢኢ ብር፣ አዋሽ ባንክ እና ዳሽን ባንክ ብድር ጭምር እናስተናግዳለን።"
            : "From Volkswagen ID.4 zero-duty EVs to Toyota Prado 4WDs, Hyundai Tucson sedans, and Isuzu D-Max pickups — our Bole Rwanda showroom has something for every buyer. We also arrange bank financing through CBE, Awash Bank, and Dashen Bank."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-center">
          {[
            { val: "10+", label: language === "am" ? "ዓመት ልምድ" : "Years of Experience" },
            { val: "2,500+", label: language === "am" ? "የተሸጡ መኪናዎች" : "Cars Sold in Addis" },
            { val: "99%", label: language === "am" ? "ደንበኛ እርካታ" : "Customer Satisfaction" },
          ].map(s => (
            <div key={s.val} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <p className="text-3xl font-black text-[#FF8C00]">{s.val}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { icon: ShieldCheck, title: language === "am" ? "120-ነጥብ ምርመራ" : "120-Point Inspection", desc: language === "am" ? "እያንዳንዱ ተሽከርካሪ ሙሉ ቴክኒካዊ ምርመራ ያካሂዳል" : "Every vehicle undergoes a comprehensive mechanical and safety check." },
          { icon: Award, title: language === "am" ? "የምስክር ወረቀት ያለው ሁኔታ" : "Certified Condition Reports", desc: language === "am" ? "ሙሉ የቴክኒክ ሪፖርት ከጀርመን ኦቶ ምርመራ ጣቢያ" : "Full inspection reports from German Auto inspection centre in Addis." },
          { icon: Users, title: language === "am" ? "የባንክ ብድር ድጋፍ" : "Bank Loan Assistance", desc: language === "am" ? "ቀጥ ያለ ትስስር ከሲቢኢ፣ አዋሽ እና ዳሽን ባንክ" : "Direct arrangement with CBE, Awash, and Dashen Bank auto loans." },
          { icon: Star, title: language === "am" ? "ቀረጥ ነፃ EV ምክር" : "EV Zero-Duty Advisory", desc: language === "am" ? "ቮልስዋገን ID.4 እና BYD Song Plus ቀረጥ ነፃ ምርጫዎች" : "Guidance on Volkswagen ID.4 and BYD EV zero-excise incentives." },
        ].map(f => (
          <div key={f.title} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex gap-4">
            <div className="p-3 rounded-xl bg-orange-50 text-[#FF8C00] shrink-0 h-fit">
              <f.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
`);

// ── Contact ───────────────────────────────────────────────────────────────────
W(path.join(B, 'client/src/pages/Contact.tsx'), `import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { EthiopianMap } from "../components/common/EthiopianMap";

export const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {language === "am" ? "ያግኙን" : "Get in Touch"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2">
          {language === "am"
            ? "ለማንኛውም ጥያቄ ወይም ሾውሩማችንን ለመጎብኘት ያነጋግሩን"
            : "Questions about a car, test drive bookings, or just want to visit the showroom? We're here to help."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === "am" ? "መልእክትዎ ደርሷል!" : "Message received!"}
              </h3>
              <p className="text-xs text-gray-500">
                {language === "am" ? "ቡድናችን በቅርቡ ያነጋግርዎታል።" : "Our team will get back to you shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-black text-sm text-gray-900 mb-4">
                {language === "am" ? "መልእክት ይላኩ" : "Send a Message"}
              </h3>
              {[
                { key: "name", label: language === "am" ? "ሙሉ ስም" : "Your Name", type: "text", placeholder: "Abebe Bekele" },
                { key: "phone", label: language === "am" ? "ስልክ ቁጥር (+251)" : "Phone (+251)", type: "tel", placeholder: "+251-91-234-5678" },
                { key: "email", label: language === "am" ? "ኢሜይል (አማራጭ)" : "Email (optional)", type: "email", placeholder: "abebe@email.com" },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-bold text-gray-700 block mb-1">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
              ))}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "am" ? "መልእክት" : "Message"}
                </label>
                <textarea rows={4} required value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder={language === "am" ? "ስለ ምን ያናገርዎ?" : "How can we help you today?"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-md shadow-orange-200 transition">
                {language === "am" ? "ይላኩ" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-black text-sm text-gray-900">
            {language === "am" ? "ቀጥታ ያነጋግሩን" : "Direct Contacts"}
          </h3>
          <div className="space-y-4 text-xs text-gray-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{language === "am" ? "አድራሻ" : "Address"}</p>
                <p className="mt-0.5">{language === "am" ? "ቦሌ ሩዋንዳ፣ ኤድና ሞል አቅራቢያ፣ አዲስ አበባ" : "Bole Rwanda, Near Edna Mall Road, Addis Ababa, Ethiopia"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{language === "am" ? "ስልክ" : "Phone"}</p>
                <a href="tel:+251911223344" className="block font-mono hover:text-[#FF8C00] transition mt-0.5">+251-91-122-3344</a>
                <a href="tel:+251912345678" className="block font-mono hover:text-[#FF8C00] transition">+251-91-234-5678</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <a href="mailto:info@godemillion.et" className="hover:text-[#FF8C00] transition mt-0.5 block">info@godemillion.et</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">{language === "am" ? "የስራ ሰዓት" : "Opening Hours"}</p>
                <p className="mt-0.5">{language === "am" ? "ሰ.ሰ — ቅዳሜ: ጠ.ሰ 8:30 — ከ.ሰ 6:30" : "Monday — Saturday: 8:30 AM – 6:30 PM"}</p>
                <p className="text-gray-400">{language === "am" ? "እሁድ: በቀጠሮ ብቻ" : "Sunday by appointment"}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
            <a href="https://t.me/godemillion" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold hover:bg-blue-100 transition">
              Telegram
            </a>
            <a href="https://wa.me/251911223344" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 transition">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <EthiopianMap />
    </div>
  );
};
`);

console.log('Done: index.html, UserDashboard, About, Contact');
