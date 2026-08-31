import React, { useState } from "react";
import { X, Calculator, Percent, Calendar } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { formatETB } from "../../utils/formatters";

interface FinancingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehiclePrice: number;
}

export const FinancingCalculatorModal: React.FC<FinancingCalculatorModalProps> = ({
  isOpen,
  onClose,
  vehiclePrice
}) => {
  const { language } = useLanguage();
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30% standard CBE
  const [interestRate, setInterestRate] = useState<number>(14.5); // 14.5% standard bank rate in Ethiopia
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36); // 3 years

  if (!isOpen) return null;

  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const loanPrincipal = Math.max(0, vehiclePrice - downPaymentAmount);
  const monthlyInterestRate = (interestRate / 100) / 12;
  
  const monthlyPayment = loanPrincipal > 0 && loanTermMonths > 0
    ? (loanPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 bg-[#111827] border border-gray-800 rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-xl bg-[#FF8C00]/10 text-[#FF8C00]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {language === "am" ? "የኢትዮጵያ ባንኮች የብድር ማስያዣ" : "Ethiopian Auto Loan Calculator"}
            </h3>
            <p className="text-xs text-gray-400">
              {language === "am" ? "በኢትዮጵያ ንግድ ባንክ እና አዋሽ ባንክ ተመን መሰረት" : "Based on CBE & Private Ethiopian Bank Rates"}
            </p>
          </div>
        </div>

        {/* Calculated result banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-[#FF8C00]/40 text-center mb-6 shadow-inner">
          <span className="text-xs text-gray-400 font-medium">
            {language === "am" ? "የወር ክፍያ ግምት" : "Estimated Monthly Payment"}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#FF8C00] my-1">
            {formatETB(Math.round(monthlyPayment))} <span className="text-xs font-normal text-gray-400">/ month</span>
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-2">
            <span>Down Payment: <strong className="text-white font-mono">{formatETB(Math.round(downPaymentAmount))}</strong></span>
            <span>Loan: <strong className="text-white font-mono">{formatETB(Math.round(loanPrincipal))}</strong></span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-semibold text-gray-300 mb-1.5">
              <span>{language === "am" ? "የቅድመ ክፍያ መቶኛ" : "Down Payment Percentage"}</span>
              <span className="text-[#FF8C00] font-bold">{downPaymentPercent}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={e => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#FF8C00]"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-gray-300 mb-1.5">
              <span>{language === "am" ? "የብድር ጊዜ (ወራት)" : "Loan Term"}</span>
              <span className="text-[#FF8C00] font-bold">{loanTermMonths} Months ({(loanTermMonths / 12).toFixed(1)} Yrs)</span>
            </div>
            <input
              type="range"
              min="12"
              max="60"
              step="6"
              value={loanTermMonths}
              onChange={e => setLoanTermMonths(Number(e.target.value))}
              className="w-full accent-[#FF8C00]"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-gray-300 mb-1.5">
              <span>{language === "am" ? "የወለድ መጠን" : "Annual Interest Rate"}</span>
              <span className="text-[#FF8C00] font-bold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="22"
              step="0.5"
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#FF8C00]"
            />
          </div>
        </div>

        <p className="text-[11px] text-gray-500 mt-5 leading-relaxed text-center">
          * Note: Final loan approval and exact interest rates depend on Ethiopian bank terms and credit evaluation.
        </p>
      </div>
    </div>
  );
};
