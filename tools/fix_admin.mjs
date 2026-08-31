import fs from 'fs';
import path from 'path';
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); console.log('Wrote:', p.slice(p.indexOf('client'))); };
const B = path.resolve('.');

// ━━ Admin photo upload feature — camera + local file ━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/components/admin/PhotoUploader.tsx'), `import React, { useState, useRef } from "react";
import { Camera, Upload, X, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface PhotoUploaderProps {
  onPhotosChange: (urls: string[]) => void;
  existingUrls?: string[];
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotosChange, existingUrls = [] }) => {
  const [photos, setPhotos] = useState<string[]>(existingUrls);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const uploadToServer = async (base64: string, filename: string): Promise<string> => {
    const res = await fetch("/api/upload/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64, filename })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.url;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const base64 = await toBase64(file);
        const url = await uploadToServer(base64, file.name);
        newUrls.push(url);
      } catch (e) {
        console.error("Upload failed:", e);
      }
    }
    const updated = [...photos, ...newUrls];
    setPhotos(updated);
    onPhotosChange(updated);
    setUploading(false);
  };

  const removePhoto = (idx: number) => {
    const updated = photos.filter((_, i) => i !== idx);
    setPhotos(updated);
    onPhotosChange(updated);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-bold text-gray-700 mb-1">
        Vehicle Photos — Upload from phone, camera, or computer
      </label>

      {/* Upload buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Camera capture */}
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-[#FF8C00]/60 bg-orange-50 text-[#FF8C00] font-bold text-xs hover:bg-orange-100 transition disabled:opacity-50"
        >
          <Camera className="w-4 h-4" />
          <span>Take Photo</span>
        </button>

        {/* Local file */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-700 font-bold text-xs hover:bg-gray-100 transition disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          <span>Browse Files</span>
        </button>

        {uploading && (
          <div className="flex items-center gap-2 text-xs text-gray-500 animate-pulse">
            <div className="w-4 h-4 border-2 border-[#FF8C00] border-t-transparent rounded-full animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center bg-gray-50 cursor-pointer hover:border-[#FF8C00]/50 hover:bg-orange-50/30 transition"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-xs text-gray-500">
          Drag & drop photos here, or <span className="text-[#FF8C00] font-bold">click to browse</span>
        </p>
        <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP — max 10MB each</p>
      </div>

      {/* Photo preview grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {photos.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
              <img
                src={url.startsWith("data:") || url.startsWith("/uploads/")
                  ? url
                  : url}
                alt={"Photo " + (idx + 1)}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=200&q=60"; }}
              />
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-3 h-3" />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-[#FF8C00] text-white text-[9px] font-bold">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
`);

// ━━ SellCar with PhotoUploader ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/pages/SellCar.tsx'), `import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";
import { PhotoUploader } from "../components/admin/PhotoUploader";

export const SellCar: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    titleAm: "",
    make: "Toyota",
    model: "",
    year: 2022,
    price: 3500000,
    priceNegotiable: true,
    condition: "Slightly Used (Ethiopia)",
    bodyType: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: 25000,
    engineCapacity: "2.0L",
    color: "White",
    location: "Bole Rwanda, Addis Ababa",
    customsStatus: "Duty Paid",
    plateCode: "Code 2",
    description: "",
    descriptionAm: "",
  });

  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, val: any) => setFormData(p => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrls.length === 0) {
      setError("Please add at least one photo of the vehicle.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        images: photoUrls.map(u => u.startsWith("/uploads/") ? window.location.origin + u : u),
        seller: user
          ? { id: user.id, name: user.name, nameAm: user.nameAm, phone: user.phone, location: user.subCity || "Addis Ababa" }
          : { name: "Showroom Seller", phone: "+251-91-122-3344" }
      };

      const res = await apiRequest("/cars", { method: "POST", body: JSON.stringify(payload) });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => navigate(\`/car/\${res.data.id}\`), 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit vehicle listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-orange-100 text-[#FF8C00]">
          <PlusCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          {language === "am" ? "መኪናዎን ይሽጡ" : "Sell Your Car"}
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          {language === "am"
            ? "ዝርዝሩን ሞልተው ፎቶ ያስገቡ — ሾውሩማችን ለሺዎች ደንበኞች ያስተዋውቃል"
            : "Fill in the details and upload photos — we'll show your car to thousands of buyers across Addis Ababa"}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm mb-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold">Listing published! Redirecting to car page...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Photo Upload — First and most important */}
          <PhotoUploader onPhotosChange={setPhotoUrls} />

          <div className="border-t border-gray-100 pt-7">
            <p className="text-sm font-bold text-gray-900 mb-4">Vehicle Details</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Title (English) *</label>
                <input type="text" required value={formData.title}
                  onChange={e => update("title", e.target.value)}
                  placeholder="e.g. 2022 Toyota RAV4 Limited"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Title Amharic (አማርኛ)</label>
                <input type="text" value={formData.titleAm}
                  onChange={e => update("titleAm", e.target.value)}
                  placeholder="ምሳሌ፡ 2022 ቶዮታ ራቭ4 ሊሚትድ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Make</label>
                <select value={formData.make} onChange={e => update("make", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Isuzu">Isuzu</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="BYD">BYD EV</option>
                  <option value="Nissan">Nissan</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Model *</label>
                <input type="text" required value={formData.model}
                  onChange={e => update("model", e.target.value)}
                  placeholder="Corolla, Prado..."
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Year</label>
                <input type="number" min={1995} max={2026} value={formData.year}
                  onChange={e => update("year", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Price (ETB) *</label>
                <input type="number" required min={100000} step={50000} value={formData.price}
                  onChange={e => update("price", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Fuel Type</label>
                <select value={formData.fuelType} onChange={e => update("fuelType", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                  <option value="Petrol">Petrol (ቤንዚን)</option>
                  <option value="Diesel">Diesel (ናፍጣ)</option>
                  <option value="Electric">Electric EV</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Transmission</label>
                <select value={formData.transmission} onChange={e => update("transmission", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Mileage (km)</label>
                <input type="number" value={formData.mileage}
                  onChange={e => update("mileage", Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Plate Code</label>
                <input type="text" value={formData.plateCode}
                  onChange={e => update("plateCode", e.target.value)}
                  placeholder="Code 2 - B..."
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
              </div>
            </div>

            <div className="mt-4 text-xs">
              <label className="font-bold text-gray-700 block mb-1">Description (English)</label>
              <textarea rows={3} value={formData.description}
                onChange={e => update("description", e.target.value)}
                placeholder="Describe the car condition, history, and any extras..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
            </div>

            <div className="mt-3 text-xs">
              <label className="font-bold text-gray-700 block mb-1">Description Amharic (አማርኛ)</label>
              <textarea rows={2} value={formData.descriptionAm}
                onChange={e => update("descriptionAm", e.target.value)}
                placeholder="ስለ መኪናው ሁኔታ እና ታሪክ ያስረዱ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#FF8C00]" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-sm shadow-lg shadow-orange-200 transition disabled:opacity-50">
            {loading ? "Publishing..." : (language === "am" ? "መኪናውን ለሽያጭ አቅርብ" : "Publish Listing")}
          </button>
        </form>
      </div>
    </div>
  );
};
`);

// ━━ AdminDashboard with photo uploader ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
W(path.join(B, 'client/src/pages/AdminDashboard.tsx'), `import React, { useState, useEffect } from "react";
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
      await apiRequest(\`/cars/\${id}\`, { method: "DELETE" });
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
              <p className={\`text-xl font-black mt-1 \${s.color}\`}>{s.value}</p>
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
                    <Link to={\`/car/\${c.id}\`} className="text-blue-600 font-semibold hover:underline">View</Link>
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
`);

console.log('SellCar and AdminDashboard written');
