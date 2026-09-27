import { useState, useEffect } from 'react';
import { X, Check, Save } from 'lucide-react';
import { Product } from '../data/products';
import { formatPricePKR } from '../utils/whatsapp';

interface QuickPriceEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSavePrice: (productId: string, newPrice: number, newOriginalPrice?: number) => void;
}

export function QuickPriceEditModal({
  product,
  isOpen,
  onClose,
  onSavePrice
}: QuickPriceEditModalProps) {
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (product) {
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePrice(product.id, price, originalPrice);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-blue-500/50 p-6 shadow-2xl shadow-blue-950/40 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
          Owner Quick Price Edit
        </span>
        <h3 className="font-display text-base font-bold text-white mt-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Current Price: <span className="text-slate-200">{formatPricePKR(product.price)}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              New Selling Price (PKR)
            </label>
            <input
              type="number"
              step="50"
              required
              autoFocus
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold text-white tabular-nums focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Original Strike-Through Price (PKR, optional)
            </label>
            <input
              type="number"
              step="50"
              value={originalPrice || ''}
              placeholder="e.g. 3500"
              onChange={(e) =>
                setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 tabular-nums focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Price</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
