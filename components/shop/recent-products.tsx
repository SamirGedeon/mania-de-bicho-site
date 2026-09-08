'use client';
import { productById } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useBrowsing } from './browsing-provider';
import { ProductCard } from './product-card';
export function RecentProducts({ excludeId }: { excludeId?: string }) {
  const { recent, ready, dispatch } = useBrowsing();
  const products = recent
    .filter((id) => id !== excludeId)
    .slice(0, 4)
    .map((id) => productById.get(id)!)
    .filter(Boolean);
  if (!ready || !products.length) return null;
  return (
    <section className="recent-products" aria-labelledby="recent-title">
      <div className="recent-heading">
        <div>
          <span className="tag">Continue de onde parou</span>
          <h2 id="recent-title">Vistos recentemente</h2>
        </div>
        <Button
          variant="ghost"
          className="clear-filters"
          onClick={() => dispatch({ type: 'clear-recent' })}
        >
          Limpar histórico
        </Button>
      </div>
      <div className="catalog-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
