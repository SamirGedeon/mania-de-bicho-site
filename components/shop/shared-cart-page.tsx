'use client';
import { useEffect, useState } from 'react';
import { parseSharedCart } from '@/lib/cart-share';
import { cartTotals } from '@/lib/cart';
import { PaymentSummary } from './payment-summary';
import type { CartItem } from '@/lib/cart';
import {
  productById,
  productHref,
  formatPrice,
  availabilityLabel,
} from '@/data/products';
import { useCart } from './cart-provider';
import { SiteHeader, SiteFooter } from './site-chrome';
import { Button } from '@/components/ui/button';
export function SharedCartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const { dispatch, openCart, ready } = useCart();
  useEffect(() => {
    const sync = () => {
      setItems(parseSharedCart(window.location.hash));
      setLoaded(true);
      setAdded(false);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const available = items.filter(
    (i) => productById.get(i.productId)?.availability !== 'unavailable',
  );
  return (
    <>
      <div className="catalog-header">
        <SiteHeader shop />
      </div>
      <main className="catalog-page">
        <h1>Sacola compartilhada</h1>
        <p>
          Confira a seleção antes de adicionar ao seu carrinho. Os preços abaixo
          são os atuais do catálogo.
        </p>
        {!loaded ? (
          <p>Carregando seleção…</p>
        ) : !items.length ? (
          <p>
            Este link não contém produtos válidos.{' '}
            <a href="/loja/">Explorar a loja</a>
          </p>
        ) : (
          <>
            <ul className="shared-cart-list">
              {items.map((item) => {
                const p = productById.get(item.productId)!;
                return (
                  <li key={p.id}>
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      width={100}
                      height={100}
                    />
                    <div>
                      <a href={productHref(p.id)}>{p.name}</a>
                      <p>
                        {p.size} · {availabilityLabel(p)}
                      </p>
                      <p>
                        {item.quantity} × {formatPrice(p.priceCents)} ={' '}
                        <strong>
                          {formatPrice(item.quantity * p.priceCents)}
                        </strong>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p>
              <strong>
                Total: {formatPrice(cartTotals(items).totalCents)}
              </strong>
            </p>
            <PaymentSummary totalCents={cartTotals(items).totalCents} />
            {items.some(
              (i) => productById.get(i.productId)?.availability === 'demo',
            ) && (
              <p className="demo-note">
                Catálogo demonstrativo. Produtos, fotos e valores ilustrativos.
              </p>
            )}
            <p>
              A seleção será somada aos itens que você já tem, até 99 unidades
              por produto. Itens indisponíveis não serão adicionados.
            </p>
            <Button
              className="pill cta"
              disabled={!ready || added || !available.length}
              onClick={() => {
                dispatch({ type: 'restore', items: available });
                setAdded(true);
                openCart();
              }}
            >
              {added
                ? 'Seleção adicionada'
                : 'Adicionar seleção ao meu carrinho'}
            </Button>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
