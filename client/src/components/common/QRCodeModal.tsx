import React, { useState } from "react";
import { X, QrCode, Smartphone, Copy, Check, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  url?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  title = "Gode & Million Car Market (ጎዴ እና ሚሊየን)",
  url = window.location.origin
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetUrl = url || "https://gode-million-car-market.onrender.com";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}&color=0F172A&bgcolor=FFFFFF&margin=1`;

  const copyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `gode-million-qr-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      window.open(qrImageUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm p-6 sm:p-8 bg-white border border-gray-200 rounded-3xl shadow-2xl text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 text-[#FF8C00] flex items-center justify-center shadow-md shadow-orange-100">
          <QrCode className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900">
            {language === "am" ? "የስልክ QR ኮድ ስካን" : "Instant Mobile QR Code"}
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-medium line-clamp-1">{title}</p>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner flex justify-center">
          <img
            src={qrImageUrl}
            alt="QR Code"
            className="w-48 h-48 rounded-xl object-contain bg-white p-2 shadow-xs"
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
          <Smartphone className="w-4 h-4 text-[#FF8C00]" />
          <span>
            {language === "am"
              ? "በስልክዎ ካሜራ ስካን በማድረግ በቀጥታ ይክፈቱ"
              : "Scan with your phone camera to open on mobile"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
            <span>{copied ? (language === "am" ? "ተቀድቷል" : "Copied!") : (language === "am" ? "ሊንክ ቅዳ" : "Copy Link")}</span>
          </button>

          <button
            onClick={downloadQR}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FF8C00] hover:bg-[#E07B00] text-white font-bold text-xs transition shadow-sm shadow-orange-200"
          >
            <Download className="w-4 h-4" />
            <span>{language === "am" ? "QR አውርድ" : "Save QR"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
