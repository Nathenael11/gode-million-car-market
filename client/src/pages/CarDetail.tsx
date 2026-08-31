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
  ChevronLeft
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
        <p className="text-xs text-gray-400">Loading car details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-[#111827] border border-gray-800 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Car Not Found</h2>
        <p className="text-xs text-gray-400">The vehicle you are looking for is no longer available.</p>
        <Link to="/inventory" className="inline-block px-5 py-2.5 rounded-xl bg-[#FF8C00] text-gray-950 font-bold text-xs">
          Back to Listings
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(car.id);
  const compared = isInCompare(car.id);
  const displayTitle = language === "am" && car.titleAm ? car.titleAm : car.title;
  const sellerPhone = car.seller?.phone || "+251-91-122-3344";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#FF8C00] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === "am" ? "ወደ መኪና ዝርዝር ተመለስ" : "Back to All Listings"}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <CarGallery images={car.images} title={displayTitle} />

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#111827] border border-gray-800">
            <div className="flex items-center gap-2">
              {car.isComingSoon && <EthiopianBadge type="comingSoon" />}
              {car.fuelType === "Electric" && <EthiopianBadge type="dutyFree" />}
              <EthiopianBadge type="verified" />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setQrOpen(true)}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-[#FF8C00] transition"
                title="Generate QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleWishlist(car.id)}
                className={`p-2.5 rounded-xl border transition ${
                  wishlisted
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-gray-900 border-gray-800 text-gray-300 hover:text-white"
                }`}
                title="Save Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={() => (compared ? removeFromCompare(car.id) : addToCompare(car.id))}
                className={`p-2.5 rounded-xl border transition ${
                  compared
                    ? "bg-[#FF8C00]/20 border-[#FF8C00] text-[#FF8C00]"
                    : "bg-gray-900 border-gray-800 text-gray-300 hover:text-white"
                }`}
                title="Compare"
              >
                <Scale className="w-4 h-4" />
              </button>

              <ShareButtons title={displayTitle} price={formatETB(car.price)} />
            </div>
          </div>

          <CarSpecs car={car} />
        </div>

        {/* Right Side Sticky Action Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-2xl space-y-5">
            <div>
              <span className="text-xs font-semibold text-[#FF8C00] uppercase tracking-wider">
                {car.make} • {car.year}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {displayTitle}
              </h1>
              <p className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span>{language === "am" && car.locationAm ? car.locationAm : car.location}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-400 block mb-0.5">
                {language === "am" ? "የመሸጫ ዋጋ" : "Asking Price"}
              </span>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl font-black text-[#FF8C00] tracking-tight">
                  {formatETB(car.price)}
                </p>
              </div>
              <span className="text-[11px] text-gray-400">
                {car.priceNegotiable ? (language === "am" ? "✅ ዋጋው ይነጋገራል" : "✅ Price Negotiable") : "Fixed Showroom Price"}
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`tel:${sellerPhone.replace(/[\s-]/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-xl shadow-orange-500/20 hover:brightness-110 transition"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callSeller} ({sellerPhone})</span>
              </a>

              <button
                onClick={() => setTestDriveOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs border border-gray-700 transition"
              >
                <Calendar className="w-4 h-4 text-[#FF8C00]" />
                <span>{t.bookTestDrive}</span>
              </button>

              <button
                onClick={() => setContactOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs border border-gray-700 transition"
              >
                <MessageSquare className="w-4 h-4 text-[#FF8C00]" />
                <span>{language === "am" ? "ጥያቄ ወይም መልእክት ይላኩ" : "Send Showroom Inquiry"}</span>
              </button>

              <button
                onClick={() => setFinancingOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30 transition"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === "am" ? "የባንክ ብድር አስላ (CBE / Awash)" : "Calculate Bank Loan (CBE / Awash)"}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <SimilarCars cars={allCars} currentCarId={car.id} />

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
        carTitle={displayTitle}
      />
    </div>
  );
};
