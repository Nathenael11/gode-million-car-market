import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Scale,
  QrCode,
  Calendar,
  Phone,
  MessageSquare,
  MapPin,
  Calculator,
  ChevronLeft,
  Share2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";
import { CarGallery } from "../components/car/CarGallery";
import { CarSpecs } from "../components/car/CarSpecs";
import { SimilarCars } from "../components/car/SimilarCars";
import { TestDriveModal } from "../components/forms/TestDriveModal";
import { ContactSellerModal } from "../components/forms/ContactSellerModal";
import { FinancingCalculatorModal } from "../components/forms/FinancingCalculatorModal";
import { QRCodeModal } from "../components/common/QRCodeModal";
import { ShareButtons } from "../components/common/ShareButtons";
import { EthiopianBadge } from "../components/common/EthiopianBadge";
import { formatETB } from "../utils/formatters";
import { apiRequest } from "../utils/api";
import { CarItem } from "../components/car/CarCard";

export const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const [car, setCar] = useState<CarItem | null>(null);
  const [allCars, setAllCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [financingOpen, setFinancingOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
      setLoading(true);
      try {
        const [singleRes, allRes] = await Promise.all([
          apiRequest(`/cars/${id}`),
          apiRequest("/cars")
        ]);

        if (singleRes.success && singleRes.data) {
          setCar(singleRes.data);
        }
        if (allRes.success && allRes.data) {
          setAllCars(allRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#FF8C00] border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-xs text-slate-500">
          {language === "am" ? "የመኪናው መረጃ እየተጫነ ነው..." : "Loading vehicle details..."}
        </p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          {language === "am" ? "መኪናው አልተገኘም" : "Car Not Found"}
        </h2>
        <p className="text-xs text-slate-500">
          {language === "am" ? "የፈለጉት መኪና በአሁኑ ሰዓት አይገኝም።" : "The vehicle you are looking for is no longer available."}
        </p>
        <Link to="/inventory" className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-white font-bold text-xs">
          {language === "am" ? "ወደ መኪኖች ዝርዝር ተመለስ" : "Back to Listings"}
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(car.id);
  const compared = isInCompare(car.id);
  const displayTitle = language === "am" && car.titleAm ? car.titleAm : car.title;
  const sellerPhone = car.seller?.phone || "+251-91-122-3344";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-28 lg:pb-8">
      {/* Top Breadcrumb & Mobile Back */}
      <div className="flex items-center justify-between">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#FF8C00] transition active:scale-95 shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === "am" ? "ተመለስ" : "Back to Inventory"}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setQrOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#FF8C00] transition active:scale-95 shadow-xs"
          >
            <QrCode className="w-4 h-4 text-[#FF8C00]" />
            <span className="hidden sm:inline">QR Code</span>
          </button>

          <button
            onClick={() => toggleWishlist(car.id)}
            className={`p-2 rounded-xl border transition active:scale-90 shadow-xs ${
              wishlisted
                ? "bg-red-50 border-red-200 text-red-500"
                : "bg-white border-slate-200 text-slate-700 hover:text-red-500"
            }`}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Gallery & Specs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <CarGallery images={car.images} title={displayTitle} />

          {/* Quick Stats Strip */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-2 flex-wrap">
            <EthiopianBadge />

            <div className="flex items-center gap-2">
              <button
                onClick={() => (compared ? removeFromCompare(car.id) : addToCompare(car.id))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  compared
                    ? "bg-[#FF8C00] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">{compared ? "In Compare" : "Compare"}</span>
              </button>

              <ShareButtons title={displayTitle} price={formatETB(car.price)} />
            </div>
          </div>

          <CarSpecs car={car} />
        </div>

        {/* Right Side Desktop Sticky Action Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-5">
            <div>
              <span className="text-xs font-bold text-[#FF8C00] uppercase tracking-wider">
                {car.make} • {car.year}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {displayTitle}
              </h1>
              <p className="flex items-center gap-1 text-xs text-slate-500 mt-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{language === "am" ? "ቦሌ ሩዋንዳ፣ አዲስ አበባ" : "Bole Rwanda, Addis Ababa"}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 block mb-0.5 font-semibold">
                {language === "am" ? "የተጠየቀው ዋጋ" : "Asking Price"}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {formatETB(car.price)}
              </p>
              <span className="text-[11px] text-[#FF8C00] font-bold">
                {car.priceNegotiable
                  ? (language === "am" ? "✓ ዋጋ ይደራደራል" : "✓ Price Negotiable")
                  : (language === "am" ? "የሾውሩም ቋሚ ዋጋ" : "Fixed Showroom Price")}
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`tel:${sellerPhone.replace(/[\s-]/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:brightness-105 transition active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callSeller} ({sellerPhone})</span>
              </a>

              <button
                onClick={() => setTestDriveOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 transition active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#FF8C00]" />
                <span>{t.bookTestDrive}</span>
              </button>

              <button
                onClick={() => setContactOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 transition active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#FF8C00]" />
                <span>{language === "am" ? "ለሾውሩም መልዕክት ይላኩ" : "Send Showroom Inquiry"}</span>
              </button>

              <button
                onClick={() => setFinancingOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition active:scale-95"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === "am" ? "የባንክ ብድር አስላ (CBE / Awash)" : "Calculate Bank Loan (CBE / Awash)"}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <SimilarCars cars={allCars} currentCarId={car.id} />

      {/* ── Sticky Mobile Bottom Action Bar (Appears on Phones Only) ── */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] p-3">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-slate-500 block leading-tight font-medium">
              {language === "am" ? "ዋጋ" : "Price"}
            </span>
            <p className="text-base font-black text-slate-900 leading-tight">
              {formatETB(car.price)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/251911223344?text=Hello%20Gode%20and%20Million%20Car%20Market,%20I%20am%20interested%20in%20this%20car"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl bg-green-50 text-green-700 border border-green-200 active:scale-95 shadow-sm"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href={`tel:${sellerPhone.replace(/[\s-]/g, "")}`}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#EA580C] text-white font-bold text-xs shadow-md shadow-orange-500/25 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>{language === "am" ? "ይደውሉ" : "Call Now"}</span>
            </a>

            <button
              onClick={() => setTestDriveOpen(true)}
              className="px-3 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs active:scale-95"
            >
              {language === "am" ? "ሙከራ" : "Test Drive"}
            </button>
          </div>
        </div>
      </div>

      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        carId={car.id}
        carTitle={displayTitle}
      />

      <ContactSellerModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        carId={car.id}
        carTitle={displayTitle}
        sellerPhone={sellerPhone}
      />

      <FinancingCalculatorModal
        isOpen={financingOpen}
        onClose={() => setFinancingOpen(false)}
        vehiclePrice={car.price}
      />

      <QRCodeModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        title={displayTitle}
        url={`https://gode-million-car-market.onrender.com/car/${car.id}`}
      />
    </div>
  );
};
