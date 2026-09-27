import { MapPin, User, ShieldCheck, HeartHandshake, Phone, ArrowUpRight } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Business Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authentic Tech Store in Peshawar</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              About Azeem Trader
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Founded and managed by <strong className="text-white font-semibold">Azeem Ali</strong>, Azeem Trader is dedicated to supplying high-grade mobile accessories and everyday technology solutions to tech lovers and smartphone users across Peshawar and Khyber Pakhtunkhwa.
              </p>
              <p>
                In a market filled with low-quality copies that damage smartphone batteries and stop working within weeks, Azeem Trader stands firm on rigorous quality checks. Whether it is an ultra-fast 65W GaN wall charger, a rugged braided data cable, or a high-fidelity pair of ANC wireless earbuds, each product is thoroughly tested before reaching our shelves.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                We believe in straightforward pricing, transparent specifications, and building authentic, long-term trust with every customer who visits our Civil Colony store or reaches out via WhatsApp.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div>
                <span className="font-display text-2xl font-bold text-white tabular-nums">100%</span>
                <p className="text-xs text-slate-400 mt-0.5">Tested Genuine Stock</p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white tabular-nums">10+</span>
                <p className="text-xs text-slate-400 mt-0.5">Accessory Categories</p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white tabular-nums">Fast</span>
                <p className="text-xs text-slate-400 mt-0.5">Peshawar Handover</p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Store Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {STORE_INFO.owner}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    Owner & Managing Director
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Azeem Trader · Peshawar
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm border-t border-slate-800/80 pt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs">Store Address:</span>
                    <span className="text-white font-medium">
                      {STORE_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs">Phone / WhatsApp:</span>
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-white font-semibold hover:text-blue-400 transition-colors"
                    >
                      {STORE_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs">Customer Philosophy:</span>
                    <span className="text-slate-300">
                      Direct owner assistance, transparent advice & checking warranty on select electronics.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>Locate Store on Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
