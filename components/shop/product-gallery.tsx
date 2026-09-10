/* oxlint-disable next/no-img-element */
'use client';
import { useState } from 'react';
import { Dialog as Primitive } from '@base-ui/react/dialog';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';
export function ProductGallery({ product }: { product: Product }) {
  const photos = [
    ...new Set(product.images?.length ? product.images : [product.image]),
  ];
  const [index, setIndex] = useState(0);
  const move = (step: number) =>
    setIndex((i) => (i + step + photos.length) % photos.length);
  return (
    <Dialog>
      <div className="product-gallery">
        <DialogTrigger
          render={
            <button
              className="product-main-photo gallery-trigger"
              aria-label={`Ampliar foto de ${product.name}`}
            />
          }
        >
          <img
            src={photos[index]}
            alt={product.imageAlt}
            width={640}
            height={560}
            fetchPriority="high"
          />
          <span className="gallery-hint">
            <Expand size={16} />
            Ampliar foto
          </span>
        </DialogTrigger>
        {photos.length > 1 && (
          <div className="product-thumbnails">
            {photos.map((src, i) => (
              <button
                key={src}
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <img src={src} alt="" width={80} height={80} />
              </button>
            ))}
          </div>
        )}
      </div>
      <DialogPortal>
        <DialogOverlay className="gallery-backdrop" />
        <Primitive.Popup
          className="photo-gallery-dialog"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              move(1);
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="gallery-heading">
            <div>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>
                {product.availability === 'demo'
                  ? 'Imagem ilustrativa do catálogo demonstrativo.'
                  : product.size}
              </DialogDescription>
            </div>
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Fechar galeria"
                />
              }
            >
              <X size={24} />
            </DialogClose>
          </div>
          <img
            className="gallery-large-photo"
            src={photos[index]}
            alt={`${product.imageAlt} — foto ${index + 1}`}
          />
          <div className="gallery-controls">
            {photos.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Foto anterior"
                onClick={() => move(-1)}
              >
                <ArrowLeft size={22} />
              </Button>
            )}
            <output aria-live="polite">
              Foto {index + 1} de {photos.length}
            </output>
            {photos.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Próxima foto"
                onClick={() => move(1)}
              >
                <ArrowRight size={22} />
              </Button>
            )}
          </div>
        </Primitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
