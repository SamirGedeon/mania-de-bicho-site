/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
'use client';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { availabilityLabel, productHref, formatPrice } from '@/data/products';
import type { Product } from '@/data/products';
import { MAX_QUANTITY } from '@/lib/cart';
import { useCart } from './cart-provider';
import { FavoriteButton } from './favorite-button';
export function ProductCard({ product }: { product: Product }) {
  const { addItem, items, ready } = useCart();
  const atLimit =
    (items.find((i) => i.productId === product.id)?.quantity ?? 0) >=
    MAX_QUANTITY;
  return (
    <article className="catalog-product">
      <FavoriteButton id={product.id} name={product.name} />
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
        <h3>
          <a href={productHref(product.id)}>{product.name}</a>
        </h3>
        <p className="product-size">{product.size}</p>
        <p className="product-availability">{availabilityLabel(product)}</p>
        <strong className="product-price">
          {formatPrice(product.priceCents)}
        </strong>
        <Button
          className="pill cta add-to-cart"
          disabled={!ready || atLimit || product.availability === 'unavailable'}
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
}
