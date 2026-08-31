import React from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md p-8 rounded-3xl bg-[#111827] border border-gray-800 shadow-2xl space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] flex items-center justify-center mx-auto">
          <Car className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">404</h1>
        <h2 className="text-base font-bold text-gray-200">Page Not Found</h2>
        <p className="text-xs text-gray-400">The road ends here. Return to the showroom homepage.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs shadow-md"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};
