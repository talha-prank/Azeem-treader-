import { STORE_INFO, Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function formatPricePKR(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export function generateProductWhatsAppUrl(product: Product): string {
  const text = `Assalam-o-Alaikum Azeem Trader, I am interested in ${product.name} (${formatPricePKR(product.price)}). Please send me the price and availability.`;
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppUrl(items: CartItem[], customerName?: string, city?: string): string {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  let text = `Assalam-o-Alaikum Azeem Trader,\n\nI want to place an order for the following mobile accessories:\n`;
  
  items.forEach((item, index) => {
    text += `${index + 1}. ${item.product.name} x${item.quantity} - ${formatPricePKR(item.product.price * item.quantity)}\n`;
  });
  
  text += `\nEstimated Total: ${formatPricePKR(total)}`;
  
  if (customerName) {
    text += `\nName: ${customerName}`;
  }
  if (city) {
    text += `\nCity / Delivery Address: ${city}`;
  } else {
    text += `\nLocation: Peshawar`;
  }
  
  text += `\n\nPlease confirm availability and delivery details. JazakAllah!`;
  
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateDirectContactWhatsAppUrl(message?: string): string {
  const text = message && message.trim().length > 0 
    ? `Assalam-o-Alaikum Azeem Trader,\n\n${message.trim()}`
    : `Assalam-o-Alaikum Azeem Trader, I would like to inquire about your mobile accessories catalog and prices.`;
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
