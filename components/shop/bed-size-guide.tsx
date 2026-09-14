'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Ruler, X } from 'lucide-react';
import { productOptions, productHref } from '@/data/products';
export function BedSizeGuide({ id }: { id: string }) {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const long = Number(length.replace(',', '.')),
    wide = Number(width.replace(',', '.'));
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" className="bed-guide-trigger" />}
      >
        <Ruler size={18} />
        Guia de medidas da caminha
      </DialogTrigger>
      <DialogContent className="bed-guide-dialog" showCloseButton={false}>
        <div className="review-heading">
          <DialogTitle>Qual tamanho escolher?</DialogTitle>
          <DialogClose
            render={
              <Button variant="ghost" size="icon" aria-label="Fechar guia" />
            }
          >
            <X />
          </DialogClose>
        </div>
        <DialogDescription>
          Meça o espaço ocupado pelo seu pet deitado na posição em que costuma
          dormir.
        </DialogDescription>
        <ol>
          <li>
            Meça o comprimento e a largura com uma fita métrica, sem apertar o
            pet.
          </li>
          <li>
            Considere espaço para ele mudar de posição. Não escolha só pela
            letra P, M ou G.
          </li>
          <li>
            Confirme a área interna útil da cama com a loja: bordas podem
            reduzir o espaço de descanso.
          </li>
        </ol>
        <figure
          className="measurement-diagram"
          aria-label="Diagrama: comprimento na horizontal e largura na vertical"
        >
          <div>← Comprimento →</div>
          <div className="measurement-area">
            <span>↕ Largura</span>
            <span>
              Espaço ocupado
              <br />
              pelo pet deitado
            </span>
          </div>
        </figure>
        <div className="guide-inputs">
          <label>
            Comprimento do espaço (cm)
            <Input
              inputMode="decimal"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Ex.: 50"
            />
          </label>
          <label>
            Largura do espaço (cm)
            <Input
              inputMode="decimal"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ex.: 35"
            />
          </label>
        </div>
        {long > 0 && wide > 0 && (
          <p>
            Seu pet ocupa aproximadamente {length} × {width} cm. Compare abaixo
            e consulte a área interna útil antes de escolher.
          </p>
        )}
        <ul className="guide-options">
          {productOptions(id).map((p) => (
            <li key={p.id}>
              <a href={productHref(p.id)}>
                {p.name} — {p.size}
              </a>
            </li>
          ))}
        </ul>
        <p>
          As medidas do catálogo atual são demonstrativas; não representam uma
          recomendação de ajuste garantido.
        </p>
      </DialogContent>
    </Dialog>
  );
}
