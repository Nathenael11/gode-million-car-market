import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { EthiopianMap } from "../components/common/EthiopianMap";

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {language === "am" ? "ያግኙን / ሾውሩማችንን ይጎብኙ" : "Contact Gode & Million Showroom"}
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1">
          {language === "am"
            ? "ለማንኛውም የመኪና ግዢ፣ ሽያጭ ወይም የቴክኒክ ምርመራ ጥያቄዎች ያነጋግሩን"
            : "Get in touch for inquiries, test drives, vehicle valuations, or visit us in Bole Rwanda."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Thank you! Your message has been received.</h3>
              <p className="text-xs text-gray-400">Our Bole Rwanda team will reach out promptly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Abebe Kebede"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Ethiopian Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+251-9X-XXX-XXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you today?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#FF8C00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-gray-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="md:col-span-6 space-y-4 text-xs">
          <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Direct Contacts</h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF8C00]" />
                <span className="font-mono font-semibold">+251-91-122-3344 / +251-91-234-5678</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF8C00]" />
                <span>info@godemillion.et</span>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#FF8C00]" />
                <span>Bole Rwanda, Near Edna Mall Road, Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#FF8C00]" />
                <span>Mon - Sat: 8:30 AM - 6:30 PM EAT</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <EthiopianMap />
    </div>
  );
};
