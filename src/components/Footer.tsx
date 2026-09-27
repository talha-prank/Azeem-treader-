import { Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { generateDirectContactWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  isOwnerMode?: boolean;
  onOpenOwnerAuth?: () => void;
  onOpenPriceManager?: () => void;
}

export function Footer({
  isOwnerMode = false,
  onOpenOwnerAuth,
  onOpenPriceManager
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Azeem Trader
              </span>
              <p className="text-xs text-blue-400 font-medium mt-0.5">
                Mobile Accessories
              </p>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Trusted destination in Peshawar for high-performance earbuds, high-capacity power banks, GaN fast chargers, and durable smartphone accessories.
            </p>
            <div className="text-slate-400 text-xs">
              <span>Managed by: </span>
              <strong className="text-slate-200">{STORE_INFO.owner}</strong>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-blue-400 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-blue-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Azeem Trader
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">
                  Wireless Earbuds & Audio
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">
                  Power Banks (10K - 30K mAh)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">
                  Fast Wall Chargers & GaN
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">
                  100W PD & Braided Cables
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-400 transition-colors">
                  Shockproof Cases & 9D Glass
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-white">
              Contact Store
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{STORE_INFO.phone}</span>
              </a>

              <a
                href={generateDirectContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {STORE_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${STORE_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{STORE_INFO.email}</span>
              </a>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <p>© 2026 Azeem Trader. All Rights Reserved.</p>
            <span aria-hidden="true">·</span>
            {isOwnerMode ? (
              <button
                onClick={onOpenPriceManager}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline underline-offset-2"
              >
                Owner Price Control (Azeem Ali)
              </button>
            ) : (
              <button
                onClick={onOpenOwnerAuth}
                className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Owner Price Access
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Peshawar, Pakistan</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
