import React from "react";
import { Link } from "react-router-dom";
import { Scale, X, ArrowRight } from "lucide-react";
import { useCompare } from "../../context/CompareContext";
import { useLanguage } from "../../context/LanguageContext";

export const CompareDrawer: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { language } = useLanguage();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce-in">
      <div className="flex items-center gap-3 p-3.5 px-5 bg-gray-900/95 border border-[#FF8C00] rounded-2xl shadow-2xl backdrop-blur-md text-white">
        <div className="p-2 rounded-xl bg-[#FF8C00]/20 text-[#FF8C00]">
          <Scale className="w-5 h-5" />
        </div>

        <div>
          <p className="text-xs font-bold">
            {language === "am"
              ? `${compareList.length} መኪናዎች ተመርጠዋል`
              : `${compareList.length} Cars in Comparison`}
          </p>
          <button
            onClick={clearCompare}
            className="text-[10px] text-gray-400 hover:text-red-400 transition"
          >
            {language === "am" ? "ሁሉንም አጽዳ" : "Clear all"}
          </button>
        </div>

        <Link
          to="/compare"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs shadow-md shadow-orange-500/20 hover:brightness-110 transition"
        >
          <span>{language === "am" ? "አነጻጽር" : "Compare"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
