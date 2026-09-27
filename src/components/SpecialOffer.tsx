import { ArrowRight, Sparkles, Zap, MessageCircle } from 'lucide-react';
import { generateDirectContactWhatsAppUrl } from '../utils/whatsapp';

interface SpecialOfferProps {
  onShopNow: () => void;
}

export function SpecialOffer({ onShopNow }: SpecialOfferProps) {
  return (
    <section id="special-offer" className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-950 p-8 sm:p-12 lg:p-14 shadow-2xl shadow-blue-950/30">
          {/* Background decorative glows */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & Offer Info */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Limited Stock Bundle Discounts</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Upgrade Your Mobile Setup Today
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Bundle any GaN Fast Charger with a 100W Braided Cable or ANC Earbuds and receive an exclusive package discount. Genuine quality accessories ready for same-day handover in Peshawar.
              </p>

              {/* Offer highlights */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>Free OTG Adapter with Cable Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Wholesale & Retail Pack Deals</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
              <button
                onClick={onShopNow}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={generateDirectContactWhatsAppUrl("Assalam-o-Alaikum Azeem Trader, I want to inquire about the special upgrade bundles and today's discount deals.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span>Ask Bundle Price on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
