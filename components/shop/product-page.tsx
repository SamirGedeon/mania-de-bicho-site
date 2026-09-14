/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { useEffect } from 'react';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  categories,
  categoryHref,
  formatPrice,
  availabilityLabel,
  productOptions,
  productHref,
} from '@/data/products';
import type { Product } from '@/data/products';
import { ProductGallery } from './product-gallery';
import { BedSizeGuide } from './bed-size-guide';
import { ProductShare } from './product-share';
import { CompareButton } from './compare-provider';
import { PaymentSummary } from './payment-summary';
import { FavoriteButton } from './favorite-button';
import { useBrowsing } from './browsing-provider';
import { whatsappHref, productQuestion } from '@/lib/whatsapp';
import { storeInfo } from '@/data/store';
import { MAX_QUANTITY } from '@/lib/cart';
import { useCart } from './cart-provider';
import { SiteHeader, SiteFooter } from './site-chrome';

export function ProductPage({ product }: { product: Product }) {
  const { items, ready, addItem } = useCart();
  const { dispatch: browse } = useBrowsing();
  useEffect(() => {
    browse({ type: 'view', id: product.id });
  }, [browse, product.id]);
  const questionHref = whatsappHref(
    storeInfo.whatsapp,
    productQuestion(product),
  );
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
          <ProductGallery product={product} />
          <div className="product-detail-info">
            <span className="product-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            <p className="product-size">{product.size}</p>
            <fieldset className="product-options">
              <legend>Escolha o peso / tamanho</legend>
              <div>
                {productOptions(product.id).map((option) => (
                  <a
                    className="product-option"
                    key={option.id}
                    href={productHref(option.id)}
                    aria-current={option.id === product.id ? 'true' : undefined}
                  >
                    <strong>{option.size}</strong>
                    <span>{formatPrice(option.priceCents)}</span>
                    <small>{availabilityLabel(option)}</small>
                  </a>
                ))}
              </div>
            </fieldset>
            {product.category === 'camas-e-conforto' && (
              <BedSizeGuide id={product.id} />
            )}
            <FavoriteButton id={product.id} name={product.name} withLabel />
            <span className="tag">{availabilityLabel(product)}</span>
            <p className="product-detail-description">{product.description}</p>
            <strong className="product-price">
              {formatPrice(product.priceCents)}
            </strong>
            <PaymentSummary totalCents={product.priceCents} />
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
            {questionHref && (
              <a
                className="pill category-link product-question"
                href={questionHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Dúvida sobre este produto?
              </a>
            )}
            {product.availability === 'demo' && (
              <p className="demo-note">
                Produto, foto, preço e indicações ilustrativos. Consulte a loja
                para conhecer o catálogo disponível.
              </p>
            )}
            <ProductShare product={product} />
            <CompareButton id={product.id} name={product.name} />
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
      <div className="mobile-purchase-page">
        <SiteFooter excludeRecentId={product.id} />
      </div>
      <aside className="mobile-purchase-bar" aria-label="Compra rápida">
        <div>
          <span>{product.size}</span>
          <strong>{formatPrice(product.priceCents)}</strong>
          {product.availability === 'demo' && <small>Demonstrativo</small>}
        </div>
        <Button
          className="pill cta"
          disabled={!ready || atLimit || product.availability === 'unavailable'}
          onClick={() => addItem(product.id)}
        >
          <ShoppingBag size={18} />
          {product.availability === 'unavailable'
            ? 'Indisponível'
            : atLimit
              ? 'Limite de 99'
              : 'Adicionar ao carrinho'}
        </Button>
      </aside>
    </>
  );
}
