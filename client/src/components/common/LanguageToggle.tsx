import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center p-1 bg-gray-900/90 border border-gray-800 rounded-full shadow-inner ${className}`}>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
          language === "en"
            ? "bg-[#FF8C00] text-gray-950 shadow-md shadow-orange-500/20"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <span>🇺🇸</span>
        <span>EN</span>
      </button>
      <button
        onClick={() => setLanguage("am")}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
          language === "am"
            ? "bg-[#FF8C00] text-gray-950 shadow-md shadow-orange-500/20"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <span>🇪🇹</span>
        <span>አማርኛ</span>
      </button>
    </div>
  );
};
