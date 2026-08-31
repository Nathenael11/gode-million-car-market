import React from "react";
import { X, QrCode, Smartphone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  carTitle: string;
  url?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  carTitle,
  url = window.location.href
}) => {
  const { language } = useLanguage();
  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url)}&color=FF8C00&bgcolor=0B0F17`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm p-6 bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex p-3 mb-4 rounded-xl bg-[#FF8C00]/10 text-[#FF8C00]">
          <QrCode className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          {language === "am" ? "ፈጣን የስልክ QR ኮድ" : "Instant Mobile QR Code"}
        </h3>
        <p className="text-xs text-gray-400 mb-5 line-clamp-1">{carTitle}</p>

        <div className="flex justify-center p-4 bg-[#0B0F17] rounded-xl border border-gray-800 shadow-inner mb-4">
          <img
            src={qrImageUrl}
            alt={`QR Code for ${carTitle}`}
            className="w-48 h-48 rounded-lg"
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Smartphone className="w-4 h-4 text-[#FF8C00]" />
          <span>
            {language === "am"
              ? "በስልክዎ ካሜራ ስካን በማድረግ በቀጥታ ይመልከቱ"
              : "Scan with camera to view & share directly on mobile"}
          </span>
        </div>
      </div>
    </div>
  );
};
