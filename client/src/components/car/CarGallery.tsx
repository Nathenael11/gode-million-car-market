import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  title: string;
}

export const CarGallery: React.FC<CarGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const imageList = images && images.length > 0
    ? images
    : ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"];

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main viewport */}
      <div className="relative h-[320px] sm:h-[440px] md:h-[480px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group">
        <img
          src={imageList[activeIndex]}
          alt={`${title} - view ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Controls */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gray-950/70 border border-gray-800 text-white hover:bg-[#FF8C00] hover:text-gray-950 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gray-950/70 border border-gray-800 text-white hover:bg-[#FF8C00] hover:text-gray-950 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          onClick={() => setModalOpen(true)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-gray-950/70 text-white hover:bg-[#FF8C00] hover:text-gray-950 transition"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-gray-950/80 backdrop-blur-md text-xs font-mono text-gray-300">
          {activeIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                activeIndex === idx
                  ? "border-[#FF8C00] shadow-md shadow-orange-500/20"
                  : "border-gray-800 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-gray-900 text-white hover:bg-[#FF8C00] hover:text-gray-950 transition"
          >
            ✕
          </button>
          <img
            src={imageList[activeIndex]}
            alt="Fullscreen view"
            className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
