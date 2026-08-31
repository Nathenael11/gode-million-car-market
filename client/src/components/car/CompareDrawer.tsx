import React from "react";
import { Link } from "react-router-dom";
import { Scale, ArrowRight } from "lucide-react";
import { useCompare } from "../../context/CompareContext";
import { useLanguage } from "../../context/LanguageContext";

export const CompareDrawer: React.FC = () => {
  const { compareList, clearCompare } = useCompare();
  const { language } = useLanguage();
  if (compareList.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex items-center gap-3 p-3.5 px-5 bg-white border border-gray-200 rounded-2xl shadow-xl text-gray-900">
        <div className="p-2 rounded-xl bg-orange-100 text-[#FF8C00]">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold">
            {language === "am" ? `${compareList.length} መኪናዎች ተመርጠዋል` : `${compareList.length} Cars Selected`}
          </p>
          <button onClick={clearCompare} className="text-[10px] text-gray-400 hover:text-red-500 transition font-semibold">
            {language === "am" ? "ሁሉንም አጽዳ" : "Clear all"}
          </button>
        </div>
        <Link to="/compare"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF8C00] text-white font-bold text-xs shadow-md shadow-orange-200 hover:bg-[#E07B00] transition">
          <span>{language === "am" ? "አነጻጽር" : "Compare"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
