import React from "react";

interface EthiopianBadgeProps {
  type: "dutyPaid" | "dutyFree" | "comingSoon" | "verified" | "plate";
  text?: string;
  className?: string;
}

export const EthiopianBadge: React.FC<EthiopianBadgeProps> = ({ type, text, className = "" }) => {
  if (type === "dutyFree") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{text || "EV Duty Free (ከቀረጥ ነፃ)"}</span>
      </span>
    );
  }

  if (type === "dutyPaid") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-400 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
        <span>{text || "Duty Paid (ቀረጥ የተከፈለ)"}</span>
      </span>
    );
  }

  if (type === "comingSoon") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 ${className}`}>
        <span>⚡</span>
        <span>{text || "በቅርብ ይመጣል (Coming Soon)"}</span>
      </span>
    );
  }

  if (type === "verified") {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#FF8C00]/15 border border-[#FF8C00]/40 text-[#FF8C00] ${className}`}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <span>{text || "120-Point Inspected"}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-semibold rounded bg-gray-800 text-gray-300 border border-gray-700 ${className}`}>
      {text || "Code 2"}
    </span>
  );
};
