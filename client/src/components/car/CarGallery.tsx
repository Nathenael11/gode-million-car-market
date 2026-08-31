import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Car as CarIcon } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  title: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=70";

export const CarGallery: React.FC<CarGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const imageList = images && images.length > 0
    ? images
    : [FALLBACK_IMAGE];

  const handlePrev = () => {
    setImgLoaded(false);
    setActiveIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImgLoaded(false);
    setActiveIndex(prev => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main viewport */}
      <div className="relative h-[320px] sm:h-[440px] md:h-[480px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
            <CarIcon className="w-12 h-12 text-slate-400" />
          </div>
        )}
        <img
          src={imageList[activeIndex] || FALLBACK_IMAGE}
          alt={`${title} - view ${activeIndex + 1}`}
          loading="eager"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            setImgLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Controls */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/90 border border-slate-200 text-slate-800 hover:bg-[#FF8C00] hover:text-white transition shadow-md opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/90 border border-slate-200 text-slate-800 hover:bg-[#FF8C00] hover:text-white transition shadow-md opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          onClick={() => setModalOpen(true)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 text-slate-800 hover:bg-[#FF8C00] hover:text-white transition shadow-md"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-mono text-white font-bold">
          {activeIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setImgLoaded(false);
                setActiveIndex(idx);
              }}
              className={`relative w-20 h-16 shrink-0 rounded-2xl overflow-hidden border-2 transition ${
                activeIndex === idx
                  ? "border-[#FF8C00] shadow-md shadow-orange-500/20"
                  : "border-slate-200 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white text-slate-900 hover:bg-[#FF8C00] hover:text-white transition font-bold"
          >
            ?
          </button>
          <img
            src={imageList[activeIndex] || FALLBACK_IMAGE}
            alt="Fullscreen view"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
