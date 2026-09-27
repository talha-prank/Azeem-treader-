import { MessageCircle, Eye, Plus, Check, Edit3 } from 'lucide-react';
import { Product } from '../data/products';
import { formatPricePKR, generateProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
  isOwnerMode?: boolean;
  onQuickEditPrice?: (product: Product) => void;
}

export function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isInCart = false,
  isOwnerMode = false,
  onQuickEditPrice
}: ProductCardProps) {
  return (
    <div className="group relative rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-950/20 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        
        {/* Fallback container with styling if image fails */}
        <div className="absolute inset-0 bg-slate-900 -z-10 flex items-center justify-center text-slate-700">
          <span className="text-xs uppercase tracking-wider font-mono">Azeem Trader Tech</span>
        </div>

        {/* Quiet subtle tag if badge exists */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-medium text-blue-300">
            {product.badge}
          </div>
        )}

        {/* Owner Quick Edit Badge on image if Owner Mode active */}
        {isOwnerMode && (
          <button
            onClick={() => onQuickEditPrice?.(product)}
            title="Edit price for this item"
            className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-lg flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit Price</span>
          </button>
        )}

        {/* Quick View Button on Image hover */}
        <button
          onClick={() => onViewDetails(product)}
          aria-label={`View details of ${product.name}`}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/65 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category Unboxed Text Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            {product.inStock ? (
              <span className="text-emerald-400">In Stock</span>
            ) : (
              <span className="text-red-400">Out of Stock</span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-display font-bold text-base text-white mt-1.5 hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price Section */}
        <div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-extrabold text-white tabular-nums tracking-tight">
                {formatPricePKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through tabular-nums">
                  {formatPricePKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Quick edit button next to price if owner mode is active */}
            {isOwnerMode && (
              <button
                onClick={() => onQuickEditPrice?.(product)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer bg-blue-950/60 px-2 py-1 rounded-md border border-blue-600/40"
              >
                <Edit3 className="w-3 h-3" />
                <span>Change</span>
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-3.5 space-y-2">
            {/* Primary Order on WhatsApp Button */}
            <a
              href={generateProductWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="whitespace-nowrap">Order on WhatsApp</span>
            </a>

            {/* Secondary Buttons Row */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onViewDetails(product)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">View Details</span>
              </button>

              <button
                onClick={() => onAddToCart(product)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isInCart
                    ? 'bg-blue-950/60 border-blue-600/50 text-blue-300'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">In Basket</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">Add Basket</span>
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
