import { BEAUTY_CENTER_PHONE, SHOP_NAME } from './beautyCenter.js';

/** @type {{ category: string, items: string[] }[]} */
export const MOCK_CATALOG = [
  {
    category: 'Уход за лицом',
    items: [
      'гидрофильное масло Silk Clean 150 мл',
      'сыворотка Hydra Boost с 5% niacinamide 30 мл',
      'крем Barrier Ceramide для сухой кожи 50 мл',
      'тоник Calm Mist для чувствительной кожи 200 мл',
    ],
  },
  {
    category: 'SPF',
    items: ['флюид Sun Shield SPF 50 без белого налёта 50 мл'],
  },
  {
    category: 'Макияж',
    items: [
      'тон Velvet Skin, оттенки 01–04',
      'помада Rouge Nude, оттенки 05–09',
      'тушь Lash Volume черная',
    ],
  },
  {
    category: 'Волосы и тело',
    items: [
      'шампунь Repair Bond для окрашенных волос 250 мл',
      'лосьон для тела Lumière Soft 200 мл',
    ],
  },
];

export function formatCatalogReply() {
  const lines = MOCK_CATALOG.map(
    (block) => `${block.category}: ${block.items.join('; ')}.`,
  );

  return `В «${SHOP_NAME}» сейчас представлены такие линейки: ${lines.join(' ')} Актуальные остатки по оттенкам и объёмам на сегодня уточняйте по телефону ${BEAUTY_CENTER_PHONE}. Что вам ближе — уход, SPF или макияж?`;
}
