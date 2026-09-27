import { useEffect } from 'react';
import { X, MessageCircle, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw, Edit3 } from 'lucide-react';
import { Product, STORE_INFO } from '../data/products';
import { formatPricePKR, generateProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
  isOwnerMode?: boolean;
  onQuickEditPrice?: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isInCart = false,
  isOwnerMode = false,
  onQuickEditPrice
}: ProductDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/80 p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Product Media */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-blue-300">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1 text-slate-400">
              <div className="p-2 rounded-lg bg-slate-850 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <span>Verified Stock</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-850 border border-slate-800">
                <Truck className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <span>Peshawar Pickup</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-850 border border-slate-800">
                <RefreshCw className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span>Checking Days</span>
              </div>
            </div>
          </div>

          {/* Product Info & Purchase Module */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400 font-semibold">Available in Store</span>
              </div>
              <h2
                id="modal-product-title"
                className="font-display text-2xl font-bold text-white tracking-tight leading-snug"
              >
                {product.name}
              </h2>
            </div>

            {/* Price Row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
                  {formatPricePKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through tabular-nums">
                    {formatPricePKR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-blue-400 font-medium hidden sm:inline">Best Price in Peshawar</span>
              </div>

              {isOwnerMode && (
                <button
                  onClick={() => onQuickEditPrice?.(product)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Price</span>
                </button>
              )}
            </div>

            {/* Full Prose Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Technical Specifications
              </h4>
              <div className="rounded-xl border border-slate-800 divide-y divide-slate-800/80 bg-slate-950/50 text-xs">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-2 px-3">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="text-slate-200 font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="pt-2 space-y-2.5">
              <a
                href={generateProductWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order Now via WhatsApp ({STORE_INFO.phone})</span>
              </a>

              <button
                onClick={() => onAddToCart(product)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isInCart
                    ? 'bg-blue-950/60 border-blue-600 text-blue-300'
                    : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-100 hover:text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4 text-blue-400" />
                    <span>Added to Order Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-400" />
                    <span>Add to Order Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
