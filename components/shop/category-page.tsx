/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { useState } from 'react';
import { CatalogFilters } from './catalog-filters';
import { emptyFilters, filterProducts } from '@/lib/catalog';
import { ProductCard } from './product-card';
import { PetShortcuts } from './pet-shortcuts';
import { SearchHelp } from './search-help';
import { ArrowLeft, Bone } from 'lucide-react';
import { categories, categoryHref, products } from '@/data/products';
import type { CategorySlug } from '@/data/products';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter } from './site-chrome';

export function CategoryPage({
  slug,
  pet,
}: {
  slug?: CategorySlug;
  pet?: 'dog' | 'cat';
}) {
  const category = categories.find((c) => c.slug === slug) ?? {
    name: pet === 'dog' ? 'Produtos para cães' : 'Produtos para gatos',
    text: 'Explore as categorias e encontre os produtos para seu pet.',
  };
  const [filters, setFilters] = useState({ ...emptyFilters });
  const source = products.filter(
    (p) => (!slug || p.category === slug) && (!pet || p.petTypes.includes(pet)),
  );
  const listing = filterProducts(source, filters);
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
        <PetShortcuts selected={pet} />
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
            <SearchHelp query={filters.query} />
            <Button
              className="pill cta"
              onClick={() => setFilters({ ...emptyFilters })}
            >
              Limpar filtros
            </Button>
          </div>
        )}
        <div className="catalog-grid">
          {listing.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
