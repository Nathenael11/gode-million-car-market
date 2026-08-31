import React, { useState } from "react";
import { Calculator, CheckCircle2, ShieldAlert, PhoneCall } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { formatETB } from "../utils/formatters";

export const FinancingCalculator: React.FC = () => {
  const { language } = useLanguage();

  const [price, setPrice] = useState<number>(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanTermYears, setLoanTermYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(16.5);

  const downPayment = (price * downPaymentPercent) / 100;
  const principal = price - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPayment =
    monthlyInterestRate > 0
      ? (principal *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
      : principal / totalMonths;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {language === "am" ? "???? ??? ??? ???" : "Ethiopian Auto Loan Financing Calculator"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {language === "am"
            ? "?????? ??? ??? (CBE)? ??? ??? ?? ??? ??? ???? ???? ??? ???? ???? ???? ??? ???"
            : "Estimate your monthly auto loan installments in Ethiopian Birr (ETB) with standard Ethiopian bank rates."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Vehicle Price (ETB): <span className="text-slate-900 font-black">{formatETB(price)}</span>
            </label>
            <input
              type="range"
              min={1000000}
              max={25000000}
              step={100000}
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-[#FF8C00]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Down Payment ({downPaymentPercent}%): <span className="text-orange-600 font-black">{formatETB(downPayment)}</span>
            </label>
            <input
              type="range"
              min={20}
              max={70}
              step={5}
              value={downPaymentPercent}
              onChange={e => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#FF8C00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Loan Term (Years)</label>
              <select
                value={loanTermYears}
                onChange={e => setLoanTermYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value={1}>1 Year (12 months)</option>
                <option value={2}>2 Years (24 months)</option>
                <option value={3}>3 Years (36 months)</option>
                <option value={5}>5 Years (60 months)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Annual Interest Rate (%)</label>
              <select
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF8C00]"
              >
                <option value={15.5}>15.5% (CBE Special Rate)</option>
                <option value={16.5}>16.5% (Standard Commercial)</option>
                <option value={18.0}>18.0% (Private Bank Rate)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Preview */}
        <div className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-6">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Estimated Monthly Payment</span>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              {formatETB(Math.round(monthlyPayment))} <span className="text-xs text-slate-400 font-normal">/ mo</span>
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Loan Amount:</span>
              <span className="font-bold text-slate-900">{formatETB(principal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Down Payment Required:</span>
              <span className="font-bold text-orange-600">{formatETB(downPayment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Repayment Period:</span>
              <span className="font-bold text-slate-900">{totalMonths} Months</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="tel:+251911223344"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:brightness-105 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Inquire for Bank Assistance</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
