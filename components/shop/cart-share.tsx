'use client';
import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sharedCartUrl } from '@/lib/cart-share';
import type { CartItem } from '@/lib/cart';
export function CartShare({ items }: { items: CartItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const url = sharedCartUrl(items, typeof window === 'undefined' ? undefined : window.location.origin);
  return (
    <section className="cart-share">
      <Button
        variant="outline"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <Share2 size={17} />
        Compartilhar sacola
      </Button>
      {expanded && (
        <div>
          <p>
            Envie esta seleção para alguém. Alterações posteriores no carrinho
            não modificam este link.
          </p>
          <label>
            Link da sacola
            <input readOnly value={url} onFocus={(e) => e.target.select()} />
          </label>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setMessage('Link copiado!');
              } catch {
                setMessage('Selecione o link acima e copie manualmente.');
              }
            }}
          >
            Copiar link
          </Button>
          <a
            className="pill cta"
            href={`https://wa.me/?text=${encodeURIComponent(`Olha esta seleção da Mania de Bicho!\n${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Compartilhar no WhatsApp
          </a>
          <output aria-live="polite">{message}</output>
        </div>
      )}
    </section>
  );
}
