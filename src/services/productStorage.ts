import { PRODUCTS, Product } from '../data/products';

const STORAGE_KEY = 'azeem_trader_products_v1';
const PIN_STORAGE_KEY = 'azeem_trader_owner_pin';
const DEFAULT_PIN = '1142'; // Last 4 digits of 03195411421

export function loadStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return PRODUCTS;
    }
    const parsed: Product[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return PRODUCTS;
    }

    // Merge in any default products that might not be in saved data yet
    const savedIds = new Set(parsed.map((p) => p.id));
    const merged = [...parsed];
    for (const def of PRODUCTS) {
      if (!savedIds.has(def.id)) {
        merged.push(def);
      }
    }
    return merged;
  } catch (err) {
    console.error('Error loading products from storage:', err);
    return PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products to storage:', err);
  }
}

export function resetProducts(): Product[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting products:', err);
  }
  return PRODUCTS;
}

export function getStoredOwnerPin(): string {
  try {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function saveStoredOwnerPin(newPin: string): void {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, newPin.trim());
  } catch (err) {
    console.error('Error saving owner PIN:', err);
  }
}

export function checkOwnerPin(enteredPin: string): boolean {
  const currentPin = getStoredOwnerPin();
  const trimmed = enteredPin.trim();
  // Allow configured PIN or fallback to 1142 or 0319 for easy owner access
  return trimmed === currentPin || trimmed === '1142' || trimmed === '0319';
}
