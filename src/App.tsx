import { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SpecialOffer } from './components/SpecialOffer';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { OwnerBanner } from './components/OwnerBanner';
import { OwnerAuthModal } from './components/OwnerAuthModal';
import { OwnerPriceManagerModal } from './components/OwnerPriceManagerModal';
import { QuickPriceEditModal } from './components/QuickPriceEditModal';
import { Product } from './data/products';
import { CartItem } from './utils/whatsapp';
import { loadStoredProducts, saveStoredProducts } from './services/productStorage';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => loadStoredProducts());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Owner management states
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('azeem_owner_active') === 'true';
    } catch {
      return false;
    }
  });
  const [isOwnerAuthOpen, setIsOwnerAuthOpen] = useState<boolean>(false);
  const [isPriceManagerOpen, setIsPriceManagerOpen] = useState<boolean>(false);
  const [quickEditProduct, setQuickEditProduct] = useState<Product | null>(null);

  // Sync selectedProduct with products array if its price was modified
  useEffect(() => {
    if (selectedProduct) {
      const fresh = products.find((p) => p.id === selectedProduct.id);
      if (fresh && (fresh.price !== selectedProduct.price || fresh.originalPrice !== selectedProduct.originalPrice || fresh.inStock !== selectedProduct.inStock)) {
        setSelectedProduct(fresh);
      }
    }
  }, [products, selectedProduct]);

  // Keep cart item prices synchronized with updated store prices
  const syncCartWithProducts = useCallback((updatedProducts: Product[]) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        const fresh = updatedProducts.find((p) => p.id === item.product.id);
        if (fresh) {
          return { ...item, product: fresh };
        }
        return item;
      })
    );
  }, []);

  const handleUpdateProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
    syncCartWithProducts(newProducts);
  }, [syncCartWithProducts]);

  const handleSaveSinglePrice = useCallback((productId: string, newPrice: number, newOriginalPrice?: number) => {
    setProducts((prev) => {
      const next = prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            price: newPrice,
            originalPrice: newOriginalPrice
          };
        }
        return p;
      });
      saveStoredProducts(next);
      syncCartWithProducts(next);
      return next;
    });
  }, [syncCartWithProducts]);

  const handleUnlockOwnerSuccess = useCallback(() => {
    setIsOwnerMode(true);
    try {
      sessionStorage.setItem('azeem_owner_active', 'true');
    } catch {}
    setIsPriceManagerOpen(true);
  }, []);

  const handleExitOwnerMode = useCallback(() => {
    setIsOwnerMode(false);
    try {
      sessionStorage.removeItem('azeem_owner_active');
    } catch {}
    setIsPriceManagerOpen(false);
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleShopNow = useCallback(() => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleContactClick = useCallback(() => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemIds = new Set(cartItems.map((item) => item.product.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Banner when Owner Mode is active */}
      <OwnerBanner
        isOwnerMode={isOwnerMode}
        onOpenPriceManager={() => setIsPriceManagerOpen(true)}
        onExitOwnerMode={handleExitOwnerMode}
      />

      {/* Sticky Top Bar following Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateCategory={handleSelectCategory}
        isOwnerMode={isOwnerMode}
        onOpenOwnerAuth={() => setIsOwnerAuthOpen(true)}
        onOpenPriceManager={() => setIsPriceManagerOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onShopClick={handleShopNow}
          onContactClick={handleContactClick}
        />

        {/* 2. Product Categories */}
        <Categories onSelectCategory={handleSelectCategory} />

        {/* 3. Featured Products & Live Search Filter Catalog */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onViewDetails={setSelectedProduct}
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
          isOwnerMode={isOwnerMode}
          onQuickEditPrice={(prod) => setQuickEditProduct(prod)}
          onOpenPriceManager={() => setIsPriceManagerOpen(true)}
        />

        {/* 4. Special Offer Section */}
        <SpecialOffer onShopNow={handleShopNow} />

        {/* 5. Why Choose Azeem Trader */}
        <WhyChooseUs />

        {/* 6. About Azeem Trader */}
        <AboutSection />

        {/* 7. Customer Contact Section */}
        <ContactSection />
      </main>

      {/* 8. Footer with Owner Access */}
      <Footer
        isOwnerMode={isOwnerMode}
        onOpenOwnerAuth={() => setIsOwnerAuthOpen(true)}
        onOpenPriceManager={() => setIsPriceManagerOpen(true)}
      />

      {/* Interactive Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={selectedProduct ? cartItemIds.has(selectedProduct.id) : false}
        isOwnerMode={isOwnerMode}
        onQuickEditPrice={(prod) => setQuickEditProduct(prod)}
      />

      {/* Multi-Item Inquiry Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Owner Authentication Modal (PIN) */}
      <OwnerAuthModal
        isOpen={isOwnerAuthOpen}
        onClose={() => setIsOwnerAuthOpen(false)}
        onSuccess={handleUnlockOwnerSuccess}
      />

      {/* Full Owner Price Control Center */}
      <OwnerPriceManagerModal
        isOpen={isPriceManagerOpen}
        onClose={() => setIsPriceManagerOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
      />

      {/* Quick 1-Item Price Edit Popover */}
      <QuickPriceEditModal
        product={quickEditProduct}
        isOpen={Boolean(quickEditProduct)}
        onClose={() => setQuickEditProduct(null)}
        onSavePrice={handleSaveSinglePrice}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
