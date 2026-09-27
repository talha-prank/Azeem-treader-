import { MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { generateDirectContactWhatsAppUrl } from '../utils/whatsapp';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <a
        href={generateDirectContactWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Azeem Trader on WhatsApp at ${STORE_INFO.phone}`}
        className="group relative flex items-center gap-2 px-3.5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xl shadow-emerald-950/60 transition-all hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp 03195411421
        </span>
      </a>
    </div>
  );
}
