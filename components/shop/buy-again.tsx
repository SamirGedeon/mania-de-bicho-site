'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { REORDER_KEY, REORDER_EVENT, reorderItems } from '@/lib/reorder';
import { readCart, cartTotals } from '@/lib/cart';
import type { CartItem } from '@/lib/cart';
import { formatPrice } from '@/data/products';
export function BuyAgain({
  onRestore,
}: {
  onRestore: (items: CartItem[]) => void;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    const load = () => {
      try {
        setRaw(localStorage.getItem(REORDER_KEY));
        setAdded(false);
      } catch {
        setRaw(null);
      }
    };
    load();
    window.addEventListener('storage', load);
    window.addEventListener(REORDER_EVENT, load);
    return () => {
      window.removeEventListener('storage', load);
      window.removeEventListener(REORDER_EVENT, load);
    };
  }, []);
  if (!readCart(raw).length) return null;
  const items = reorderItems(raw);
  const totals = cartTotals(items);
  return (
    <section className="buy-again">
      <h3>Comprar novamente</h3>
      <p>
        Última sacola aberta no WhatsApp neste aparelho. Isso não confirma uma
        compra.
      </p>
      <p>
        {totals.count} itens · {formatPrice(totals.totalCents)} nos preços
        atuais.
      </p>
      <p>
        A seleção será somada ao carrinho, até 99 unidades por produto. Itens
        indisponíveis são ignorados.
      </p>
      <Button
        variant="outline"
        disabled={added || !items.length}
        onClick={() => {
          onRestore(items);
          setAdded(true);
        }}
      >
        {added
          ? 'Itens adicionados'
          : items.length
            ? 'Adicionar última sacola'
            : 'Produtos indisponíveis'}
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          try {
            localStorage.removeItem(REORDER_KEY);
          } catch {
            /* Limpa a exibição mesmo sem acesso ao armazenamento. */
          }
          setRaw(null);
        }}
      >
        Esquecer sacola
      </Button>
    </section>
  );
}
