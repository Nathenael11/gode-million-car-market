import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Car, TrendingUp, PlusCircle, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";
import { formatETB } from "../utils/formatters";
import { CarItem } from "../components/car/CarCard";
import { PhotoUploader } from "../components/admin/PhotoUploader";

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Add car modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [newCar, setNewCar] = useState({
    title: "", titleAm: "", make: "Toyota", model: "", year: 2024,
    price: 4500000, fuelType: "Petrol", transmission: "Automatic",
    mileage: 0, condition: "Brand New", customsStatus: "Duty Paid",
    plateCode: "Code 2", description: "", descriptionAm: "", isFeatured: true
  });

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/dashboard"); return; }
    const load = async () => {
      try {
        const [sRes, cRes] = await Promise.all([apiRequest("/admin/stats"), apiRequest("/cars")]);
        if (sRes.success) setStats(sRes.data);
        if (cRes.success) setCars(cRes.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [user, navigate]);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this car from the showroom?")) return;
    try {
      await apiRequest(`/cars/${id}`, { method: "DELETE" });
      setCars(p => p.filter(c => c.id !== id));
    } catch (e: any) { alert(e.message); }
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrls.length === 0) { setAddError("Please add at least one photo."); return; }
    setAddLoading(true); setAddError("");
    try {
      const payload = {
        ...newCar,
        images: photoUrls.map(u => u.startsWith("/uploads/") ? window.location.origin + u : u),
        seller: { id: user!.id, name: user!.name, phone: "+251-91-122-3344", location: "Bole Rwanda Showroom" }
      };
      const res = await apiRequest("/cars", { method: "POST", body: JSON.stringify(payload) });
      if (res.success) {
        setCars(p => [res.data, ...p]);
        setAddSuccess(true);
        setTimeout(() => { setShowAddModal(false); setAddSuccess(false); setPhotoUrls([]); }, 1500);
      }
    } catch (err: any) {
      setAddError(err.message || "Failed to add car.");
    } finally { setAddLoading(false); }
  };

  const upd = (k: string, v: any) => setNewCar(p => ({ ...p, [k]: v }));

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading admin panel...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Admin Panel — Gode & Million</h1>
            <p className="text-xs text-gray-500">Bole Rwanda Showroom Management</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-md shadow-orange-200 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Car (Camera / File)</span>
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Listings", value: stats.totalListings, color: "text-gray-900" },
            { label: "Registered Users", value: stats.totalUsers, color: "text-gray-900" },
            { label: "Inquiries", value: stats.totalInquiries, color: "text-[#FF8C00]" },
            { label: "Showroom Value", value: formatETB(stats.totalValuationETB), color: "text-emerald-700" },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
              <p className="text-xs text-gray-500 font-semibold">{s.label}</p>
              <p className={`text-xl font-black mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Cars table */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Car className="w-5 h-5 text-[#FF8C00]" />
          <span>Inventory ({cars.length} vehicles)</span>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Fuel</th>
                <th className="px-4 py-3">Seller</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cars.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={c.images[0]} alt="" className="w-12 h-9 object-cover rounded-lg border border-gray-100" />
                      <span className="font-semibold text-gray-900 truncate max-w-[180px]">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-gray-900">{formatETB(c.price)}</td>
                  <td className="px-4 py-3">{c.fuelType}</td>
                  <td className="px-4 py-3">{c.seller?.name || "Showroom"}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link to={`/car/${c.id}`} className="text-blue-600 font-semibold hover:underline">View</Link>
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 font-semibold hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add Car Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-black text-gray-900">Add New Vehicle to Showroom</h3>
                <p className="text-xs text-gray-500 mt-0.5">Upload photos from your camera or computer</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCar} className="p-6 space-y-5">
              <PhotoUploader onPhotosChange={setPhotoUrls} />

              {addError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {addError}
                </div>
              )}
              {addSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Car added to showroom!
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">Title *</label>
                  <input required value={newCar.title} onChange={e => upd("title", e.target.value)}
                    placeholder="e.g. 2024 Toyota Land Cruiser"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Make</label>
                  <select value={newCar.make} onChange={e => upd("make", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                    <option>Toyota</option><option>Hyundai</option><option>Isuzu</option>
                    <option>Volkswagen</option><option>Suzuki</option><option>BYD</option><option>Nissan</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Model *</label>
                  <input required value={newCar.model} onChange={e => upd("model", e.target.value)}
                    placeholder="Land Cruiser, Prado..."
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Year</label>
                  <input type="number" min={1995} max={2026} value={newCar.year} onChange={e => upd("year", Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price (ETB)</label>
                  <input type="number" min={100000} step={50000} value={newCar.price} onChange={e => upd("price", Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Fuel Type</label>
                  <select value={newCar.fuelType} onChange={e => upd("fuelType", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                    <option>Petrol</option><option>Diesel</option><option>Electric</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Mileage (km)</label>
                  <input type="number" value={newCar.mileage} onChange={e => upd("mileage", Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
                <div className="col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">Description</label>
                  <textarea rows={2} value={newCar.description} onChange={e => upd("description", e.target.value)}
                    placeholder="Vehicle notes for buyers..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={addLoading}
                  className="flex-2 flex-grow py-3 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-md shadow-orange-200 transition disabled:opacity-50">
                  {addLoading ? "Saving..." : "Add to Showroom"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
