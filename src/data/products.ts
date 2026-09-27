export interface Product {
  id: string;
  name: string;
  category: 'earbuds' | 'powerbanks' | 'chargers' | 'cables' | 'speakers' | 'holders' | 'covers' | 'protectors' | 'handsfree';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'earbuds-anc-pro',
    name: 'AeroPulse ANC Pro Wireless Earbuds',
    category: 'earbuds',
    categoryLabel: 'Wireless Earbuds',
    price: 3850,
    originalPrice: 4800,
    image: '/src/assets/images/product_anc_earbuds_1790497689818.jpg',
    badge: 'Best Seller',
    shortDescription: 'Active Noise Cancelling TWS with 40-hour total battery life & deep bass.',
    fullDescription: 'High-fidelity audio with hybrid Active Noise Cancellation (ANC), Transparency Mode, and Quad-Mic ENC for crystal clear phone calls. Features ultra-low latency gaming mode and sweat-proof IPX5 rating.',
    specs: [
      { label: 'Battery Life', value: '8h + 32h with case' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Charging', value: 'Type-C Fast Charge' },
      { label: 'Microphone', value: 'Quad-mic ENC' },
      { label: 'Water Resistance', value: 'IPX5 Sweatproof' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'powerbank-20000-65w',
    name: 'TitanCore 20,000mAh 65W PD Power Bank',
    category: 'powerbanks',
    categoryLabel: 'Power Banks',
    price: 4950,
    originalPrice: 5900,
    image: '/src/assets/images/product_fast_powerbank_1790497703047.jpg',
    badge: 'Heavy Duty',
    shortDescription: 'High-speed 65W Power Delivery laptop & smartphone metal power bank.',
    fullDescription: 'Massive 20,000mAh capacity capable of fast-charging laptops, MacBooks, tablets, and smartphones. Equipped with a digital real-time LED display showing exact battery percentage and wattage output.',
    specs: [
      { label: 'Capacity', value: '20,000 mAh' },
      { label: 'Max Output', value: '65W Power Delivery' },
      { label: 'Ports', value: '2x Type-C, 1x USB-A' },
      { label: 'Display', value: 'Smart Digital LED' },
      { label: 'Material', value: 'Anodized Aluminum' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'charger-65w-gan',
    name: 'NitroGaN 65W Dual Port Fast Charger',
    category: 'chargers',
    categoryLabel: 'Fast Chargers',
    price: 2450,
    originalPrice: 3200,
    image: '/src/assets/images/product_gan_charger_1790497714410.jpg',
    badge: 'Top Rated',
    shortDescription: 'Compact GaN III technology charger for iPhone, Samsung, and laptops.',
    fullDescription: 'Gallium Nitride (GaN) III technology delivers maximum 65W charging speed in an ultra-compact body that stays cool. Supports PD 3.0, QC 4.0+, and Samsung 45W Super Fast Charging 2.0.',
    specs: [
      { label: 'Technology', value: 'GaN III Semiconductor' },
      { label: 'Max Power', value: '65W Total' },
      { label: 'Ports', value: '1x USB-C PD, 1x USB-A QC' },
      { label: 'Compatibility', value: 'Universal iOS & Android' },
      { label: 'Protection', value: 'Over-voltage & Thermal Control' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'speaker-boom-pulse',
    name: 'VortexSound 20W Rugged Bluetooth Speaker',
    category: 'speakers',
    categoryLabel: 'Bluetooth Speakers',
    price: 3600,
    originalPrice: 4500,
    image: '/src/assets/images/product_bluetooth_speaker_1790497728406.jpg',
    badge: 'Waterproof',
    shortDescription: '360° stereo surround sound with deep punchy bass and 16h playtime.',
    fullDescription: 'Engineered for powerful indoor and outdoor audio. Features dual passive radiators for deep bass, IPX7 waterproof casing, built-in ambient party ring lights, and TWS multi-speaker pairing.',
    specs: [
      { label: 'Power Output', value: '20W Peak RMS' },
      { label: 'Playtime', value: 'Up to 16 Hours' },
      { label: 'Waterproof', value: 'IPX7 Certified' },
      { label: 'Range', value: '15 meters Bluetooth 5.2' },
      { label: 'Inputs', value: 'Bluetooth, AUX, TF Card' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'holder-mag-alloy',
    name: 'MagShift 360° Aluminum Car & Desk Mount',
    category: 'holders',
    categoryLabel: 'Phone Holders',
    price: 1350,
    originalPrice: 1800,
    image: '/src/assets/images/product_phone_holder_1790497739280.jpg',
    badge: 'Alloy Build',
    shortDescription: 'Strong magnetic grip with 360-degree rotation for car vents & desks.',
    fullDescription: 'CNC machined aerospace-grade aluminum mount featuring N52 neodymium magnets. Holds phones securely even on rough roads. Includes magnetic rings for iPhone MagSafe and all Android devices.',
    specs: [
      { label: 'Magnet Grade', value: '20x N52 Neodymium' },
      { label: 'Rotation', value: '360° Ball Joint' },
      { label: 'Mounting', value: 'Air Vent + 3M Base Plate' },
      { label: 'Material', value: 'Aviation Aluminum' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'cable-braided-100w',
    name: 'ArmorWeave 100W PD Type-C to Type-C Cable',
    category: 'cables',
    categoryLabel: 'USB Cables',
    price: 850,
    originalPrice: 1200,
    image: '/src/assets/images/product_gan_charger_1790497714410.jpg',
    badge: '100W Power',
    shortDescription: 'Heavy-duty braided nylon fast-charging cable with E-Marker smart chip.',
    fullDescription: 'High-speed 100W 5A charging cable built with ballistic military nylon. E-Marker chip protects against voltage surges. Supports 480Mbps fast data transmission.',
    specs: [
      { label: 'Max Wattage', value: '100W (20V/5A)' },
      { label: 'Length', value: '1.2 Meters / 2.0 Meters' },
      { label: 'Bending Life', value: '25,000+ bends tested' },
      { label: 'Data Transfer', value: '480 Mbps' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'powerbank-10000-slim',
    name: 'VoltMini 10,000mAh Ultra-Slim Fast Bank',
    category: 'powerbanks',
    categoryLabel: 'Power Banks',
    price: 2850,
    originalPrice: 3500,
    image: '/src/assets/images/product_fast_powerbank_1790497703047.jpg',
    badge: 'Pocket Size',
    shortDescription: 'Compact pocket-sized 22.5W fast charging power bank for daily commute.',
    fullDescription: 'Slim and lightweight high-density polymer battery pack. Easily slides into pockets. Supports 22.5W Huawei SuperCharge, Samsung Fast Charge, and 20W Apple PD charging.',
    specs: [
      { label: 'Capacity', value: '10,000 mAh' },
      { label: 'Speed', value: '22.5W QC / 20W PD' },
      { label: 'Weight', value: '185 grams' },
      { label: 'Ports', value: '1x Type-C, 1x USB-A' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'case-military-shock',
    name: 'ShieldArmor MagSafe Shockproof Case',
    category: 'covers',
    categoryLabel: 'Mobile Covers',
    price: 950,
    originalPrice: 1400,
    image: '/src/assets/images/hero_mobile_accessories_1790497677004.jpg',
    badge: 'Drop Tested',
    shortDescription: 'Military-grade anti-yellowing transparent magnetic protective cover.',
    fullDescription: 'Engineered with 4-corner air cushions, raised camera bezel, and built-in strong magnetic ring. Available for all popular iPhone, Samsung Galaxy, and Redmi models.',
    specs: [
      { label: 'Drop Test', value: '10ft Military Drop Certified' },
      { label: 'Material', value: 'Bayer Anti-Yellowing TPU' },
      { label: 'Camera Lip', value: '1.5mm Raised Edge' },
      { label: 'Models', value: 'iPhone / Samsung / Xiaomi' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'glass-9d-screen',
    name: '9D Edge-to-Edge Tempered Glass Protector',
    category: 'protectors',
    categoryLabel: 'Screen Protectors',
    price: 450,
    originalPrice: 700,
    image: '/src/assets/images/hero_mobile_accessories_1790497677004.jpg',
    badge: '9H Hardness',
    shortDescription: 'High-definition shatterproof tempered glass with oleophobic coating.',
    fullDescription: 'Full coverage 9D curved edge glass protector with anti-scratch 9H tempered surface. Electroplated oleophobic coating resists fingerprints and oily smudges.',
    specs: [
      { label: 'Hardness', value: '9H Toughened Glass' },
      { label: 'Edge', value: '9D Curved Full Glue' },
      { label: 'Clarity', value: '99.9% HD Transparency' },
      { label: 'Installation', value: 'Bubble-free application' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'handsfree-metal-bass',
    name: 'BassPro Metal In-Ear 3.5mm / Type-C Hands-Free',
    category: 'handsfree',
    categoryLabel: 'Hands-Free / Earphones',
    price: 650,
    originalPrice: 950,
    image: '/src/assets/images/product_anc_earbuds_1790497689818.jpg',
    badge: 'Heavy Bass',
    shortDescription: 'Metal chamber wired hands-free with HD mic & tangle-free TPE cable.',
    fullDescription: 'Durable metal earphone with ergonomic angled ear-tips for comfortable long listening sessions. Features inline remote for answering calls, playing music, and volume control.',
    specs: [
      { label: 'Drivers', value: '10mm Dynamic Bass Driver' },
      { label: 'Connector', value: '3.5mm Audio Jack or Type-C' },
      { label: 'Cable Length', value: '1.2m Tangle-free' },
      { label: 'Mic', value: 'HD Noise-reducing Microphone' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'charger-20w-pd-iphone',
    name: 'SwiftCharge 20W Apple PD Fast Adapter',
    category: 'chargers',
    categoryLabel: 'Mobile Chargers',
    price: 1450,
    originalPrice: 1950,
    image: '/src/assets/images/product_gan_charger_1790497714410.jpg',
    badge: 'Fast Charge',
    shortDescription: 'Dedicated 20W PD charger optimized for iPhone 11 through iPhone 16 series.',
    fullDescription: 'Charges modern iPhones up to 50% in just 28 minutes. Intelligent temperature management prevents device heating during high-speed charging.',
    specs: [
      { label: 'Output', value: '20W PD 3.0' },
      { label: 'Input', value: '100-240V 50/60Hz' },
      { label: 'Interface', value: 'USB Type-C' },
      { label: 'Safety', value: 'Short-circuit & Overcharge Safe' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'cable-3in1-metal',
    name: 'MultiSync 3-in-1 Fast Charging Cable',
    category: 'cables',
    categoryLabel: 'USB Cables',
    price: 950,
    originalPrice: 1400,
    image: '/src/assets/images/product_gan_charger_1790497714410.jpg',
    badge: '3-in-1',
    shortDescription: 'Type-C, Lightning, and Micro-USB all in one durable braided cable.',
    fullDescription: 'Charges three devices at once. Built with tough nylon braiding and zinc-alloy connectors. Perfect for car and travel use.',
    specs: [
      { label: 'Connectors', value: 'Type-C, iOS Lightning, Micro-USB' },
      { label: 'Total Current', value: '3.5A Fast Flow' },
      { label: 'Length', value: '1.2 Meters' },
      { label: 'Core', value: 'Tinned Oxygen-Free Copper' }
    ],
    inStock: true,
    featured: false
  }
];

export const STORE_INFO = {
  name: 'Azeem Trader',
  tagline: 'Premium Mobile Accessories',
  owner: 'Azeem Ali',
  phone: '03195411421',
  phoneFormatted: '+92 319 5411421',
  whatsappNumber: '923195411421',
  email: 'sh2020567@gmail.com',
  address: 'IV/6 Civil Colony, Kohat Road, Peshawar, Pakistan',
  shortAddress: 'IV/6 Civil Colony, Kohat Road, Peshawar',
  city: 'Peshawar',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Civil+Colony+Kohat+Road+Peshawar+Pakistan'
};
