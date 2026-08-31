import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Car, Heart, PlusCircle, Trash2, Edit3, MessageSquare, Calendar, User as UserIcon } from "lucide-react";
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
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [testDrives, setTestDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      try {
        const [carsRes, inqRes, tdRes] = await Promise.all([
          apiRequest("/cars"),
          apiRequest("/inquiries"),
          apiRequest("/test-drives")
        ]);

        if (carsRes.success && carsRes.data) {
          setMyCars(carsRes.data.filter((c: CarItem) => c.seller?.id === user.id));
        }
        if (inqRes.success && inqRes.data) {
          setInquiries(inqRes.data);
        }
        if (tdRes.success && tdRes.data) {
          setTestDrives(tdRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-[#111827] text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Please Sign In</h2>
        <Link to="/login" className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs">
          Sign In
        </Link>
      </div>
    );
  }

  const handleDeleteListing = async (carId: string) => {
    if (!confirm("Are you sure you want to remove this car listing?")) return;
    try {
      await apiRequest(`/cars/${carId}`, { method: "DELETE" });
      setMyCars(prev => prev.filter(c => c.id !== carId));
    } catch (err: any) {
      alert(err.message || "Failed to delete listing.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* User Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-[#111827] to-gray-900 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=ff8c00`}
            alt={user.name}
            className="w-16 h-16 rounded-2xl border-2 border-[#FF8C00]"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {language === "am" ? user.nameAm || user.name : user.name}
            </h1>
            <p className="text-xs text-gray-400">
              {user.email} • <span className="text-[#FF8C00] font-mono font-semibold uppercase">{user.role}</span>
            </p>
          </div>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-xs shadow-lg shadow-orange-500/20 hover:brightness-110 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.navSellCar}</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
          <span className="text-xs text-gray-400">My Active Listings</span>
          <p className="text-2xl font-black text-[#FF8C00] mt-1">{myCars.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
          <span className="text-xs text-gray-400">Saved in Wishlist</span>
          <p className="text-2xl font-black text-red-400 mt-1">{wishlist.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
          <span className="text-xs text-gray-400">Inquiries &amp; Test Drives</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{inquiries.length + testDrives.length}</p>
        </div>
      </div>

      {/* My Listings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-[#FF8C00]" />
            <span>My Vehicle Listings</span>
          </h2>
        </div>

        {myCars.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#111827] border border-gray-800 text-center text-xs text-gray-400 space-y-3">
            <p>You have not posted any car listings yet.</p>
            <Link to="/sell" className="inline-block px-4 py-2 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs">
              Post Your First Car
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCars.map(car => (
              <div key={car.id} className="p-4 rounded-2xl bg-[#111827] border border-gray-800 space-y-3">
                <img src={car.images[0]} alt={car.title} className="w-full h-36 object-cover rounded-xl" />
                <div>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{car.title}</h4>
                  <p className="text-sm font-extrabold text-[#FF8C00]">{formatETB(car.price)}</p>
                </div>
                <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
                  <Link to={`/car/${car.id}`} className="text-[#FF8C00] hover:underline font-semibold">
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteListing(car.id)}
                    className="text-red-400 hover:text-red-300 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test Drives Table */}
      {testDrives.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF8C00]" />
            <span>Showroom Test Drive Schedules</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#111827]">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date &amp; Time</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {testDrives.map(td => (
                  <tr key={td.id}>
                    <td className="p-3 font-semibold text-white">{td.carTitle}</td>
                    <td className="p-3">{td.fullName}</td>
                    <td className="p-3 font-mono">{td.phone}</td>
                    <td className="p-3">{td.preferredDate} at {td.preferredTime}</td>
                    <td className="p-3 text-emerald-400 font-bold">{td.status}</td>
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
