/* Native images and links serve the static export. */
/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { storeInfo } from '@/data/store';
import { whatsappHref } from '@/lib/whatsapp';
import { productHref } from '@/data/products';
import { useBrowsing } from './browsing-provider';
import { RecentProducts } from './recent-products';
import { SearchHelp } from './search-help';
import { StoreDetails } from './store-details';
import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  Search,
  ShoppingBag,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import {
  categories,
  categoryHref,
  products,
  formatPrice,
} from '@/data/products';
import { services } from '@/data/site-content';
import { useCart } from './cart-provider';

function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="detail-dialog">
        <DialogTitle>Vamos encontrar o melhor para seu pet</DialogTitle>
        <DialogDescription>
          Converse com a nossa equipe pelo WhatsApp ou visite a loja.
        </DialogDescription>
        <p>{storeInfo.address}</p>
        <a
          className="pill cta"
          href={whatsappHref(storeInfo.whatsapp)!}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar pelo WhatsApp
        </a>
        <a href="/contato/">Endereço e informações da loja</a>
      </DialogContent>
    </Dialog>
  );
}
const nav = [
  ['Início', '/'],
  ['Serviços', '/#servicos'],
  ['Produtos', '/#cuidados'],
  ['Loja', '/loja/'],
  ['Categorias', '/loja/#categorias'],
  ['Contato', '/contato/'],
];
const searchable: {
  key: string;
  name: string;
  href: string;
  image?: string;
  priceCents?: number;
  demo?: boolean;
}[] = [
  ...categories.map((c) => ({
    key: c.slug,
    name: c.name,
    href: categoryHref(c.slug),
  })),
  ...products.map((p) => ({
    key: p.id,
    image: p.image,
    priceCents: p.priceCents,
    demo: p.availability === 'demo',
    name: `${p.brand} — ${p.name} · ${p.size}`,
    href: productHref(p.id),
  })),
  ...services.map((s) => ({ key: s.name, name: s.name, href: '/#servicos' })),
];
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
export function SiteHeader({ shop = false }: { shop?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [contact, setContact] = useState(false);
  const [query, setQuery] = useState('');
  const { count, openCart } = useCart();
  const { favorites } = useBrowsing();
  const results = searchable.filter((item) =>
    normalize(query.trim())
      .split(/\s+/)
      .every((term) => normalize(item.name).includes(term)),
  );
  return (
    <>
      <header className="header">
        <div className="topline">
          <span>
            <Heart size={15} /> Carinho em cada detalhe
          </span>
          <span>
            <Clock3 size={16} /> Produtos para todas as fases
          </span>
        </div>
        <div className="nav-shell">
          <a className="brand" href="/" aria-label="Mania de Bicho, início">
            <img src="/assets/logo.png" alt="Mania de Bicho" />
          </a>
          <nav aria-label="Navegação principal">
            {nav.map(([label, href], i) => (
              <a
                key={label}
                className={(shop ? i === 3 : i === 0) ? 'active' : ''}
                href={href}
                onClick={
                  label === 'Contato'
                    ? (e) => {
                        e.preventDefault();
                        setContact(true);
                      }
                    : undefined
                }
              >
                {label}
                {i < 5 && <ChevronDown size={12} />}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a
              className="icon-button favorites-trigger"
              href="/favoritos"
              aria-label={`Ver favoritos, ${favorites.length} ${favorites.length === 1 ? 'produto' : 'produtos'}`}
            >
              <Heart
                size={21}
                fill={favorites.length ? 'currentColor' : 'none'}
              />
              {favorites.length > 0 && (
                <span className="header-count" aria-hidden="true">
                  {favorites.length > 99 ? '99+' : favorites.length}
                </span>
              )}
            </a>
            <button
              className="icon-button cart-trigger"
              aria-label={`Abrir carrinho, ${count} itens`}
              onClick={openCart}
            >
              <ShoppingBag size={21} />
              <sup aria-hidden="true">{count}</sup>
            </button>
            <button
              className="icon-button"
              aria-label="Buscar no site"
              onClick={() => setSearch(true)}
            >
              <Search size={21} />
            </button>
            <a
              className="pill cta"
              href={whatsappHref(storeInfo.whatsapp)!}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <button
              className="icon-button mobile-toggle"
              aria-label="Abrir menu"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <ContactDialog open={contact} onOpenChange={setContact} />
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="search-dialog">
          <DialogTitle>O que você procura?</DialogTitle>
          <DialogDescription>
            Busque produtos, serviços e categorias para seu pet.
          </DialogDescription>
          <input
            aria-label="Buscar produtos, serviços e categorias"
            placeholder="Digite para buscar…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <output className="search-count" aria-live="polite">
            {results.length} resultados
          </output>
          <div className="search-results">
            {results.length ? (
              results.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setSearch(false)}
                >
                  {item.image && (
                    <img
                      className="search-thumbnail"
                      src={item.image}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                    />
                  )}
                  <span className="search-result-copy">
                    {item.name}
                    {item.priceCents !== undefined && (
                      <strong>{formatPrice(item.priceCents)}</strong>
                    )}
                    {item.demo && <small>Produto demonstrativo</small>}
                  </span>
                  <ArrowRight size={16} />
                </a>
              ))
            ) : (
              <SearchHelp query={query} />
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent className="mobile-menu">
          <SheetTitle>Mania de Bicho</SheetTitle>
          <a
            className="pill cta"
            href={whatsappHref(storeInfo.whatsapp)!}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp ↗
          </a>
          {nav.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(event) => {
                setMenu(false);
                if (label === 'Contato') {
                  event.preventDefault();
                  setContact(true);
                }
              }}
            >
              {label}
              <ArrowRight size={18} />
            </a>
          ))}
        </SheetContent>
      </Sheet>
    </>
  );
}
export function SiteFooter({
  excludeRecentId,
}: { excludeRecentId?: string } = {}) {
  const [contact, setContact] = useState(false);
  return (
    <>
      <RecentProducts excludeId={excludeRecentId} />
      <StoreDetails />
      <footer id="contato">
        <a href="/" aria-label="Voltar ao início">
          <img src="/assets/logo.png" alt="Mania de Bicho" />
        </a>
        <p>Carinho em cada detalhe.</p>
        <button className="pill cta" onClick={() => setContact(true)}>
          Fale com a gente <ArrowRight size={16} />
        </button>
      </footer>
      <ContactDialog open={contact} onOpenChange={setContact} />
    </>
  );
}
