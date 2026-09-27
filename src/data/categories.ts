export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  image: string;
  targetCategory: 'all' | 'earbuds' | 'powerbanks' | 'chargers' | 'cables' | 'speakers' | 'holders' | 'covers' | 'protectors' | 'handsfree';
}

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'earbuds',
    name: 'Wireless Earbuds',
    description: 'Active noise cancellation, gaming low-latency & deep bass TWS.',
    itemCount: 14,
    image: '/src/assets/images/product_anc_earbuds_1790497689818.jpg',
    targetCategory: 'earbuds'
  },
  {
    id: 'powerbanks',
    name: 'Power Banks',
    description: '10,000mAh to 30,000mAh high-capacity PD fast charging packs.',
    itemCount: 18,
    image: '/src/assets/images/product_fast_powerbank_1790497703047.jpg',
    targetCategory: 'powerbanks'
  },
  {
    id: 'chargers',
    name: 'Fast Chargers',
    description: 'GaN III technology 20W to 120W wall adapters for iPhone & Android.',
    itemCount: 22,
    image: '/src/assets/images/product_gan_charger_1790497714410.jpg',
    targetCategory: 'chargers'
  },
  {
    id: 'cables',
    name: 'USB Cables',
    description: 'Braided 100W PD Type-C, Lightning, 3-in-1 durable charging cords.',
    itemCount: 26,
    image: '/src/assets/images/product_gan_charger_1790497714410.jpg',
    targetCategory: 'cables'
  },
  {
    id: 'speakers',
    name: 'Bluetooth Speakers',
    description: 'Portable waterproof punchy bass speakers with ambient LEDs.',
    itemCount: 9,
    image: '/src/assets/images/product_bluetooth_speaker_1790497728406.jpg',
    targetCategory: 'speakers'
  },
  {
    id: 'holders',
    name: 'Phone Holders',
    description: 'Aluminum magnetic car vent mounts and adjustable desk stands.',
    itemCount: 12,
    image: '/src/assets/images/product_phone_holder_1790497739280.jpg',
    targetCategory: 'holders'
  },
  {
    id: 'covers',
    name: 'Mobile Covers',
    description: 'Shockproof MagSafe, slim silicone, and rugged protective cases.',
    itemCount: 45,
    image: '/src/assets/images/hero_mobile_accessories_1790497677004.jpg',
    targetCategory: 'covers'
  },
  {
    id: 'protectors',
    name: 'Screen Protectors',
    description: '9D tempered glass, privacy filters, and matte gaming protectors.',
    itemCount: 30,
    image: '/src/assets/images/hero_mobile_accessories_1790497677004.jpg',
    targetCategory: 'protectors'
  }
];
