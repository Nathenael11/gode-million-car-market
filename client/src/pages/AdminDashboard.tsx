import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Users, Car, MessageSquare, Calendar, Trash2, CheckCircle2, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { apiRequest } from "../utils/api";
import { formatETB } from "../utils/formatters";
import { CarItem } from "../components/car/CarCard";

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [cars, setCars] = useState<CarItem[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    const loadAdminData = async () => {
      try {
        const [statsRes, carsRes, usersRes] = await Promise.all([
          apiRequest("/admin/stats"),
          apiRequest("/cars"),
          apiRequest("/admin/users")
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (carsRes.success) setCars(carsRes.data);
        if (usersRes.success) setUsersList(usersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAdminData();
  }, [user, navigate]);

  const handleDeleteCar = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing from the system?")) return;
    try {
      await apiRequest(`/cars/${id}`, { method: "DELETE" });
      setCars(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-400">Loading admin panel...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-950/40 via-[#111827] to-gray-900 border border-[#FF8C00]/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FF8C00] text-gray-950 font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Gode &amp; Million Admin Control Panel
            </h1>
            <p className="text-xs text-gray-400">Addis Ababa Bole Rwanda Platform Overview</p>
          </div>
        </div>

        <Link
          to="/sell"
          className="px-4 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs shadow-md"
        >
          + Add Showroom Car
        </Link>
      </div>

      {/* Metrics Grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
            <span className="text-xs text-gray-400">Total Listings</span>
            <p className="text-2xl font-black text-white mt-1">{stats.totalListings}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
            <span className="text-xs text-gray-400">Registered Users</span>
            <p className="text-2xl font-black text-white mt-1">{stats.totalUsers}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
            <span className="text-xs text-gray-400">Total Inquiries</span>
            <p className="text-2xl font-black text-[#FF8C00] mt-1">{stats.totalInquiries}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800">
            <span className="text-xs text-gray-400">Total Valuation</span>
            <p className="text-lg font-black text-emerald-400 mt-1 truncate">{formatETB(stats.totalValuationETB)}</p>
          </div>
        </div>
      )}

      {/* Manage Listings Table */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Car className="w-5 h-5 text-[#FF8C00]" />
          <span>Vehicle Moderation &amp; Inventory Management</span>
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#111827]">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Price (ETB)</th>
                <th className="p-3">Fuel / EV</th>
                <th className="p-3">Seller</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {cars.map(c => (
                <tr key={c.id}>
                  <td className="p-3 font-semibold text-white">
                    <div className="flex items-center gap-2.5">
                      <img src={c.images[0]} alt="" className="w-10 h-8 object-cover rounded-lg" />
                      <span className="truncate max-w-[200px]">{c.title}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-[#FF8C00] font-bold">{formatETB(c.price)}</td>
                  <td className="p-3">{c.fuelType}</td>
                  <td className="p-3">{c.seller?.name || "Direct Showroom"}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link to={`/car/${c.id}`} className="text-blue-400 hover:underline">
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteCar(c.id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
