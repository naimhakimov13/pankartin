export type ProductSlug =
  | 'pan-pro'
  | 'pankartin'
  | 'pano-pan-baby'
  | 'metfolipan'
  | 'oleopan'
  | 'pan-bio'
  | 'pannevrol'
  | 'pan-sedil'
  | 'pansist'
  | 'pantoren'
  | 'pantovit'
  | 'panvit-mama'
  | 'protektol-pan';

export type ThemeClass =
  | 'theme-panpro'
  | 'theme-pankartin'
  | 'theme-panopan'
  | 'theme-metfolipan'
  | 'theme-oleopan'
  | 'theme-panbio'
  | 'theme-pannevrol'
  | 'theme-pansedil'
  | 'theme-pansist'
  | 'theme-pantoren'
  | 'theme-pantovit'
  | 'theme-panvit-mama'
  | 'theme-protektol';

export type CapClass =
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7'
  | 'c8' | 'c9' | 'c10' | 'c11' | 'c12' | 'c13';

export interface Product {
  /** URL slug — matches the file name in src/pages/ */
  slug: ProductSlug;
  /** Display name, e.g. "Pan Pro" */
  name: string;
  /** Label shown in the header nav */
  navLabel: string;
  /** Body class for the colour theme */
  theme: ThemeClass;
  /** product-cap gradient variant used on the home grid */
  capClass: CapClass;
  /** Category badge on the home card */
  tag: string;
  /** One-line description under the card title */
  summary: string;
  /** 4 lines rendered inside the card's <ul> */
  bullets: string[];
}

/** Accepts a product slug or one of the static page identifiers */
export type ActivePage = ProductSlug | 'home' | 'products' | 'contacts';
