import React, { useState } from "react";
import { Calculator, Landmark, ShieldCheck, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { formatETB } from "../utils/formatters";

export const FinancingCalculator: React.FC = () => {
  const { language } = useLanguage();

  const [vehiclePrice, setVehiclePrice] = useState<number>(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(14.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36);

  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const loanPrincipal = Math.max(0, vehiclePrice - downPaymentAmount);
  const monthlyInterestRate = (interestRate / 100) / 12;

  const monthlyPayment = loanPrincipal > 0 && loanTermMonths > 0
    ? (loanPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-3">
          <Landmark className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {language === "am" ? "የኢትዮጵያ ባንኮች የመኪና ብድር ማስያዣ" : "Ethiopian Auto Loan & Financing Calculator"}
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1">
          {language === "am"
            ? "በኢትዮጵያ ንግድ ባንክ (CBE)፣ አዋሽ ባንክ እና ዳሽን ባንክ የወለድ ተመን መሰረት ወርሃዊ ክፍያዎን ያሰሉ"
            : "Estimate your monthly vehicle payments with Commercial Bank of Ethiopia (CBE), Awash Bank, and Telebirr financing."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-2xl space-y-5 text-xs">
          <div>
            <label className="font-semibold text-gray-300 block mb-1">
              {language === "am" ? "የመኪና ዋጋ (በብር)" : "Vehicle Price (ETB)"}
            </label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={e => setVehiclePrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white font-mono focus:outline-none focus:border-[#FF8C00]"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-gray-300 mb-1.5">
              <span>{language === "am" ? "የቅድመ ክፍያ መቶኛ" : "Down Payment (%)"}</span>
              <span className="text-[#FF8C00] font-bold">{downPaymentPercent}% ({formatETB(Math.round(downPaymentAmount))})</span>
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
              <span>{language === "am" ? "የብድር ጊዜ (ወራት)" : "Loan Period (Months)"}</span>
              <span className="text-[#FF8C00] font-bold">{loanTermMonths} Months ({(loanTermMonths / 12).toFixed(1)} Years)</span>
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
              <span>{language === "am" ? "ዓመታዊ የወለድ ተመን" : "Annual Bank Interest Rate (%)"}</span>
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

        {/* Results Overview */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-[#111827] border border-emerald-500/40 shadow-2xl space-y-4 text-center">
            <span className="text-xs text-gray-400 block mb-1">
              {language === "am" ? "የወር ክፍያ ግምት" : "Estimated Monthly Installment"}
            </span>
            <p className="text-3xl sm:text-4xl font-black text-emerald-400">
              {formatETB(Math.round(monthlyPayment))} <span className="text-xs text-gray-400 font-normal">/ month</span>
            </p>

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-800 text-xs">
              <div className="p-3 rounded-xl bg-gray-900 text-left">
                <span className="text-gray-400 block">Down Payment</span>
                <span className="font-bold text-white font-mono">{formatETB(Math.round(downPaymentAmount))}</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-900 text-left">
                <span className="text-gray-400 block">Principal Loan</span>
                <span className="font-bold text-white font-mono">{formatETB(Math.round(loanPrincipal))}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-xs text-gray-400 space-y-2">
            <p className="font-semibold text-gray-300">Required Bank Documents in Ethiopia:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Ethiopian Kebele ID or Passport / Resident ID</li>
              <li>Proof of Income / 6-Month Bank Statement</li>
              <li>Vehicle Proforma Invoice from Gode &amp; Million</li>
              <li>Comprehensive Motor Insurance from Nyala / NIC</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
