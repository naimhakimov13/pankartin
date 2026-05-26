import type { Product } from '../types/product';

const PRODUCT_IMAGES = new Set([
  'pankartin', 'pano-pan-baby', 'metfolipan', 'oleopan', 'pan-bio',
  'pannevrol', 'pantoren', 'pantovit', 'panvit-mama', 'protektol-pan',
]);

/** Build a Schema.org Product object suitable for JSON-LD. */
export function buildProductSchema(product: Product, site: URL | undefined, description: string) {
  const image = PRODUCT_IMAGES.has(product.slug) ? `/${product.slug}.jpeg` : '/logo.png';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    image: new URL(image, site).toString(),
    url: new URL(`/${product.slug}`, site).toString(),
    brand: { '@type': 'Brand', name: 'PanPharm' },
    category: product.tag,
  };
}

/**
 * Single source of truth for the product catalogue.
 * Consumed by Header (nav links), Footer (Продукция column), and ProductsGrid
 * on the home page. Adding a new product = adding a new entry here + a
 * matching src/pages/<slug>.astro file.
 */
export const products: Product[] = [
  {
    slug: 'pan-pro',
    name: 'Pan Pro',
    navLabel: 'Pan Pro',
    theme: 'theme-panpro',
    capClass: 'c1',
    tag: 'Для суставов',
    summary: 'Глюкозамин + Хондроитин + МСМ с коллагеном',
    bullets: [
      'Восполняет дефицит коллагена и хондроитина',
      'Профилактика остеоартроза и остеохондроза',
      'Восстановление после травм и операций',
      '60 таблеток · курс приёма 6 месяцев',
    ],
  },
  {
    slug: 'pankartin',
    name: 'PanKartin',
    navLabel: 'PanKartin',
    theme: 'theme-pankartin',
    capClass: 'c2',
    tag: 'Для детей',
    summary: 'L-карнитин + Коэнзим Q10 + Витамин B12',
    bullets: [
      'Обеспечивает организм энергией',
      'Повышает устойчивость организма',
      'Способствует росту и развитию ребёнка',
      '150 мл сироп · курс приёма 1 месяц',
    ],
  },
  {
    slug: 'pano-pan-baby',
    name: 'Pano-Pan baby',
    navLabel: 'Pano-Pan baby',
    theme: 'theme-panopan',
    capClass: 'c3',
    tag: 'Для детей',
    summary: 'Нейрорегулятор для головного мозга',
    bullets: [
      'Улучшает память, внимание и концентрацию',
      'Снижает уровень стресса и тревожности',
      'Поддержка нервной системы ребёнка',
      'Капли 50 мл · для детей от 2 лет',
    ],
  },
  {
    slug: 'metfolipan',
    name: 'MetfoliPan',
    navLabel: 'MetfoliPan',
    theme: 'theme-metfolipan',
    capClass: 'c4',
    tag: 'Для женщин',
    summary: 'Метилфолат + Витамины B6 и B12',
    bullets: [
      'Активная форма фолиевой кислоты',
      'Для планирования беременности и I триместра',
      'При анемии, утомляемости и в косметологии',
      'Таблетки · приём 1–3 раза в день',
    ],
  },
  {
    slug: 'oleopan',
    name: 'OleoPan',
    navLabel: 'OleoPan',
    theme: 'theme-oleopan',
    capClass: 'c5',
    tag: 'Для нервной системы',
    summary: 'Магний бисглицинат + Цитрат магния + B6',
    bullets: [
      'Восполняет дефицит магния',
      'Снижает тревожность и улучшает сон',
      'Поддерживает сердце и сосуды',
      '30 капсул · 1 капсула в день',
    ],
  },
  {
    slug: 'pan-bio',
    name: 'Pan-Bio',
    navLabel: 'Pan-Bio',
    theme: 'theme-panbio',
    capClass: 'c6',
    tag: 'Для микрофлоры',
    summary: 'Бифидо- и лактобактерии + Инулин',
    bullets: [
      'Лечение и профилактика дисбактериоза',
      'Совместим с антибиотиками',
      'Безопасен с 2 лет, беременным и кормящим',
      '30 саше · растворить в воде, соке или йогурте',
    ],
  },
  {
    slug: 'pannevrol',
    name: 'Pannevrol',
    navLabel: 'Pannevrol',
    theme: 'theme-pannevrol',
    capClass: 'c7',
    tag: 'Для нервной системы',
    summary: 'Цитиколин + Гинкго Билоба + Витамины B',
    bullets: [
      'Нейропротектор для головного и периферического мозга',
      'Восстанавливает повреждённую миелиновую оболочку',
      'Улучшает память, внимание и психоэмоциональный статус',
      '30 таблеток · 1 таблетка в день',
    ],
  },
  {
    slug: 'pan-sedil',
    name: 'Pan-Sedil',
    navLabel: 'Pan-Sedil',
    theme: 'theme-pansedil',
    capClass: 'c8',
    tag: 'Сон и спокойствие',
    summary: 'Пассифлора + Мелисса + Боярышник + L-триптофан',
    bullets: [
      'Мягкое успокаивающее действие, не вызывает привыкания',
      'Облегчает наступление естественного сна и углубляет его',
      'Снижает раздражительность и тревожность',
      '30 капсул · 1 капсула вечером за 30–60 мин до сна',
    ],
  },
  {
    slug: 'pansist',
    name: 'Pansist',
    navLabel: 'Pansist',
    theme: 'theme-pansist',
    capClass: 'c9',
    tag: 'Мочевыводящие пути',
    summary: 'D-манноза + Экстракт клюквы',
    bullets: [
      'Здоровье мочевыводящих путей и борьба с инфекциями',
      'Профилактика рецидивов острого и хронического цистита',
      'Блокирует прикрепление E. coli и других патогенов',
      '30 капсул · разрешён при беременности',
    ],
  },
  {
    slug: 'pantoren',
    name: 'Pantoren Kids',
    navLabel: 'Pantoren Kids',
    theme: 'theme-pantoren',
    capClass: 'c10',
    tag: 'Для детей',
    summary: 'Липосомальный кальций + Магний + Цинк + D3 + K2',
    bullets: [
      'Биодоступность липосомального кальция до 99%',
      'Поддерживает рост костей и зубов с первых дней жизни',
      'Магний, цинк, витамины D3 и K2 для усвоения минералов',
      'Капли 30 мл · от 6 месяцев и старше',
    ],
  },
  {
    slug: 'pantovit',
    name: 'PantoVit',
    navLabel: 'PantoVit',
    theme: 'theme-pantovit',
    capClass: 'c11',
    tag: 'Для всей семьи',
    summary: 'Витамин D3 + Витамин K2',
    bullets: [
      'Оптимальная дозировка витаминов D₃ и K₂',
      'Синергия: K₂ направляет кальций в кости, а не в сосуды',
      'Подходит детям, взрослым и беременным',
      'Капли 30 мл · 4–5 капель в день',
    ],
  },
  {
    slug: 'panvit-mama',
    name: 'Panvit-mama',
    navLabel: 'Panvit-mama',
    theme: 'theme-panvit-mama',
    capClass: 'c12',
    tag: 'Для женщин',
    summary: 'Мультивитамины для планирования, беременности и лактации',
    bullets: [
      '13 витаминов и 7 минералов в одной капсуле',
      'Покрывает суточную норму матери и ребёнка',
      'Для планирования, беременности и кормления',
      '30 капсул · 1–2 капсулы в день',
    ],
  },
  {
    slug: 'protektol-pan',
    name: 'Protektol-Pan',
    navLabel: 'Protektol-Pan',
    theme: 'theme-protektol',
    capClass: 'c13',
    tag: 'Гормональный баланс',
    summary: 'Индол-3-карбинол + EGCG + Фосфолипиды',
    bullets: [
      'Поддерживает гормональный баланс у женщин и мужчин',
      'Онкопротектор: толстая кишка, печень, простата, лёгкие',
      'При мастопатии, эндометриозе, аденоме простаты',
      '30 капсул · 1 капсула 2 раза в день',
    ],
  },
];
