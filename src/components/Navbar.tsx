import { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Phone, ShieldCheck, KeyRound, Sliders } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { generateDirectContactWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateCategory: (category: string) => void;
  isOwnerMode: boolean;
  onOpenOwnerAuth: () => void;
  onOpenPriceManager: () => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  isOwnerMode,
  onOpenOwnerAuth,
  onOpenPriceManager
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Categories', href: '#categories' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Special Offer', href: '#special-offer' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-slate-950/70 backdrop-blur-sm border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Single element wordmark brand */}
        <div
          onClick={(e) => {
            // Secret admin trigger: 3 rapid clicks on the logo
            if (e.detail === 3) {
              onOpenOwnerAuth();
            }
          }}
          className="cursor-pointer select-none"
        >
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Azeem Trader
            </span>
            <span className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20 animate-pulse"></span>
          </a>
        </div>

        {/* Zone 2: 4-6 text links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Price Manager button ONLY when admin is logged in */}
          {isOwnerMode && (
            <button
              onClick={onOpenPriceManager}
              title="Admin Price Control Center"
              className="px-2.5 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/50 hover:bg-blue-900/80 text-blue-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Price Manager</span>
            </button>
          )}

          {/* Cart / Inquiry tray trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Order Inquiries"
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200 hover:text-white transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Order Basket</span>
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick WhatsApp Action */}
          <a
            href={generateDirectContactWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            {/* Owner button in mobile drawer ONLY when admin is logged in */}
            {isOwnerMode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPriceManager();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-950/80 text-blue-300 border border-blue-500/40 text-xs font-semibold cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Price Manager (Admin)</span>
              </button>
            )}

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
            <a
              href={generateDirectContactWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp: {STORE_INFO.phone}</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Civil Colony, Kohat Road, Peshawar</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
