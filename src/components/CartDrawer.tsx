import { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, formatPricePKR, generateCartWhatsAppUrl } from '../utils/whatsapp';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('Peshawar');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h2 id="cart-title" className="font-display text-lg font-bold text-white">
              Order Basket ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close basket"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-24 text-center text-slate-400 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-medium text-slate-300">Your basket is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our accessories catalog and click &quot;Add Basket&quot; to build a multi-item order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
              >
                Browse Accessories
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>Selected Items</span>
                <button
                  onClick={onClearCart}
                  className="text-red-400 hover:text-red-300 text-xs font-medium cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium tabular-nums block mt-0.5">
                      {formatPricePKR(product.price)} each
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-800 rounded-md bg-slate-900">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-blue-400 tabular-nums">
                        {formatPricePKR(product.price * quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Delivery Details Inputs */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-xs font-semibold text-slate-300">
                  Customer & Delivery Info (Optional):
                </p>
                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (e.g. Asad)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Delivery Area / City (e.g. Peshawar Civil Colony)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-medium">Estimated Subtotal</span>
              <span className="font-display text-xl font-bold text-white tabular-nums">
                {formatPricePKR(totalAmount)}
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Orders are confirmed instantly on WhatsApp. Pick up in Peshawar or arrange safe city delivery.
            </p>

            <a
              href={generateCartWhatsAppUrl(items, customerName, city)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order to WhatsApp ({STORE_INFO.phone})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
