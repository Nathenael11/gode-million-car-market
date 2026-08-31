import React, { useState, useEffect } from "react";
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
      await apiRequest(`/cars/${id}`, { method: "DELETE" });
      setMyCars(p => p.filter(c => c.id !== id));
    } catch (e: any) { alert(e.message); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=ff8c00`}
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
            <div className={`p-3 rounded-xl bg-gray-50 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
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
                    <Link to={`/car/${car.id}`} className="text-[#FF8C00] hover:underline">View</Link>
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
