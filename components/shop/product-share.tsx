'use client';
import { useState } from 'react';
import { Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Product } from '@/data/products';
import { shareProductUrl, shareProductWhatsApp } from '@/lib/product-share';
export function ProductShare({ product }: { product: Product }) {
  const [status, setStatus] = useState('');
  const [manual, setManual] = useState(false);
  const url = shareProductUrl(product.id);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Link copiado!');
      setManual(false);
    } catch {
      setManual(true);
      setStatus('Selecione e copie o link abaixo.');
    }
  }
  return (
    <section className="product-share" aria-label="Compartilhar produto">
      <span>Compartilhe sua escolha</span>
      <div>
        <Button variant="ghost" onClick={() => void copy()}>
          <Copy size={17} />
          Copiar link
        </Button>
        <a
          href={shareProductWhatsApp(product)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={17} />
          Compartilhar no WhatsApp
        </a>
      </div>
      <output aria-live="polite">{status}</output>
      {manual && (
        <label htmlFor="share-product-link">
          Link do produto
          <Input
            id="share-product-link"
            aria-label="Link do produto"
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
          />
        </label>
      )}
    </section>
  );
}
