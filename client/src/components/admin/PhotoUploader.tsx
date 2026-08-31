import React, { useState, useRef } from "react";
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
