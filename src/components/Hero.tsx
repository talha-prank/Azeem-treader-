import { ShoppingBag, PhoneCall, Sparkles, CheckCircle2, Zap, Shield, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onContactClick: () => void;
}

export function Hero({ onShopClick, onContactClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Store Location Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-300 text-xs font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Kohat Road, Peshawar · Walk-in Store & Delivery</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Power Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">
                Mobile Life
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Premium mobile accessories, trusted quality, and everyday technology — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Accessories</span>
              </button>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-150 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Required Small Trust Message */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs sm:text-sm font-medium text-slate-400 flex items-center justify-center lg:justify-start flex-wrap gap-x-2 gap-y-1">
                <span className="text-slate-200">Quality Accessories</span>
                <span className="text-blue-500">·</span>
                <span className="text-slate-200">Competitive Prices</span>
                <span className="text-blue-500">·</span>
                <span className="text-slate-200">Customer Satisfaction</span>
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 to-sky-400/20 blur-xl opacity-75"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src="/src/assets/images/hero_mobile_accessories_1790497677004.jpg"
                    alt="Azeem Trader Premium Mobile Accessories Collection"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback gracefully if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle dark gradient scrim at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* High-tech overlay badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-semibold text-blue-300">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>2026 Pro Accessories</span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-300 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800">
                    <span className="font-medium text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-400" /> Fast Chargers & Audio
                    </span>
                    <span className="text-slate-400 text-[11px]">Ready in Peshawar</span>
                  </div>
                </div>

                {/* Sub-strip with quick highlights */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 p-3.5 bg-slate-900/95 text-center text-xs">
                  <div>
                    <span className="block font-semibold text-white">100% Tested</span>
                    <span className="text-[11px] text-slate-400">Guaranteed</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Peshawar Fast</span>
                    <span className="text-[11px] text-slate-400">Direct Pickup</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-white">WhatsApp Order</span>
                    <span className="text-[11px] text-slate-400">Instant Reply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
