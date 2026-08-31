import React from "react";

interface EthiopianBadgeProps {
  type: "dutyPaid" | "dutyFree" | "comingSoon" | "verified" | "plate";
  text?: string;
  className?: string;
}

export const EthiopianBadge: React.FC<EthiopianBadgeProps> = ({ type, text, className = "" }) => {
  if (type === "dutyFree") return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {text || "EV Duty-Free (ቀረጥ ነፃ)"}
    </span>
  );
  if (type === "dutyPaid") return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-blue-50 border border-blue-200 text-blue-700 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      {text || "Duty Paid (ቀረጥ የተከፈለ)"}
    </span>
  );
  if (type === "comingSoon") return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-amber-50 border border-amber-300 text-amber-800 ${className}`}>
      <span>&#9889;</span>
      {text || "Coming Soon (በቅርብ)"}
    </span>
  );
  if (type === "verified") return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-orange-50 border border-orange-200 text-orange-700 ${className}`}>
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
      {text || "120-Point Inspected"}
    </span>
  );
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-gray-100 text-gray-800 border border-gray-200 ${className}`}>
      {text || "Code 2"}
    </span>
  );
};
