import { useState, useMemo } from 'react';
import {
  X,
  Search,
  Check,
  Save,
  RotateCcw,
  Plus,
  Percent,
  Sliders,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Product } from '../data/products';
import { formatPricePKR } from '../utils/whatsapp';
import { saveStoredProducts, resetProducts, saveStoredOwnerPin, getStoredOwnerPin } from '../services/productStorage';

interface OwnerPriceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
}

export function OwnerPriceManagerModal({
  isOpen,
  onClose,
  products,
  onUpdateProducts
}: OwnerPriceManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'prices' | 'bulk' | 'add' | 'settings'>('prices');
  const [search, setSearch] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Editable buffer for prices: { [productId]: { price: number, originalPrice?: number, inStock: boolean } }
  const [priceBuffer, setPriceBuffer] = useState<{
    [id: string]: { price: number; originalPrice?: number; inStock: boolean };
  }>(() => {
    const map: { [id: string]: { price: number; originalPrice?: number; inStock: boolean } } = {};
    products.forEach((p) => {
      map[p.id] = { price: p.price, originalPrice: p.originalPrice, inStock: p.inStock };
    });
    return map;
  });

  // Bulk percentage state
  const [bulkPercent, setBulkPercent] = useState<number>(5);

  // New accessory form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'earbuds' as Product['category'],
    categoryLabel: 'Wireless Earbuds',
    price: 1500,
    originalPrice: 2000,
    shortDescription: '',
    image: '/src/assets/images/hero_mobile_accessories_1790497677004.jpg',
    inStock: true
  });

  // Owner PIN change state
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }, [products, search]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setPriceBuffer((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        price: isNaN(newPrice) ? 0 : newPrice
      }
    }));
  };

  const handleOriginalPriceChange = (id: string, newOrig: number) => {
    setPriceBuffer((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        originalPrice: isNaN(newOrig) ? undefined : newOrig
      }
    }));
  };

  const handleStockToggle = (id: string) => {
    setPriceBuffer((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        inStock: !prev[id]?.inStock
      }
    }));
  };

  // Save single product change
  const handleSaveSingle = (id: string) => {
    const itemBuffer = priceBuffer[id];
    if (!itemBuffer) return;

    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          price: itemBuffer.price,
          originalPrice: itemBuffer.originalPrice,
          inStock: itemBuffer.inStock
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    saveStoredProducts(updated);
    const pName = products.find((p) => p.id === id)?.name || 'Product';
    showNotification(`Updated price for "${pName}" to Rs. ${itemBuffer.price.toLocaleString('en-PK')}`);
  };

  // Save all buffered prices at once
  const handleSaveAll = () => {
    const updated = products.map((p) => {
      const buf = priceBuffer[p.id];
      if (buf) {
        return {
          ...p,
          price: buf.price,
          originalPrice: buf.originalPrice,
          inStock: buf.inStock
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    saveStoredProducts(updated);
    showNotification('All product prices have been saved successfully!');
  };

  // Apply bulk percentage
  const handleApplyBulk = (type: 'increase' | 'decrease') => {
    const multiplier = type === 'increase' ? 1 + bulkPercent / 100 : 1 - bulkPercent / 100;

    const updated = products.map((p) => {
      const newPrice = Math.round((p.price * multiplier) / 50) * 50; // round to nearest 50 PKR
      const newOriginal = p.originalPrice
        ? Math.round((p.originalPrice * multiplier) / 50) * 50
        : undefined;

      return {
        ...p,
        price: newPrice,
        originalPrice: newOriginal
      };
    });

    // Update buffer too
    const newBuf: typeof priceBuffer = {};
    updated.forEach((p) => {
      newBuf[p.id] = { price: p.price, originalPrice: p.originalPrice, inStock: p.inStock };
    });
    setPriceBuffer(newBuf);

    onUpdateProducts(updated);
    saveStoredProducts(updated);
    showNotification(
      `Adjusted all prices by ${type === 'increase' ? '+' : '-'}${bulkPercent}%`
    );
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all product prices to original defaults?')) {
      const defaults = resetProducts();
      onUpdateProducts(defaults);
      const newBuf: typeof priceBuffer = {};
      defaults.forEach((p) => {
        newBuf[p.id] = { price: p.price, originalPrice: p.originalPrice, inStock: p.inStock };
      });
      setPriceBuffer(newBuf);
      showNotification('Prices have been reset to factory defaults.');
    }
  };

  // Add new product
  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const id = `item-${Date.now()}`;
    const productToAdd: Product = {
      id,
      name: newProduct.name.trim(),
      category: newProduct.category,
      categoryLabel: newProduct.categoryLabel,
      price: Number(newProduct.price) || 1000,
      originalPrice: Number(newProduct.originalPrice) || undefined,
      shortDescription:
        newProduct.shortDescription.trim() ||
        'Premium quality mobile accessory available at Azeem Trader Peshawar.',
      fullDescription:
        newProduct.shortDescription.trim() ||
        'Authentic and tested accessory available in-store at Civil Colony, Kohat Road, Peshawar with fast delivery across KPK.',
      image: newProduct.image,
      specs: [
        { label: 'Condition', value: 'Brand New Tested' },
        { label: 'Warranty', value: '7-Day Checking Warranty' }
      ],
      inStock: newProduct.inStock,
      featured: true
    };

    const updated = [productToAdd, ...products];
    onUpdateProducts(updated);
    saveStoredProducts(updated);

    // Update buffer
    setPriceBuffer((prev) => ({
      ...prev,
      [id]: {
        price: productToAdd.price,
        originalPrice: productToAdd.originalPrice,
        inStock: productToAdd.inStock
      }
    }));

    showNotification(`Added new accessory "${productToAdd.name}"!`);
    setNewProduct({
      name: '',
      category: 'earbuds',
      categoryLabel: 'Wireless Earbuds',
      price: 1500,
      originalPrice: 2000,
      shortDescription: '',
      image: '/src/assets/images/hero_mobile_accessories_1790497677004.jpg',
      inStock: true
    });
    setActiveTab('prices');
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      saveStoredOwnerPin(newPinInput.trim());
      setPinChangeMsg('PIN successfully updated!');
      setNewPinInput('');
      setTimeout(() => setPinChangeMsg(null), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-manager-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="price-manager-title" className="font-display text-lg sm:text-xl font-bold text-white">
                  Owner Price Control Center
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300">
                  Azeem Ali
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Change accessory prices in real-time. Changes immediately update the store, modal, and WhatsApp order messages.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast if visible */}
        {saveSuccessMsg && (
          <div className="px-6 py-2.5 bg-emerald-950/90 border-b border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{saveSuccessMsg}</span>
            </div>
            <span className="text-[11px] text-emerald-400/80">Live on Store</span>
          </div>
        )}

        {/* Tab navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/50 px-4 sm:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('prices')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'prices'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Catalog Prices ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'bulk'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Bulk % Adjuster
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'add'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Add New Product
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Reset & PIN
          </button>
        </div>

        {/* Tab 1: Catalog Prices */}
        {activeTab === 'prices' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Search and Action Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name or category..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleSaveAll}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="space-y-3">
                {filteredProducts.map((p) => {
                  const buf = priceBuffer[p.id] || {
                    price: p.price,
                    originalPrice: p.originalPrice,
                    inStock: p.inStock
                  };
                  const isDirty =
                    buf.price !== p.price ||
                    buf.originalPrice !== p.originalPrice ||
                    buf.inStock !== p.inStock;

                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isDirty
                          ? 'bg-blue-950/30 border-blue-600/60'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Product identity */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs sm:text-sm text-white truncate">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>{p.categoryLabel}</span>
                            <span>·</span>
                            <span className="text-slate-500 font-mono">
                              Current: {formatPricePKR(p.price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Inputs & actions */}
                      <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto justify-end">
                        {/* Selling Price */}
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                            Sale Price (PKR)
                          </label>
                          <input
                            type="number"
                            step="50"
                            value={buf.price}
                            onChange={(e) => handlePriceChange(p.id, Number(e.target.value))}
                            className="w-28 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white tabular-nums focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Original Strike Price */}
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                            Strike-Through
                          </label>
                          <input
                            type="number"
                            step="50"
                            value={buf.originalPrice || ''}
                            placeholder="Optional"
                            onChange={(e) =>
                              handleOriginalPriceChange(
                                p.id,
                                e.target.value ? Number(e.target.value) : 0
                              )
                            }
                            className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 tabular-nums focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Stock toggle */}
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                            Stock
                          </label>
                          <button
                            type="button"
                            onClick={() => handleStockToggle(p.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              buf.inStock
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80'
                                : 'bg-red-950/80 text-red-400 border border-red-800/80'
                            }`}
                          >
                            {buf.inStock ? 'In Stock' : 'Out'}
                          </button>
                        </div>

                        {/* Save single item */}
                        <div className="pt-4 sm:pt-0">
                          <button
                            onClick={() => handleSaveSingle(p.id)}
                            disabled={!isDirty}
                            title="Save this product price"
                            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isDirty
                                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                            }`}
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bulk Percentage Adjuster */}
        {activeTab === 'bulk' && (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-400" />
                <span>Bulk Store-Wide Percentage Adjustment</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Quickly increase or decrease prices across all {products.length} products (e.g. for storewide discounts or currency rate updates). Prices will be neatly rounded to the nearest Rs. 50.
              </p>

              <div className="mt-5 space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Percentage Value (%)
                  </label>
                  <div className="flex items-center gap-3">
                    {[5, 10, 15, 20].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setBulkPercent(val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          bulkPercent === val
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={bulkPercent}
                      onChange={(e) => setBulkPercent(Number(e.target.value))}
                      className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-white text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleApplyBulk('increase')}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Increase All Prices (+{bulkPercent}%)
                  </button>
                  <button
                    onClick={() => handleApplyBulk('decrease')}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    Discount All Prices (-{bulkPercent}%)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Add New Product */}
        {activeTab === 'add' && (
          <div className="p-6 overflow-y-auto">
            <div className="max-w-lg mx-auto">
              <h3 className="font-display text-base font-bold text-white mb-1">
                Add New Accessory to Store
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Add new products to Azeem Trader catalog with custom prices.
              </p>

              <form onSubmit={handleAddNewProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Baseus 100W Fast Type-C Cable"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => {
                        const val = e.target.value as Product['category'];
                        const labels: Record<Product['category'], string> = {
                          earbuds: 'Wireless Earbuds',
                          powerbanks: 'Power Banks',
                          chargers: 'Fast Chargers',
                          cables: 'USB Cables',
                          speakers: 'Bluetooth Speakers',
                          holders: 'Phone Holders',
                          covers: 'Mobile Covers',
                          protectors: 'Screen Protectors',
                          handsfree: 'Hands-Free / Earphones'
                        };
                        setNewProduct({
                          ...newProduct,
                          category: val,
                          categoryLabel: labels[val] || 'Accessories'
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="earbuds">Wireless Earbuds</option>
                      <option value="powerbanks">Power Banks</option>
                      <option value="chargers">Fast Chargers</option>
                      <option value="cables">USB Cables</option>
                      <option value="speakers">Bluetooth Speakers</option>
                      <option value="holders">Phone Holders</option>
                      <option value="covers">Mobile Covers</option>
                      <option value="protectors">Screen Protectors</option>
                      <option value="handsfree">Hands-Free / Earphones</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Selling Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      step="50"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      placeholder="e.g. 1850"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Original Price (Optional)
                    </label>
                    <input
                      type="number"
                      step="50"
                      value={newProduct.originalPrice}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })
                      }
                      placeholder="e.g. 2400"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Image Template
                    </label>
                    <select
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="/src/assets/images/hero_mobile_accessories_1790497677004.jpg">
                        Standard Accessory
                      </option>
                      <option value="/src/assets/images/product_anc_earbuds_1790497689818.jpg">
                        Audio / Earbuds
                      </option>
                      <option value="/src/assets/images/product_fast_powerbank_1790497703047.jpg">
                        Power Bank
                      </option>
                      <option value="/src/assets/images/product_gan_charger_1790497714410.jpg">
                        Fast Charger / Cable
                      </option>
                      <option value="/src/assets/images/product_bluetooth_speaker_1790497728406.jpg">
                        Speaker
                      </option>
                      <option value="/src/assets/images/product_phone_holder_1790497739280.jpg">
                        Phone Mount
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProduct.shortDescription}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, shortDescription: e.target.value })
                    }
                    placeholder="Brief highlights of this accessory..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Save & Publish Product
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: Reset & PIN */}
        {activeTab === 'settings' && (
          <div className="p-6 overflow-y-auto space-y-6 max-w-lg mx-auto">
            {/* Change Owner PIN */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Change Owner Passcode PIN</span>
              </h3>
              <p className="text-xs text-slate-400">
                Current PIN is <strong className="text-blue-400 font-mono">{getStoredOwnerPin()}</strong>. You can change it to any 4-digit code.
              </p>

              <form onSubmit={handleSavePin} className="flex gap-2 pt-2">
                <input
                  type="password"
                  maxLength={6}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Enter new 4-digit PIN"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono tracking-widest placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Update PIN
                </button>
              </form>
              {pinChangeMsg && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{pinChangeMsg}</span>
                </p>
              )}
            </div>

            {/* Factory Reset */}
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/40 space-y-2">
              <h3 className="font-display text-sm font-bold text-red-200 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>Reset All Prices to Default</span>
              </h3>
              <p className="text-xs text-red-300/80">
                Discard all custom pricing edits and restore the original store product list and prices.
              </p>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="mt-2 px-4 py-2 rounded-xl bg-red-900/50 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset to Default Prices
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <span>Azeem Trader · Civil Colony, Kohat Road, Peshawar</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
