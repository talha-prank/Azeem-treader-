import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, PackageX, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartItemIds: Set<string>;
  isOwnerMode?: boolean;
  onQuickEditPrice?: (product: Product) => void;
  onOpenPriceManager?: () => void;
}

export function ProductGrid({
  products,
  selectedCategory,
  onSelectCategory,
  onViewDetails,
  onAddToCart,
  cartItemIds,
  isOwnerMode = false,
  onQuickEditPrice,
  onOpenPriceManager
}: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filterTabs = [
    { id: 'all', label: 'All Accessories' },
    { id: 'earbuds', label: 'Earbuds' },
    { id: 'powerbanks', label: 'Power Banks' },
    { id: 'chargers', label: 'Chargers' },
    { id: 'cables', label: 'Cables' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'holders', label: 'Holders' },
    { id: 'covers', label: 'Cases' },
    { id: 'protectors', label: 'Screen Glass' }
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query) ||
        p.specs.some(
          (s) =>
            s.label.toLowerCase().includes(query) ||
            s.value.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available Inventory</span>
              {isOwnerMode && (
                <button
                  onClick={onOpenPriceManager}
                  className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold normal-case tracking-normal hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  Manage Prices (Azeem Ali)
                </button>
              )}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Mobile Accessories
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Instant order on WhatsApp with rapid delivery and in-store pickup at Civil Colony, Peshawar.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search earbuds, 65W chargers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls & Sort Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-slate-900">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-300 tabular-nums">{filteredProducts.length}</span> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
                isInCart={cartItemIds.has(product.id)}
                isOwnerMode={isOwnerMode}
                onQuickEditPrice={onQuickEditPrice}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 mt-8">
            <PackageX className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-slate-200">
              No matching accessories found
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
              We couldn&apos;t find items matching &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-slate-900 border border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
