import { ArrowRight, Headphones, BatteryCharging, Zap, Cable, Speaker, Smartphone, Shield, Layers } from 'lucide-react';
import { CATEGORIES, ProductCategory } from '../data/categories';

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'earbuds':
        return <Headphones className="w-5 h-5 text-blue-400" />;
      case 'powerbanks':
        return <BatteryCharging className="w-5 h-5 text-sky-400" />;
      case 'chargers':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'cables':
        return <Cable className="w-5 h-5 text-emerald-400" />;
      case 'speakers':
        return <Speaker className="w-5 h-5 text-purple-400" />;
      case 'holders':
        return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'covers':
        return <Layers className="w-5 h-5 text-pink-400" />;
      case 'protectors':
        return <Shield className="w-5 h-5 text-teal-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">
            Curated Collections
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Browse Product Categories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Explore authentic mobile accessories engineered for performance, safety, and longevity.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((cat: ProductCategory) => (
            <div
              key={cat.id}
              className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Category Image Preview banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Category Icon Badge */}
                <div className="absolute top-3 left-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                  {getCategoryIcon(cat.id)}
                </div>
              </div>

              {/* Category Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {cat.itemCount}+ Models Available
                  </span>
                  <button
                    onClick={() => onSelectCategory(cat.targetCategory)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
