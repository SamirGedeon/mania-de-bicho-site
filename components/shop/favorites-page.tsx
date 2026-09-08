/* oxlint-disable next/no-html-link-for-pages */
'use client';
import { Heart } from 'lucide-react';
import { productById } from '@/data/products';
import { useBrowsing } from './browsing-provider';
import { ProductCard } from './product-card';
import { SiteHeader, SiteFooter } from './site-chrome';
export function FavoritesPage() {
  const { favorites, ready, storageAvailable } = useBrowsing();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para os favoritos
      </a>
      <div className="catalog-header">
        <SiteHeader shop />
      </div>
      <main className="catalog-page" id="conteudo">
        <div className="catalog-heading">
          <div>
            <span className="tag">
              <Heart size={16} />
              Guarde suas escolhas
            </span>
            <h1>Seus favoritos</h1>
            <p>Os produtos que você salvou, reunidos aqui.</p>
          </div>
          <a href="/loja/#categorias" className="catalog-back">
            Continuar explorando →
          </a>
        </div>
        {!ready ? (
          <p>Carregando seus favoritos…</p>
        ) : !favorites.length ? (
          <div className="catalog-no-results">
            <Heart size={36} />
            <h2>Ainda não tem favoritos</h2>
            <p>Toque no coração de um produto para guardar sua escolha.</p>
            <a href="/loja/#categorias" className="pill cta">
              Explorar produtos
            </a>
          </div>
        ) : (
          <>
            <p className="favorites-count" aria-live="polite">
              {favorites.length}{' '}
              {favorites.length === 1 ? 'produto salvo' : 'produtos salvos'}{' '}
              neste navegador
            </p>
            <div className="catalog-grid">
              {favorites.map((id) => (
                <ProductCard key={id} product={productById.get(id)!} />
              ))}
            </div>
          </>
        )}
        {!storageAvailable && (
          <output className="storage-notice">
            O navegador não permitiu salvar seus favoritos. Eles ficam
            disponíveis enquanto esta página estiver aberta.
          </output>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
