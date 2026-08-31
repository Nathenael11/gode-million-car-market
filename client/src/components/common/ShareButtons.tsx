import React, { useState } from "react";
import { Send, MessageCircle, Copy, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title: string;
  price?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url = window.location.href,
  title,
  price
}) => {
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(`${title} ${price ? `(${price})` : ""} - Available at Gode and Million Car Market, Bole Rwanda, Addis Ababa 🇪🇹: `);
  const encodedUrl = encodeURIComponent(url);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors"
        title="Share on Telegram"
      >
        <Send className="w-4 h-4" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      {/* Facebook SVG */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-lg bg-blue-600/10 border border-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
        title="Share on Facebook"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={copyToClipboard}
        className="p-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-[#FF8C00] hover:border-[#FF8C00]/40 transition-colors"
        title="Copy Link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};
