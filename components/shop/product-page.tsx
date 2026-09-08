/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { useState } from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  categories,
  categoryHref,
  formatPrice,
  availabilityLabel,
} from '@/data/products';
import type { Product } from '@/data/products';
import { MAX_QUANTITY } from '@/lib/cart';
import { useCart } from './cart-provider';
import { SiteHeader, SiteFooter } from './site-chrome';

export function ProductPage({ product }: { product: Product }) {
  const { items, ready, addItem } = useCart();
  const photos = product.images?.length ? product.images : [product.image];
  const [photo, setPhoto] = useState(photos[0]);
  const category = categories.find((c) => c.slug === product.category)!;
  const atLimit =
    (items.find((i) => i.productId === product.id)?.quantity ?? 0) >=
    MAX_QUANTITY;
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o produto
      </a>
      <div className="catalog-header">
        <SiteHeader shop />
      </div>
      <main className="catalog-page" id="conteudo">
        <nav className="catalog-breadcrumb" aria-label="Caminho da página">
          <a href="/loja/">Loja</a>
          <span>/</span>
          <a href={categoryHref(category.slug)}>{category.name}</a>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="product-detail">
          <div className="product-gallery">
            <div className="product-main-photo">
              <img
                src={photo}
                alt={product.imageAlt}
                width={640}
                height={560}
                fetchPriority="high"
              />
            </div>
            {photos.length > 1 && (
              <div className="product-thumbnails">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-pressed={photo === src}
                    onClick={() => setPhoto(src)}
                  >
                    <img src={src} alt="" width={80} height={80} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="product-detail-info">
            <span className="product-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            <p className="product-size">{product.size}</p>
            <span className="tag">{availabilityLabel(product)}</span>
            <p className="product-detail-description">{product.description}</p>
            <strong className="product-price">
              {formatPrice(product.priceCents)}
            </strong>
            <Button
              className="pill cta"
              disabled={
                !ready || atLimit || product.availability === 'unavailable'
              }
              onClick={() => addItem(product.id)}
            >
              <ShoppingBag size={18} />
              {product.availability === 'unavailable'
                ? 'Indisponível'
                : atLimit
                  ? 'Limite de 99 unidades'
                  : 'Adicionar ao carrinho'}
            </Button>
            {product.availability === 'demo' && (
              <p className="demo-note">
                Produto, foto, preço e indicações ilustrativos. Consulte a loja
                para conhecer o catálogo disponível.
              </p>
            )}
            <dl className="product-specs">
              <div>
                <dt>Peso / tamanho</dt>
                <dd>{product.size}</dd>
              </div>
              <div>
                <dt>Porte</dt>
                <dd>{product.petSizes.join(', ')}</dd>
              </div>
              <div>
                <dt>Fase da vida</dt>
                <dd>{product.lifeStages.join(', ')}</dd>
              </div>
              <div>
                <dt>Referência</dt>
                <dd>{product.id}</dd>
              </div>
            </dl>
            <a className="catalog-back" href={categoryHref(product.category)}>
              <ArrowLeft size={16} /> Voltar para{' '}
              {category.name.toLocaleLowerCase('pt-BR')}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
