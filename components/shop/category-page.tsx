/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
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
  const listing = products.filter((p) => p.category === slug);
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
        <div className="catalog-caption">
          <span>{listing.length} produtos</span>
          <p>Catálogo demonstrativo · marcas, imagens e preços ilustrativos</p>
        </div>
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
                <div className="catalog-product-image">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    width={360}
                    height={280}
                  />
                </div>
                <div className="catalog-product-content">
                  <span className="product-brand">{product.brand}</span>
                  <h2>{product.name}</h2>
                  <p className="product-size">{product.size}</p>
                  <strong className="product-price">
                    {formatPrice(product.priceCents)}
                  </strong>
                  <Button
                    className="pill cta add-to-cart"
                    disabled={!ready || atLimit}
                    onClick={() => addItem(product.id)}
                    aria-label={`Adicionar ao carrinho: ${product.name}, ${product.size}`}
                  >
                    <ShoppingBag size={17} />
                    {atLimit
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
