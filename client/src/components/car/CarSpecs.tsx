import React from "react";
import { CarItem } from "./CarCard";
import { useLanguage } from "../../context/LanguageContext";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Shield,
  Layers,
  Sparkles,
  MapPin
} from "lucide-react";
import { formatKM } from "../../utils/formatters";

interface CarSpecsProps {
  car: CarItem;
}

export const CarSpecs: React.FC<CarSpecsProps> = ({ car }) => {
  const { language, t } = useLanguage();

  const specRows = [
    { label: t.specMake, value: car.make, icon: Layers },
    { label: t.specModel, value: car.model, icon: Layers },
    { label: t.specYear, value: car.year.toString(), icon: Calendar },
    { label: t.specMileage, value: formatKM(car.mileage, language), icon: Gauge },
    { label: t.specFuel, value: language === "am" && car.fuelTypeAm ? car.fuelTypeAm : car.fuelType, icon: Fuel },
    { label: t.specTransmission, value: language === "am" && car.transmissionAm ? car.transmissionAm : car.transmission, icon: Settings2 },
    { label: t.specEngine, value: car.engineCapacity || "N/A", icon: Sparkles },
    { label: t.specColor, value: language === "am" && car.colorAm ? car.colorAm : car.color || "Standard", icon: Sparkles },
    { label: t.specPlateCode, value: car.plateCode || "Unregistered", icon: Shield },
    { label: t.specCustoms, value: car.customsStatus || "Duty Paid", icon: Shield },
    { label: t.specDoors, value: car.doors ? `${car.doors} Doors` : "4 Doors", icon: Layers },
    { label: t.specSeats, value: car.seats ? `${car.seats} Seats` : "5 Seats", icon: Layers }
  ];

  const features = language === "am" && car.featuresAm && car.featuresAm.length > 0
    ? car.featuresAm
    : (car.features || []);

  return (
    <div className="space-y-8">
      {/* Spec Grid */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-[#FF8C00]" />
          <span>{language === "am" ? "የቴክኒክ ዝርዝር መግለጫ" : "Technical Specifications"}</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {specRows.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-gray-900/70 border border-gray-800/80">
              <span className="text-[11px] text-gray-400 block mb-0.5">{item.label}</span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate block">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features & Options */}
      {features.length > 0 && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF8C00]" />
            <span>{t.specFeatures}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Description */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-3">
          {t.specDescription}
        </h3>
        <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
          {language === "am" && car.descriptionAm ? car.descriptionAm : car.description}
        </p>
      </div>
    </div>
  );
};
