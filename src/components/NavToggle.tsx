import { useState } from 'react';
import type { ActivePage, Product } from '../types/product';

interface Props {
  products: Product[];
  active?: ActivePage;
}

/**
 * Header nav + mobile burger. The products list lives in a dropdown:
 *  - Desktop (≥881px): panel opens on hover/focus via CSS, click also toggles.
 *  - Mobile (≤880px): trigger toggles an inline accordion via `data-open`.
 *
 * State is local to this component; CSS uses `data-open` on both the
 * outer <nav> (burger) and the dropdown wrapper.
 */
export default function NavToggle({ products, active }: Props) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const productsActive =
    active === 'products' || products.some((p) => p.slug === active);

  const closeAll = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  const linkClass = (id: ActivePage, extra = '') =>
    [extra, active === id ? 'active' : ''].filter(Boolean).join(' ') || undefined;

  return (
    <>
      <button
        type="button"
        className="nav-burger"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </button>
      <nav className="nav-links" data-open={open}>
        <a href="/" className={linkClass('home')} onClick={closeAll}>
          Главная
        </a>

        <div className="nav-dropdown" data-open={productsOpen}>
          <button
            type="button"
            className={'nav-dropdown-trigger' + (productsActive ? ' active' : '')}
            aria-haspopup="menu"
            aria-expanded={productsOpen}
            onClick={() => setProductsOpen((v) => !v)}
          >
            Продукция
            <span className="nav-chevron" aria-hidden="true" />
          </button>
          <div className="nav-dropdown-panel" role="menu">
            <a
              href="/#products"
              className={active === 'products' ? 'active' : undefined}
              onClick={closeAll}
              role="menuitem"
            >
              Все продукты
            </a>
            {products.map((p) => (
              <a
                key={p.slug}
                href={`/${p.slug}`}
                className={active === p.slug ? 'active' : undefined}
                onClick={closeAll}
                role="menuitem"
              >
                {p.navLabel}
              </a>
            ))}
          </div>
        </div>

        <a
          href="/#contacts"
          className={linkClass('contacts', 'nav-cta')}
          onClick={closeAll}
        >
          Контакты
        </a>
      </nav>
    </>
  );
}
