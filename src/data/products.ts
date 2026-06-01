import type { Product } from '../types/product';

const PRODUCT_IMAGES = new Set([
  'pankartin', 'pano-pan-baby', 'metfolipan', 'oleopan', 'pan-bio',
  'pannevrol', 'pantoren', 'pantovit', 'panvit-mama', 'protektol-pan',
]);

/**
 * Build a Schema.org MedicalWebPage object suitable for JSON-LD.
 *
 * Почему НЕ DietarySupplement/Product: рич-результат «товар» в Google требует
 * один из offers / review / aggregateRating. У PanPharm нет онлайн-цен (только
 * дистрибуция) и нет настоящих отзывов, поэтому помечать страницы товаром
 * нельзя — иначе Rich Results Test выдаёт критичную ошибку. MedicalWebPage —
 * корректный тип для информационной медицинской страницы, для него offers не
 * требуется. Состав сохраняется как список Substance в `about`.
 *
 * Данные о составе (activeIngredients) и форме лежат в каталоге — если у бренда
 * появятся фиксированные цены, можно вернуть DietarySupplement + offers.
 */
export function buildProductSchema(product: Product, site: URL | undefined, description: string) {
  const image = PRODUCT_IMAGES.has(product.slug) ? `/${product.slug}.jpeg` : '/logo.png';
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: product.name,
    description,
    url: new URL(`/${product.slug}/`, site).toString(),
    inLanguage: 'ru',
    primaryImageOfPage: { '@type': 'ImageObject', url: new URL(image, site).toString() },
    about: { '@type': 'Substance', name: product.name },
  };

  if (product.activeIngredients?.length) {
    schema.mentions = product.activeIngredients.map((i) => ({
      '@type': 'Substance',
      name: i.name,
    }));
  }

  return schema;
}

/** Build a Schema.org BreadcrumbList: Главная → Продукция → Препарат. */
export function buildBreadcrumbSchema(product: Product, site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: new URL('/', site).toString() },
      { '@type': 'ListItem', position: 2, name: 'Продукция', item: new URL('/#products', site).toString() },
      { '@type': 'ListItem', position: 3, name: product.name, item: new URL(`/${product.slug}/`, site).toString() },
    ],
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
    dosageForm: 'таблетки',
    servingSize: '60 таблеток',
    activeIngredients: [
      { name: 'Глюкозамина сульфат', amount: '300 мг' },
      { name: 'Сульфат хондроитина', amount: '250 мг' },
      { name: 'Метилсульфонилметан (МСМ)', amount: '100 мг' },
      { name: 'Коллаген', amount: '100 мг' },
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
    dosageForm: 'сироп',
    servingSize: '150 мл',
    activeIngredients: [
      { name: 'L-карнитин', amount: '400 мг' },
      { name: 'Коэнзим Q10', amount: '5 мг' },
      { name: 'Витамин B12', amount: '0,5 мкг' },
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
    dosageForm: 'капли',
    servingSize: '50 мл',
    activeIngredients: [
      { name: 'γ-Аминомасляная кислота (ГАМК)', amount: '100 мг' },
      { name: 'Цитиколин', amount: '100 мг' },
      { name: 'Глицин', amount: '50 мг' },
      { name: 'Глицинат магния', amount: '40 мг' },
      { name: 'Глютаминовая кислота', amount: '25 мг' },
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
    dosageForm: 'таблетки',
    activeIngredients: [
      { name: 'Метилфолат (Витамин B9)', amount: '400 мкг' },
      { name: 'Витамин B6', amount: '1,3 мг' },
      { name: 'Витамин B12', amount: '0,5 мкг' },
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
    dosageForm: 'капсулы',
    servingSize: '30 капсул',
    activeIngredients: [
      { name: 'Магния хелат (бисглицинат)', amount: '670 мг' },
      { name: 'Чистого магния', amount: 'до 134 мг' },
      { name: 'Цитрат магния', amount: '210 мг' },
      { name: 'Витамин B6 (пиридоксин)', amount: '2 мг' },
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
    dosageForm: 'саше',
    servingSize: '30 саше',
    activeIngredients: [
      { name: 'Bifidobacterium BB-12', amount: '12,2·10⁹ КОЕ' },
      { name: 'Lactobacillus rhamnosus GG', amount: '2·10⁹ КОЕ' },
      { name: 'Lactobacillus acidophilus LA', amount: '5·10⁸ КОЕ' },
      { name: 'Инулин (пребиотик)', amount: '≥ 720 мг' },
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
    dosageForm: 'таблетки',
    servingSize: '30 таблеток',
    activeIngredients: [
      { name: 'Цитиколин', amount: '100 мг' },
      { name: 'Инозитол', amount: '100 мг' },
      { name: 'Диметилглицин гидрохлорид', amount: '100 мг' },
      { name: 'Фосфатидилхолин (20%)', amount: '50 мг' },
      { name: 'Гинкго Билоба', amount: '50 мг' },
      { name: 'Фолиевая кислота', amount: '200 мкг' },
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
    dosageForm: 'капсулы',
    servingSize: '30 капсул',
    activeIngredients: [
      { name: 'Экстракт пассифлоры', amount: '150 мг' },
      { name: 'Магний лактат дигидрат', amount: '150 мг' },
      { name: 'Экстракт боярышника', amount: '100 мг' },
      { name: 'Экстракт мелиссы', amount: '100 мг' },
      { name: 'L-триптофан', amount: '50 мг' },
      { name: 'Витамин B6 (пиридоксин)', amount: '3 мг' },
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
    dosageForm: 'капсулы',
    servingSize: '30 капсул',
    activeIngredients: [
      { name: 'D-манноза', amount: '200 мг' },
      { name: 'Экстракт плодов клюквы', amount: '250 мг' },
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
    dosageForm: 'капли',
    servingSize: '30 мл',
    activeIngredients: [
      { name: 'Липосомальный кальций', amount: '158 мг' },
      { name: 'Магний (гидроксид)', amount: '120 мг' },
      { name: 'Глюконат цинка', amount: '75 мг' },
      { name: 'Витамин D3', amount: '200 МЕ' },
      { name: 'Витамин K2', amount: '1,2 МЕ' },
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
    dosageForm: 'капли',
    servingSize: '30 мл',
    activeIngredients: [
      { name: 'Витамин D₃', amount: '400 МЕ' },
      { name: 'Витамин K₂', amount: '1,2 МЕ' },
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
    dosageForm: 'капсулы',
    servingSize: '30 капсул',
    activeIngredients: [
      { name: 'Фолиевая кислота', amount: '400 мкг' },
      { name: 'Железо', amount: '25 мг' },
      { name: 'Кальций', amount: '200 мг' },
      { name: 'Йод', amount: '150 мкг' },
      { name: 'Витамин D₃', amount: '10 мкг' },
      { name: 'Витамин B12', amount: '4,5 мкг' },
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
    dosageForm: 'капсулы',
    servingSize: '30 капсул',
    activeIngredients: [
      { name: 'Индол-3-карбинол (I3C)', amount: '500 мг' },
      { name: 'Эпигаллокатехин-3-галлат (EGCG)', amount: '62 мг' },
      { name: 'Эпикатехингаллат (ECG)', amount: '17 мг' },
      { name: 'Эпигаллокатехин (EGC)', amount: '13 мг' },
      { name: 'Эссенциальные фосфолипиды', amount: '75 мг' },
    ],
  },
];
