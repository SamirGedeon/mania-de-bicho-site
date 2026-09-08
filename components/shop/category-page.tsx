/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { useState } from 'react';
import { CatalogFilters } from './catalog-filters';
import { emptyFilters, filterProducts } from '@/lib/catalog';
import { productHref, availabilityLabel } from '@/data/products';
import { ArrowLeft, ArrowRight, Bone, ShoppingBag } from 'lucide-react';
import {
  categories,
  categoryHref,
  formatPrice,
  products,
} from '@/data/products';
import type { CategorySlug } from '@/data/products';
import { MAX_QUANTITY } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { useCart } from './cart-provider';
import { SiteHeader, SiteFooter } from './site-chrome';

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = categories.find((c) => c.slug === slug)!;
  const [filters, setFilters] = useState({ ...emptyFilters });
  const source = products.filter((p) => p.category === slug);
  const listing = filterProducts(source, filters);
  const { addItem, items, ready } = useCart();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para os produtos
      </a>
      <div className="catalog-header">
        <SiteHeader shop />
      </div>
      <main className="catalog-page" id="conteudo">
        <nav className="catalog-breadcrumb" aria-label="Caminho da página">
          <a href="/loja/">Loja</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{category.name}</span>
        </nav>
        <div className="catalog-heading">
          <div>
            <span className="tag">
              <Bone size={16} />
              Encontre o que seu pet precisa
            </span>
            <h1>{category.name}</h1>
            <p>{category.text}</p>
          </div>
          <a className="catalog-back" href="/loja/#categorias">
            <ArrowLeft size={16} /> Todas as categorias
          </a>
        </div>
        <nav
          className="category-navigation"
          aria-label="Categorias de produtos"
        >
          {categories.map((c) => (
            <a
              key={c.slug}
              href={categoryHref(c.slug)}
              className={`pill ${c.slug === slug ? 'cta' : 'category-link'}`}
              aria-current={c.slug === slug ? 'page' : undefined}
            >
              {c.name}
            </a>
          ))}
        </nav>
        <CatalogFilters
          products={source}
          value={filters}
          onChange={setFilters}
        />
        <div className="catalog-caption">
          <output aria-live="polite">
            {listing.length} de {source.length} produtos
          </output>
          {source.some((p) => p.availability === 'demo') && (
            <p>
              Catálogo demonstrativo · marcas, imagens e preços ilustrativos
            </p>
          )}
        </div>
        {!listing.length && (
          <div className="catalog-no-results">
            <h2>Nenhum produto encontrado</h2>
            <p>Experimente outro termo ou limpe os filtros.</p>
            <Button
              className="pill cta"
              onClick={() => setFilters({ ...emptyFilters })}
            >
              Limpar filtros
            </Button>
          </div>
        )}
        <div className="catalog-grid">
          {listing.map((product) => {
            const quantity =
              items.find((item) => item.productId === product.id)?.quantity ??
              0;
            const atLimit = quantity >= MAX_QUANTITY;
            return (
              <article
                className="catalog-product"
                id={product.id}
                key={product.id}
              >
                <a
                  href={productHref(product.id)}
                  className="catalog-product-image"
                  aria-label={`Ver detalhes de ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    width={360}
                    height={280}
                  />
                </a>
                <div className="catalog-product-content">
                  <span className="product-brand">{product.brand}</span>
                  <h2>
                    <a href={productHref(product.id)}>{product.name}</a>
                  </h2>
                  <p className="product-size">{product.size}</p>
                  <p className="product-availability">
                    {availabilityLabel(product)}
                  </p>
                  <strong className="product-price">
                    {formatPrice(product.priceCents)}
                  </strong>
                  <Button
                    className="pill cta add-to-cart"
                    disabled={
                      !ready ||
                      atLimit ||
                      product.availability === 'unavailable'
                    }
                    onClick={() => addItem(product.id)}
                    aria-label={`Adicionar ao carrinho: ${product.name}, ${product.size}`}
                  >
                    <ShoppingBag size={17} />
                    {product.availability === 'unavailable'
                      ? 'Indisponível'
                      : atLimit
                        ? 'Limite de 99 unidades'
                        : 'Adicionar ao carrinho'}
                    {!atLimit && <ArrowRight size={16} />}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
